import { ref, reactive, computed } from 'vue'
import { getManagerList } from '@/api/manager.js'
import { toast } from "@/composables/util"
//封装 列表 分页 搜索 删除 修改
export function useInitTable(opt = {}) {

  // const searchForm = reactive({
  //   keyword: ""
  // })

  // const resetSearchFrom = () => {
  //   searchForm.keyword = "";
  //   getData();
  // }
  let searchForm = null;
  let resetSearchFrom = null;

  if (opt.searchForm) {
    //通过利用封装加解构 把我们写的这一部分能够通过传参来进行代码简化
    searchForm = reactive({ ...opt.searchForm })
    resetSearchFrom = () => {
      //通过这个for重置这个表单
      for (const key in opt.searchForm) {
        searchForm[key] = pt.searchForm[key]
      }
      getData()
    }
  }


  const tableData = ref([])

  const loading = ref(false);

  const currentPage = ref(1)
  const total = ref(0)
  const limit = ref(10);


  //获取数据
  function getData(p = null) {
    if (typeof p == "number") {
      currentPage.value = p
    }
    loading.value = true;
    //searchForm本来就是reactive类型的,正好需要传对象类型的,所以我们直接传searchForm即可
    opt.getList(currentPage.value, searchForm).then(res => {
      if (opt.onGetListSuccess && typeof opt.onGetListSuccess == "function") {
        opt.onGetListSuccess(res)
      } else {
        tableData.value = res.list;
        total.value = res.totalCount
      }

    }).finally(() => {
      loading.value = false
    })
  }

  getData()

  //删除
  const handleDelete = (id) => {
    loading.value = true;
    opt.delete(id).then(res => {
      toast("删除成功")
      getData()
    }).finally(() => {
      loading.value = false;
    })
  }

  //修改状态
  const handleStatusChange = (status, row) => {
    row.statusLoading = true;
    opt.updateStatus(row.id, status).then(res => {
      toast("修改状态成功")
      row.status = status;
    }).finally(() => {
      row.statusLoading = false;
    })
  }
  return {
    searchForm,
    resetSearchFrom,
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete,
    handleStatusChange
  }
}

//封装 新增 修改
export function useInitForm(opt = {}) {
  //表单部分
  const formDrawerRef = ref(null);
  const formRef = ref(null)
  const defaultForm = opt.form;
  const form = reactive({})
  const rules = opt.rules || {}

  const editId = ref(0)
  const drawerTitle = computed(() => editId.value ? "修改" : "新增")

  //新增
  const handleSubmit = () => {
    formRef.value.validate((vaild) => {
      //如果vaild为false 就证明验证没有通过
      if (!vaild) return;
      formDrawerRef.value.showLoading();

      const fun = editId.value ? opt.update(editId.value, form.value) : opt.create(form)

      console.log(form);
      fun.then(res => {
        toast(drawerTitle.value + "成功")
        // 修改刷新当前页，新增刷新第一页
        opt.getData(editId.value ? false : 1)
        formDrawerRef.value.close()
      }).finally(() => {
        formDrawerRef.value.hideLoading()
      })
    })
  }

  //重置表单的方法
  function resetForm(row = false) {
    if (formRef.value) formRef.value.clearValidate()
    // if (row) {
    //   for (const key in form) {
    //     //拿进来form值，赋值给表单的值
    //     form[key] = row[key];
    //   }
    // }
    for (const key in defaultForm) {
      //拿进来form值，赋值给表单的值
      form[key] = row[key];
    }
  }

  //修改
  const handleEdit = (row) => {
    editId.value = row.id;
    resetForm(row);
    formDrawerRef.value.open()
  }

  //拉出来表单
  const handleCreate = () => {
    editId.value = 0;
    resetForm(defaultForm);
    formDrawerRef.value.open();
  }

  return {
    formDrawerRef,
    formRef,
    form,
    rules,
    editId,
    drawerTitle,
    handleSubmit,
    resetForm,
    handleEdit,
    handleCreate

  }
}
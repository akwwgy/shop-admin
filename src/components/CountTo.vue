<template>

  {{ d.num.toFixed(0) }}
</template>

<script setup>
import { reactive, watch } from 'vue'
import gsap from "gsap"

const props = defineProps({
  value: {
    type: Number,
    default: 0
  }
})

const d = reactive({
  num: 0
})

function AnimateToValue() {
  gsap.to(d, {
    duration: 0.5,
    num: props.value
  })
}

AnimateToValue()

//防止值渲染完之后动画才开始执行，就监听一下数值，变化了，重新执行一下滚动动画
watch(() => props.value, () => AnimateToValue())



</script>

<style scoped>

</style>
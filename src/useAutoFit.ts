import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const useAutoFit = (width: number = 1920, height: number = 1080, autoType: boolean = true) => {
  const w_width = ref(width)
  const h_height = ref(height)
  const tran = ref()
  const appStyle = ref()

  const changeSize = () => {
    let vw = 1
    let h = document.getElementsByTagName('html')[0].clientHeight
    let w_tran = (document.getElementsByTagName('html')[0].clientWidth / w_width.value) * vw
    if (h_height.value * w_tran <= h) {
      document.getElementsByTagName('html')[0].style.height = document.documentElement.clientHeight + 'px'
      if (autoType) {
        tran.value = `scale(${document.getElementsByTagName('html')[0].clientWidth / w_width.value},${h / h_height.value}) translate(-50%, -50%)`
      } else {
        tran.value = `scale(${(document.getElementsByTagName('html')[0].clientWidth / w_width.value) * vw}) translate(-50%, -50%)`
      }
    } else {
      let s = document.getElementsByTagName('html')[0].clientHeight / h_height.value
      document.getElementsByTagName('html')[0].style.height = document.documentElement.clientHeight + 'px'
      if (autoType) {
        tran.value = `scale(${document.getElementsByTagName('html')[0].clientWidth / w_width.value},${s}) translate(-50%, -50%)`
      } else {
        tran.value = `scale(${s})translate(-50%, -50%)`
      }
    }
  }

  watch(tran, () => {
    appStyle.value = {
      position: 'absolute',
      transform: tran.value,
      transformOrigin: '0 0',
      width: `${w_width.value}px`,
      height: `${h_height.value}px`,
      top: '50%',
      left: '50%',
    }
  })
  onMounted(() => {
    changeSize()
    window.addEventListener('resize', changeSize)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', changeSize)
  })

  return {
    appStyle,
  }
}

export { useAutoFit }

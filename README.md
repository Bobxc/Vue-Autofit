### useAutoFit 三个参数分别是设计稿宽、高、缩放类型。缩放类型是否全屏展示，默认 true，页面会形变

#### APP.vue

```tsx
<template>
  <div id="app" :style="appStyle">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { useAutoFit } from 'bobx-autofit'

const { appStyle } = useAutoFit(1920, 1080, true)
</script>
```

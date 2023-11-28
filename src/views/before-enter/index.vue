<template>
  <div class="w-full h-full flex items-center justify-center text-primary">
    loading...
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router/composables'

import { usePermissionStore } from '@/store/modules/permission'

export default defineComponent({
  name: 'BeforeEnter',
  setup() {
    const permissionStore = usePermissionStore()

    const router = useRouter()

    const { proxy: { $message } } = getCurrentInstance()

    $message.success('登录成功，即将进入系统')

    console.log()
    router.replace(permissionStore.getMenus[0].path)
  }
})
</script>

<template>
  <ul class="tabs-view-contextmenu" :style="{ left: x + 'px', top: y + 'px' }">
    <li
      v-for="item in getDropMenuList"
      :key="item.event"
      class="tabs-view-contextmenu-item"
      :class="{ 'tabs-view-contextmenu-item__disabled': item.disabled }"
      @click="handleMenuEvent(item)"
    >
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>

<script>
import { computed, defineComponent, reactive, unref, watch } from 'vue'
import { useRouter } from '@/router'

import { useMultipleTabStore } from '@/store'
import { TableActionEnum, useTabs } from '@/hooks/useTabs'

export default defineComponent({
  name: 'Contextmenu',
  props: {
    tabItem: Object,
    x: Number,
    y: Number
  },
  emits: ['click'],
  setup(props, { emit }) {
    const state = reactive({
      current: null,
      currentIndex: 0
    })

    const tabStore = useMultipleTabStore()
    const { currentRoute } = useRouter()
    const { refreshPage, closeAll, close, closeLeft, closeOther, closeRight } = useTabs()

    const getTargetTab = computed(() => {
      return props.tabItem
    })

    const getDropMenuList = computed(() => {
      if (!unref(getTargetTab)) {
        return
      }
      const { meta } = unref(getTargetTab)
      const { path } = currentRoute

      const curItem = state.current

      console.log(curItem, path)

      const isCurItem = curItem ? curItem.path === path : false
      console.log(isCurItem)

      // Refresh button
      const refreshDisabled = !isCurItem
      const disabled = tabStore.getTabList.length <= 1

      return [
        {
          event: TableActionEnum.REFRESH,
          text: '重新加载',
          disabled: refreshDisabled
        },
        {
          event: TableActionEnum.CLOSE_CURRENT,
          text: '关闭标签页',
          disabled: !!meta?.affix || disabled
        },
        {
          event: TableActionEnum.CLOSE_OTHER,
          text: '关闭其他标签页',
          disabled: disabled || !isCurItem
        },
        {
          event: TableActionEnum.CLOSE_ALL,
          text: '关闭全部标签页',
          disabled: disabled
        }
      ]
    })

    watch(
      () => getTargetTab.value,
      (tabItem) => {
        if (!tabItem) return
        const index = tabStore.getTabList.findIndex(
          (tab) => tab.path === tabItem.path
        )
        state.current = tabItem
        state.currentIndex = index
      }
    )

    function handleMenuEvent(menu) {
      const { event, disabled } = menu
      if (disabled) return false

      switch (event) {
        case TableActionEnum.REFRESH:
          refreshPage()
          break
        case TableActionEnum.CLOSE_CURRENT:
          close(unref(getTargetTab))
          break
        case TableActionEnum.CLOSE_LEFT:
          closeLeft()
          break
        case TableActionEnum.CLOSE_RIGHT:
          closeRight()
          break
        case TableActionEnum.CLOSE_OTHER:
          closeOther()
          break
        case TableActionEnum.CLOSE_ALL:
          closeAll()
          break
      }

      emit('click')
    }

    return {
      getDropMenuList,
      handleMenuEvent
    }
  }
})
</script>

<style lang="scss">
.tabs-view-contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  &-item {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      background: #eee;
    }

    .el-icon {
      width: 16px;
      height: 16px;
      margin-right: 2px;
    }

    &__disabled {
      color: #ccc;
      cursor: not-allowed;

      &:hover {
        background: #fff;
      }
    }
  }
}
</style>

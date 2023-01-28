<template>
  <div class="tabs-view">
    <div class="tabs-view-main">
      <div ref="navWrap" class="tabs-card">
        <div ref="navScroll" class="tabs-card-scroll">
          <draggable
            :list="getTabsState"
            animation="300"
            item-key="fullPath"
            class="flex"
            @end="handleSortTabs"
          >
            <div
              v-for="element in getTabsState"
              :key="element.path"
              :id="`tag${element?.fullPath?.split('/').join('\/')}`"
              class="tabs-card-scroll-item"
              :class="{ 'active-item': activeKey === element.path }"
              @click.stop="handleClick(element)"
              @contextmenu.prevent="handleContextMenu($event, element)"
            >
              <div class="tabs-card-scroll-item__inner">
                <span>{{ element.meta.title }}</span>
                <span
                  v-if="!element.meta.affix && activeKey === element.path"
                  class="el-icon-close"
                  @click.stop="handleClose(element)"
                />
              </div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
    <contextmenu
      ref="contextmenu"
      v-show="showDropdown"
      :tab-item="currentTab"
      :x="dropdownX"
      :y="dropdownY"
      @click="showDropdown = false"
    />
  </div>
</template>

<script>
import { computed, defineComponent, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'
import { onClickOutside } from '@vueuse/core'

import Draggable from 'vuedraggable'
import Contextmenu from './contextmenu.vue'

import { useMultipleTabStore } from '@/store'

import { useTabs } from '@/hooks/useTabs'
import { useGo } from '@/hooks/usePage'

import { PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from '@/router/constant'

export default defineComponent({
  components: {
    Draggable,
    Contextmenu
  },
  setup() {
    const navWrap = ref(null)
    const navScroll = ref(null)
    const contextmenu = ref(null)
    const currentTab = ref(null)

    const tabStore = useMultipleTabStore()

    const router = useRouter()
    const route = useRoute()
    const go = useGo()

    const { close } = useTabs()

    const tagsView = ref(null)

    const state = reactive({
      activeKey: route.fullPath,
      scrollable: false,
      dropdownX: 0,
      dropdownY: 0,
      showDropdown: false,
      isMultiHeaderFixed: false,
      multiTabsSetting: true
    })

    const getTabsState = computed(() => tabStore.getTabList)

    watch(
      () => route.fullPath,
      (to) => {
        if (
          route.name === REDIRECT_NAME ||
          route.name === PAGE_NOT_FOUND_NAME
        ) {
          return
        }

        state.activeKey = to
        tabStore.addTab(route)
      }
    )

    function handleClick(e) {
      state.showDropdown = false
      const { path, fullPath } = e
      if (fullPath === route.fullPath) return
      state.activeKey = fullPath || path
      go(state.activeKey, true)
    }

    function handleClose(item) {
      close(item)
    }

    async function handleContextMenu(e, item) {
      state.showDropdown = false
      currentTab.value = null
      const menuMinWidth = 105
      const offsetLeft = navWrap.value.getBoundingClientRect().left // container margin left
      const offsetWidth = navWrap.value.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        state.dropdownX = maxLeft
      } else {
        state.dropdownX = left
      }

      state.showDropdown = true
      state.dropdownY = e.clientY
      currentTab.value = item
    }

    function handleSortTabs(evt) {
      const { oldIndex, newIndex } = evt
      if (oldIndex === newIndex) {
        return
      }
      tabStore.sortTabs()
    }

    onClickOutside(contextmenu, () => (state.showDropdown = false))

    onMounted(async () => {
      await nextTick()
      await tabStore.initTabs(router.getRoutes())
      await tabStore.addTab(route)
    })

    return {
      ...toRefs(state),
      navWrap,
      navScroll,
      contextmenu,
      currentTab,
      getTabsState,

      handleClick,
      handleClose,
      handleContextMenu,
      handleSortTabs
    }
  }
})
</script>

<style lang="scss">
.tabs-view {
  width: 100%;
  padding: 4px 6px 4px;
  display: flex;
  transition: all 0.2s ease-in-out;
  background-color: #fff;

  &-main {
    height: 32px;
    display: flex;
    max-width: 100%;
    min-width: 100%;

    .tabs-card {
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
      position: relative;

      .tabs-card-prev,
      .tabs-card-next {
        width: 32px;
        text-align: center;
        position: absolute;
        line-height: 32px;
        cursor: pointer;
      }

      .tabs-card-prev {
        left: 0;
      }

      .tabs-card-next {
        right: 0;
      }

      .tabs-card-next-hide,
      .tabs-card-prev-hide {
        display: none;
      }

      &-scroll {
        white-space: nowrap;
        overflow: hidden;

        &-item {
          display: inline-block;
          position: relative;
          cursor: pointer;
          height: 32px;
          line-height: 32px;
          border: 1px solid #f0f0f0;
          color: #1f2225;
          background: #fff;
          padding: 0 8px;
          font-size: 12px;
          border-radius: 2px;
          margin-right: 6px;
          flex: 0 0 auto;

          &:hover {
            color: #515a6e;
          }

          &__inner {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          [class^=el-icon-] {
            margin-left: 8px;
            font-size: 14px;
          }
        }

        .active-item {
          color: #fff;
          background: #0960bd;
          border: 0;
        }
      }
    }

    .tabs-card-scrollable {
      padding: 0 32px;
      overflow: hidden;
    }
  }
}

.tabs-view-default-background {
  background: #f5f7f9;
}

.tabs-view-dark-background {
  background: #101014;
}

.tabs-view-fix {
  position: fixed;
  z-index: 5;
  padding: 6px 19px 6px 10px;
  left: 200px;
}

.tabs-view-fixed-header {
  top: 0;
}
</style>

<template>
  <div ref="tagsView" id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <div
        v-for="tag in visitedViews"
        :key="tag.path"
        :class="{ 'active': activeKey === tag.path }"
        class="tags-view-item"
        @click.stop="handleClick(tag)"
        @contextmenu.prevent="handleContextMenu(tag, $event)"
      >
        {{ tag.meta.title }}
        <span v-if="!tag.meta.affix && activeKey === tag.path" class="el-icon-close" @click.stop="handleClose(tag)" />
      </div>
    </scroll-pane>
    <contextmenu
      ref="contextmenu"
      v-show="visible"
      :tab-item="selectedTag"
      :x="left"
      :y="top"
      @click="visible = false"
    />
  </div>
</template>

<script>
import { computed, defineComponent, nextTick, onMounted, reactive, ref, toRefs, unref, watch } from 'vue'
import { useRoute, useRouter } from '@/router'
import { useMultipleTabStore } from '@/store'
import { useTabs } from '@/hooks/useTabs'

import ScrollPane from './ScrollPane.vue'
import Contextmenu from './contextmenu.vue'

import { PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from '@/router/constant'

export default defineComponent({
  components: {
    ScrollPane,
    Contextmenu
  },
  setup() {
    const multipleTabStore = useMultipleTabStore()

    const router = useRouter()
    const route = useRoute()
    const { close } = useTabs()

    const tagsView = ref(null)

    const state = reactive({
      activeKey: route.fullPath,
      visible: false,
      top: 0,
      left: 0,
      selectedTag: null
    })

    const visitedViews = computed(() => multipleTabStore.getTabList)

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
        multipleTabStore.addTab(route)
      }
    )

    watch(
      () => state.visible,
      (value) => {
        if (value) {
          document.body.addEventListener('click', closeMenu)
        } else {
          document.body.removeEventListener('click', closeMenu)
        }
      }
    )

    function handleClick(e) {
      const { path, fullPath } = e
      if (fullPath === route.fullPath) return
      state.activeKey = fullPath || path
      router.replace(e)
    }

    function handleClose(view) {
      close(view)
    }

    async function handleContextMenu(tag, e) {
      state.visible = false
      state.selectedTag = null
      await nextTick()
      const menuMinWidth = 105
      const offsetLeft = tagsView.value.getBoundingClientRect().left // container margin left
      const offsetWidth = tagsView.value.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        state.left = maxLeft
      } else {
        state.left = left
      }

      state.visible = true
      state.top = e.clientY
      state.selectedTag = tag
    }

    function closeMenu() {
      state.visible = false
    }

    function handleScroll() {
      closeMenu()
    }

    onMounted(async () => {
      await nextTick()
      await multipleTabStore.initTabs(router.getRoutes())
      await multipleTabStore.addTab(unref(route))
    })

    return {
      ...toRefs(state),
      tagsView,
      visitedViews,

      handleClick,
      handleClose,
      handleContextMenu,
      handleScroll
    }
  }
})
</script>

<style lang="scss">
.tags-view-container {
  height: 42px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 34px;
      line-height: 34px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
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
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>

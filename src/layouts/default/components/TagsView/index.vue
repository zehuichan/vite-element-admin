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
        <span v-if="!tag.meta.affix" class="el-icon-close" @click.stop="closeSelectedTag(tag)" />
      </div>
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新当前</li>
      <li v-if="!selectedTag.meta?.affix" @click="closeSelectedTag(selectedTag)">关闭当前</li>
      <li @click="closeOthersTags(selectedTag)">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭全部</li>
    </ul>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { useRoute, useRouter } from '@/router'
import { useStore } from '@/store'

import { getRawRoute } from '@/utils'

import ScrollPane from './ScrollPane.vue'

const whiteList = [
  'Login',
  'Redirect',
  'ErrorPage'
]

export default defineComponent({
  components: {
    ScrollPane
  },
  setup() {
    const store = useStore()

    const router = useRouter()
    const route = useRoute()

    const tagsView = ref(null)

    const state = reactive({
      activeKey: route.fullPath,
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    })

    const visitedViews = computed(() => store.state.tagsView.visitedViews)
    const routes = computed(() => store.state.permission.routes)

    watch(
      () => route.fullPath,
      (to) => {
        if (whiteList.includes(route.name)) return
        state.activeKey = to
        addTags()
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
      const { fullPath } = e
      if (fullPath === route.fullPath) return
      state.activeKey = fullPath
      router.replace(e)
    }

    function filterAffixTags(routes) {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = route.path
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    }

    function initTags() {
      const affixTags = state.affixTags = filterAffixTags(routes.value)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          store.dispatch('tagsView/addView', getRawRoute(tag))
        }
      }
    }

    function addTags() {
      const { name } = route
      if (name) {
        store.dispatch('tagsView/addView', getRawRoute(route))
      }
      return false
    }

    function refreshSelectedTag(view) {
      const { fullPath } = view
      router.push({
        path: '/redirect' + fullPath
      })
    }

    function closeSelectedTag(view) {
      store.dispatch('tagsView/closeCurrentTab', view)
      if (state.activeKey === route.fullPath) {
        const currentRoute = visitedViews.value[Math.max(0, visitedViews.value.length - 1)]
        state.activeKey = currentRoute.fullPath
        router.push(currentRoute)
      }
    }

    function closeOthersTags(view) {
      store.dispatch('tagsView/closeOtherTabs', view)
      state.activeKey = view.fullPath
      router.push({
        path: '/redirect' + view.fullPath
      })
    }

    function closeAllTags() {
      store.dispatch('tagsView/closeAllTabs')
      router.replace('/')
    }

    function handleContextMenu(tag, e) {
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

    onMounted(() => {
      initTags()
      addTags()
    })

    return {
      ...toRefs(state),
      tagsView,
      visitedViews,

      handleClick,
      refreshSelectedTag,
      closeSelectedTag,
      closeOthersTags,
      closeAllTags,
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

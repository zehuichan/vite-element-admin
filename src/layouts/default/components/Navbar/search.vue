<template>
  <div>
    <div class="basic-layout-navbar-action__item" @click="visible = true">
      <i class="el-icon-search" />
    </div>
    <el-dialog
      :visible.sync="visible"
      custom-class="search-dialog"
      width="632px"
      top="60px"
      append-to-body
      :show-close="false"
      @close="handleClose"
    >
      <template #default>
        <div>
          <el-input
            ref="inputRef"
            v-model="keyword"
            placeholder="搜索"
            clearable
            size="medium"
            prefix-icon="el-icon-search"
            @input="handleSearch"
          />
        </div>
        <div class="search-not-data" v-show="getIsNotData">暂无搜索结果</div>
        <ul class="search-list" v-show="!getIsNotData">
          <li
            v-for="(item, index) in searchResult"
            :key="item.path"
            class="search-list__item"
            :class="{active: activeIndex === index}"
          >
            <div class="search-list__item-text"># {{ item.name }}</div>
            <div class="search-list__item-enter">
              <svg-icon name="enter" />
            </div>
          </li>
        </ul>
      </template>
      <template #footer>
        <div class="search-commands-key">
          <svg-icon name="enter" size="15" />
          <span class="search-label">确认</span>
        </div>
        <div class="search-commands-key">
          <svg-icon name="arrow-down" size="15" />
          <svg-icon name="arrow-up" size="15" />
          <span class="search-label">切换</span>
        </div>
        <div class="search-commands-key">
          <svg-icon name="esc" size="15" />
          <span class="search-label">关闭</span>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { computed, defineComponent, nextTick, ref, unref, watch } from 'vue'
import { useRouter } from 'vue-router/composables'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'
import { usePermissionStore } from '@/store'

import { filter } from '@/utils/treeHelper'

// Translate special characters
function transform(c) {
  const code = ['$', '(', ')', '*', '+', '.', '[', ']', '?', '\\', '^', '{', '}', '|']
  return code.includes(c) ? `\\${c}` : c
}

function createSearchReg(key) {
  const keys = [...key].map((item) => transform(item))
  const str = ['', ...keys, ''].join('.*')
  return new RegExp(str)
}

export default defineComponent({
  name: 'Search',
  setup() {
    const permissionStore = usePermissionStore()
    const router = useRouter()

    const visible = ref(false)
    const inputRef = ref(null)

    const activeIndex = ref(-1)
    const keyword = ref('')
    const searchResult = ref([])

    const menuList = permissionStore.getMenus

    const getIsNotData = computed(() => !keyword || unref(searchResult).length === 0)

    watch(
      () => visible.value,
      async (visible) => {
        if (visible) {
          await nextTick()
          inputRef.value?.focus()
        }
      }
    )

    const handleSearch = useDebounceFn(search, 200)

    function search() {
      keyword.value = keyword.value.trim()
      if (!keyword.value) {
        searchResult.value = []
        return
      }
      const reg = createSearchReg(unref(keyword))
      const filterMenu = filter(menuList, (item) => {
        return reg.test(item.name) && !item.hideMenu
      })
      searchResult.value = handlerSearchResult(filterMenu, reg)
      activeIndex.value = 0
    }

    function handlerSearchResult(filterMenu, reg, parent) {
      const ret = []
      filterMenu.forEach((item) => {
        const { name, path, icon, children, hideMenu, meta } = item
        if (!hideMenu && reg.test(name) && (!children?.length || meta?.hideChildrenInMenu)) {
          ret.push({
            name: parent?.name ? `${parent.name} > ${name}` : name,
            path,
            icon
          })
        }
        if (!meta?.hideChildrenInMenu && Array.isArray(children) && children.length) {
          ret.push(...handlerSearchResult(children, reg, item))
        }
      })
      return ret
    }

    async function handleEnter() {
      if (!searchResult.value.length) {
        return
      }
      const result = unref(searchResult)
      const index = unref(activeIndex)
      if (result.length === 0 || index < 0) {
        return
      }
      const to = result[index]
      handleClose()
      await nextTick()
      router.push(to.path)
    }

    function handleUp() {
      if (!searchResult.value.length) return
      activeIndex.value--
      if (activeIndex.value < 0) {
        activeIndex.value = searchResult.value.length - 1
      }
    }

    function handleDown() {
      if (!searchResult.value.length) return
      activeIndex.value++
      if (activeIndex.value > searchResult.value.length - 1) {
        activeIndex.value = 0
      }
    }

    function handleClose() {
      searchResult.value = []
      keyword.value = ''
      visible.value = false
    }

    onKeyStroke(
      (e) => {
        if (e.ctrlKey && e.key === 'k') {
          e.preventDefault()
          return true
        }
      },
      () => {
        visible.value = true
      }
    )
    onKeyStroke('Enter', handleEnter)
    onKeyStroke('ArrowUp', handleUp)
    onKeyStroke('ArrowDown', handleDown)

    return {
      visible,
      inputRef,
      activeIndex,
      keyword,
      searchResult,
      getIsNotData,

      handleSearch,
      handleClose
    }
  }
})
</script>

<style lang="scss">
.search-dialog {
  border-radius: 6px;
  background-color: #f9f9f9;

  .el-dialog__header {
    padding: 0;
  }

  .el-dialog__body {
    padding: 12px 12px 0;
  }

  .el-dialog__footer {
    padding: 12px;
    display: flex;
    box-shadow: 0 -1px 0 0 #e0e3e8, 0 -3px 6px 0 rgba(69, 98, 155, .12);
  }

  .search-not-data {
    display: flex;
    width: 100%;
    height: 100px;
    color: #969faf;
    align-items: center;
    justify-content: center;
  }

  .search-list {
    max-height: 472px;
    padding: 0 0 20px;
    margin: 14px auto 0;
    overflow: auto;
    list-style: none;

    &__item {
      position: relative;
      display: flex;
      width: 100%;
      height: 56px;
      padding-left: 14px;
      margin-top: 8px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      cursor: pointer;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 1px 3px 0 #d4d9e1;
      align-items: center;

      &-text {
        flex: 1;
      }

      &-enter {
        width: 30px;
        opacity: 0;
      }
    }

    .active {
      color: #fff;
      background-color: #0960bd;

      .search-list__item-enter {
        opacity: 1;
      }
    }
  }

  .search-commands-key {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(60, 60, 60, .7);
    margin-right: 0.8em;

    svg {
      margin-right: 0.4em;
    }

    .search-label {
      font-size: 12px;
    }
  }
}
</style>

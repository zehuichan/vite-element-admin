<template>
  <div class="v-icon-select" v-clickoutside="handleClose">
    <el-input v-bind="$attrs" v-model="selectedLabel" @focus="handleFocus" @blur="handleBlur" @clear="handleClear"/>
    <transition name="el-zoom-in-top" @before-enter="handleMenuEnter">
      <div class="v-icon-select-menu" v-show="visible">
        <el-scrollbar
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list"
        >
          <div class="icon-list clearfix">
            <div
                class="icon-list__item tap-active"
                :class="classPrefix + item === value ? 'active' : ''"
                v-for="(item, index) in icon"
                :key="index"
                @click="handleSelect(item, index)"
            >
              <i :class="classPrefix + item"></i>
              <span class="icon-name">{{classPrefix}}{{item}}</span>
            </div>
          </div>
          <view class="v-icon-select__loading" v-if="loading && !finished">
            <van-loading type="spinner" size="16">
              {{ loadingText }}
            </van-loading>
          </view>
          <view class="v-icon-select__finished-text" v-if="finished">{{ finishedText }}</view>
        </el-scrollbar>
        <div v-if="icon.length === 0" class="el-select-dropdown__empty">无匹配数据</div>
        <div x-arrow class="arrow" style="left: 35px;"></div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Clickoutside from 'element-ui/lib/utils/clickoutside' // global directive
  // utils
  import {debounce} from '@/utils'
  // json
  import icon from './icon.js'

  export default {
    name: 'VIconSelect',
    props: {
      value: {
        required: true
      },
      classPrefix: {
        type: String,
        default: 'el-icon-'
      }
    },
    directives: {Clickoutside},
    data() {
      return {
        icon,
        visible: false,
      }
    },
    computed: {
      iconClass() {
        return this.value
      },
      selectedLabel: {
        get() {
          return this.value
        },
        set(val) {
          this.handleInputChange()
          this.$emit('input', val)
          this.$emit('change', val)
        }
      }
    },
    methods: {
      handleInputChange: debounce(function () {
        if (this.selectedLabel !== '') {
          this.icon = this.icon.filter(item => {
            if (item.includes(this.selectedLabel)) {
              return item
            }
          })
        } else {
          this.icon = icon
        }
      }, 300, false),
      handleFocus() {
        this.$nextTick(() => {
          this.visible = true
        })
      },
      handleBlur() {
      },
      handleClear() {
        this.$emit('input', '')
        this.$emit('change', '')
      },
      handleSelect(val, index) {
        this.$emit('input', this.classPrefix + val, index)
        this.$emit('change', this.classPrefix + val, index)
        this.$nextTick(() => {
          this.visible = false
        })
      },
      handleClose() {
        this.$nextTick(() => {
          this.visible = false
        })
      },
      handleMenuEnter() {
        this.icon = icon
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-icon-select {
    position: relative;
  }

  .el-input-group__prepend {
    i {
      color: #333;
      vertical-align: -1px;
    }
  }

  .arrow {
    position: absolute;
    top: -13px;
    left: 50%;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    margin-right: 3px;
    border-bottom-color: #ebeef5;
    border-width: 6px;
    filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));

    &:after {
      content: " ";
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-width: 6px;
      top: 1px;
      margin-left: -6px;
      border-top-width: 0;
      border-bottom-color: #fff;
    }
  }

  .v-icon-select-menu {
    position: absolute;
    z-index: 2000;
    width: 100%;
    background-color: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    box-sizing: border-box;
    margin: 12px 0 5px;
  }

  .icon-list {
    padding: 0 6px;

    .icon-list__item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      float: left;
      width: 20%;
      text-align: center;
      height: 90px;
      color: #666;
      font-size: 13px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        i,
        span {
          color: #5cb6ff;
        }
      }

      &.active {
        background-color: #f2f3f5;

        i,
        span {
          color: #5cb6ff;
        }
      }
    }

    [class^="el-icon-"] {
      font-size: 22px;
      display: block;
      color: #606266;
      transition: color .15s linear;
    }

    .icon-name {
      display: inline-block;
      font-size: 12px;
    }
  }
</style>
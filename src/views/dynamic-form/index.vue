<template>
  <div class="dynamic-form">
    <div class="app-container">
      <div class="page-header-heading">
        <span class="page-header-heading-title">{{$route.meta.title}}</span>
      </div>
    </div>
    <div class="app-container">
      <el-form
          ref="form"
          :model="form"
          label-position="right"
          label-width="120px"
          style="width: 470px;"
      >
        <el-form-item v-for="(item, index) in options.items" :key="index" :label="item.name" :rules="item.rules">
          <div v-if="item.type === 'value'">{{item.value}}</div>
          <el-input v-model="item.value" :placeholder="item.placeholder" clearable v-if="item.type === 'input'">
            <i
                slot="append"
                v-if="item.append && Object.keys(item.append).length"
                class="el-icon-warning-outline"
                @click="item.append.onClick()"
            />
          </el-input>
          <el-select
              v-model="item.value"
              :placeholder="item.placeholder"
              v-if="item.type === 'select'"
              style="width: 100%;"
          >
            <el-option label="全部" value="全部"/>
            <el-option
                v-for="(subItem, subItemIndex) in item.list"
                :key="subItemIndex"
                :value="subItem.value"
                :label="subItem.name"
            />
          </el-select>
          <el-radio-group v-model="item.value" v-if="item.type === 'radio'">
            <el-radio
                v-for="(subItem, subItemIndex) in item.list"
                :key="subItemIndex"
                :value="subItem.value"
                :label="subItem.name"
            />
          </el-radio-group>
          <el-date-picker
              v-model="item.value"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-if="item.type === 'daterange'"
          />
        </el-form-item>
      </el-form>
    </div>
    <footer-tool-bar>
      <el-button type="primary" @click="submit">保存</el-button>
    </footer-tool-bar>
  </div>
</template>

<script>
  // constants
  import {channelProps} from './promotionProps'
  // components
  import FooterToolBar from '@/components/FooterToolBar/index'

  export default {
    name: 'dynamic-form',
    data() {
      return {
        options: {
          title: '添加推广方案',
          items: [
            {
              name: '是否公开：',
              type: 'radio',
              placeholder: '',
              value: '',
              label: 'partner_id',
              rules: [
                {required: true, message: '不允许为空', trigger: 'change'}
              ],
              list: channelProps.isOpen
            },
            {
              name: '合作机构：',
              type: 'select',
              placeholder: '全部',
              value: '',
              label: 'partner_id',
              rules: [
                {required: true, message: '请选择活动区域', trigger: 'change'}
              ],
              list: []
            },
            {
              name: '方案名称：',
              type: 'input',
              placeholder: '限50个字符',
              value: '',
              label: 'partner_id',
              rules: [
                {required: true, message: '请选择活动区域', trigger: 'change'}
              ],
              list: []
            },
            {
              name: '发行方：',
              type: 'select',
              placeholder: '全部',
              value: '',
              label: 'partner_id',
              rules: [
                {required: true, message: '请选择活动区域', trigger: 'change'}
              ],
              list: []
            },
            {
              name: '网点类型：',
              type: 'select',
              placeholder: '全部',
              value: '',
              label: 'partner_id',
              rules: [
                {required: true, message: '请选择活动区域', trigger: 'change'}
              ],
              list: channelProps.nodeType
            },
            {
              name: '发货方式：',
              type: 'select',
              placeholder: '全部',
              value: '',
              label: 'partner_id',
              rules: [
                {required: true, message: '请选择活动区域', trigger: 'change'}
              ],
              list: channelProps.shitType
            },
            {
              name: '推广奖励：',
              type: 'radio',
              placeholder: '',
              value: '',
              label: 'partner_id',
              rules: [
                {required: true, message: '请选择活动区域', trigger: 'change'}
              ],
              list: channelProps.reward
            },
            {
              name: '合作时间：',
              type: 'daterange',
              placeholder: '',
              value: '',
              label: 'partner_id',
              rules: [
                {required: true, message: '请选择活动区域', trigger: 'change'}
              ],
              list: []
            },
            {
              name: '推广人保护：',
              type: 'radio',
              placeholder: '',
              value: '',
              label: 'partner_id',
              rules: [
                {required: true, message: '请选择活动区域', trigger: 'change'}
              ],
              list: channelProps.protect
            },
            {
              name: '客服入口配置：',
              type: 'input',
              placeholder: '支付宝客服参数',
              value: '',
              label: 'partner_id',
              list: []
            }
          ]
        },
        form: {}
      }
    },
    methods: {
      submit() {
      }
    },
    components: {
      FooterToolBar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
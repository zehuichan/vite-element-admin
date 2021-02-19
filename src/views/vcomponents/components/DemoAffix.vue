<template>
  <div class="demo-affix">
    <ul>
      <li v-for="(group, index) in options" :key="index">
        <div class="group-label">{{group.label}}</div>
        <ul>
          <li class="item" v-for="(item, idx) in group.options" :key="idx">{{item.name}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'DemoAffix',
    data() {
      return {
        options: [
          {
            label: '业务组件',
            options: [
              {name: 'v-search', href: '/vcomponents/vsearch'},
              {name: 'v-table', href: '/vcomponents/vtable'},
              {name: 'v-form', href: '/vcomponents/vform'},
              {name: 'v-dialog', href: '/vcomponents/vdialog'},
              {name: 'v-drawer', href: '/vcomponents/vdrawer'},
              {name: 'v-image-viewer', href: '/vcomponents/vimageviewer'},
              {name: 'v-excel', href: '/vcomponents/vexcel'},
            ]
          },
          {
            label: '展示组件',
            options: [
              {name: 'v-badge', href: '/vcomponents/vbadge'},
              {name: 'v-ellipsis', href: '/vcomponents/vellipsis'},
              {name: 'v-count-down', href: '/vcomponents/vcountdown'},
              {name: 'v-descriptions', href: '/vcomponents/vdescriptions'},
              {name: 'v-qrcode', href: '/vcomponents/vqrcode'},
            ]
          },
          {
            label: '权限指令',
            options: [
              {name: 'v-action', href: '/vcomponents/vaction'},
            ]
          }
        ]
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .demo-affix {
    position: fixed;
    top: 250px;
    right: 0;

    ul {
      position: relative;
      padding: 0;
      margin: 0;
      list-style: none;
      font-size: 14px;
    }

    .group-label {
      font-size: 12px;
      color: #909399;
      line-height: 30px;
    }
  }
</style>
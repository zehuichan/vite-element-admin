(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-671849ae"],{"12d6":function(e,a,t){},"3c34":function(e,a,t){"use strict";t.r(a);var i=function(){var e=this,a=e._self._c;return a("div",[a("div",{staticClass:"app-container"},[a("code",[e._v(" 新增媒体查询，当前屏幕 "+e._s(e.mediaQuery)+" ")])]),a("div",{staticClass:"app-container"},[a("el-row",{attrs:{gutter:10}},e._l(e.media_query,(function(t,i){return a("el-col",{key:i,attrs:{xs:12,sm:12,md:8}},[a("div",{staticClass:"box"},[e._v(" "+e._s(t.key)+" "),a("div",{staticClass:"value"},[e._v(e._s(t.label))])])])})),1)],1),a("div",{staticClass:"app-container"},[a("code",[e._v(" 新增按钮权限指令 v-action 栗子："+e._s(e.ex)+" 通过api获取路由权限（菜单），记录到vuex中，根据当前用户所挂载的角色所拥有的按钮权限进行控制 ")])]),a("div",{staticClass:"app-container"},[a("el-row",{attrs:{gutter:10}},e._l(e.permission_enum,(function(t,i){return a("el-col",{key:i,attrs:{xs:12,sm:12,md:8}},[a("div",{staticClass:"box"},[e._v(" "+e._s(t.key)+" "),a("div",{staticClass:"value"},[e._v(e._s(t.label))])])])})),1)],1)])},s=[],l=t("2f62"),n=t("959c"),c={name:"Documentation",data(){return{media_query:[{key:"screen-xs",label:"maxWidth: 575"},{key:"screen-sm",label:"minWidth: 576, maxWidth: 767"},{key:"screen-md",label:"minWidth: 768, maxWidth: 991"},{key:"screen-lg",label:"minWidth: 992, maxWidth: 1199"},{key:"screen-xl",label:"minWidth: 1200, maxWidth: 1599"},{key:"screen-xll",label:"minWidth: 1600"}],permission_enum:[{key:"v-action:add",label:"desc: 新增"},{key:"v-action:delete",label:"desc: 删除"},{key:"v-action:edit",label:"desc: 修改"},{key:"v-action:query",label:"desc: 查询"},{key:"v-action:get",label:"desc: 详情"},{key:"v-action:enable",label:"desc: 启用"},{key:"v-action:disable",label:"desc: 禁用"},{key:"v-action:import",label:"desc: 导入"},{key:"v-action:export",label:"desc: 导出"}],ex:"<tag-name v-action:add>新增</tag-name>"}},computed:{...Object(l["b"])(["mediaQuery"])},directives:{action:n["a"]}},d=c,o=(t("8c0b"),t("2877")),r=Object(o["a"])(d,i,s,!1,null,null,null);a["default"]=r.exports},"8c0b":function(e,a,t){"use strict";t("12d6")}}]);
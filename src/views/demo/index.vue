<template>
  <div>
    <div class="app-container">
      <el-button @click="preview = true">大图展示{{preview}}</el-button>
      <v-image-viewer v-model="preview" :url-list="url_list"/>
    </div>
    <div class="app-container">
      <el-form ref="dataForm" :model="dataForm" label-width="110px">
        <el-form-item label="菜单ICON：" prop="icon" required>
          <v-icon-select v-model="dataForm.icon" placeholder="请选择" clearable/>
        </el-form-item>
      </el-form>
    </div>
    <div class="app-container">
      <el-form ref="dataForm" :model="dataForm" label-width="110px">
        <el-form-item label="菜单ICON：" prop="icon" required>
          <v-icon-select2 v-model="dataForm.icon2" placeholder="请选择" clearable/>
        </el-form-item>
      </el-form>
    </div>
    <div class="app-container">
      <code>{{dataForm}}</code>
    </div>
    <el-card class="block-card" shadow="never">
      <div slot="header">VDescriptions</div>
      <v-descriptions :data="json" :columns="columns">
        <template #payStatus="{scope}">
          123123自定义插槽咯
        </template>
      </v-descriptions>
    </el-card>
    <v-footer-tool-bar>
      <el-button type="default" @click="onReset">取消</el-button>
      <el-button type="primary">确认保存</el-button>
    </v-footer-tool-bar>
  </div>
</template>

<script>
  export default {
    name: 'Demo',
    data() {
      return {
        preview: false,
        dataForm: {
          icon: 'el-icon-orange',
          icon2: 'platform-eleme'
        },
        json: {
          'id': '780811984915902464',
          'createDate': '2020-11-24 15:08:04',
          'updateDate': '2020-11-24 19:42:47',
          'deleted': 0,
          'version': 1,
          'uid': 96,
          'errorType': 0,
          'userCardId': 0,
          'cardId': 1,
          'cardNumber': '45012001230717876601',
          'exchangeId': '20200228141101aTPpVjzKbR',
          'entryNetwork': '入口网络编号处',
          'entryStation': '富罗高速口',
          'entryTime': '2020-11-21 06:46:47',
          'exitNetwork': '出口网络编号处',
          'exitStation': '灵川西高速口',
          'exitTime': '2020-11-21 12:52:31',
          'totalFee': 0.02,
          'discountFee': 0.0,
          'actualFee': 0.02,
          'payedTotal': 0.02,
          'payId': '780813361650053120',
          'debtSn': '',
          'thirdDebtSn': '',
          'desc': '这是通行备注',
          'payStatus': 1,
          'payer': 0,
          'plateNumber': '粤V00001',
          'plateColor': 1,
          'province': 45,
          'clearTime': '2020-11-24',
          'fileId': 780811984253202432,
          'payTime': '2020-11-24 17:21:38',
          'exception': '',
          'consumeType': 1,
          'exitwasteSn': '99999999450100019999999911020001110000000009317493822',
          'vcType': 1,
          'genTime': '2020-11-21 12:52:31',
          'billDate': 20201124,
          'obuNo': '4501191207216667',
          'deductType': 20,
          'riskLable': 0,
          'thirdPayNo': 'WT780813363834920960',
          'payOrg': 2,
          'bindCardSn': '02220200503158716601',
          'bindBankCard': '20196001580532063778',
          'channelOrg': 0,
          'workId': 111,
          'payRoute': 2,
          'sendStatus': 0,
          'fileName': 'bindcard_toll_list.201122',
          'advanceExpend': 0,
          'bankHandlerSn': '780845567751364608',
          'billSn': '',
          'vehicleType': 1,
          'channelSource': 3
        },
        columns: [
          { label: '订单编号', key: 'id' },
          { label: '通行流水号', key: 'bindCardSn' },
          { label: '发行方名称', key: 'channelSource' },
          { label: '扣费类型', key: 'deductType' },
          { label: '订单状态', key: 'payStatus' },
          { label: '高速入口', key: 'entryStation' },
          { label: '高速出口', key: 'exitStation' },
          { label: '交易类型', key: 'consumeType' },
          { label: '订单金额', key: 'totalFee' },
          { label: '支付机构', key: 'payOrg' },
          { label: '交易时间', key: 'payTime' },
          { label: '进单时间', key: 'createDate' },
          { label: '记账时间', key: 'genTime' },
        ],
        url_list: [
          'http://gdzs.oss-cn-shenzhen.aliyuncs.com/202010/903c1652-5ee3-4734-9d32-8e0698fc95d0.PNG',
          'http://gdzs.oss-cn-shenzhen.aliyuncs.com/202010/944d528c-e6f4-4c55-b4c6-b17bace63ab6.PNG',
          'http://gdzs.oss-cn-shenzhen.aliyuncs.com/202010/8e9d33a3-e74a-41a2-bc64-d5c50a6d9743.PNG',
          'http://gdzs.oss-cn-shenzhen.aliyuncs.com/202010/423160cb-4c32-44c5-b0ee-e688442498c7.PNG'
        ]
      }
    },
    methods: {
      onReset() {
        this.$refs.dataForm.resetFields()
      },
    }
  }
</script>

<style>
  .block-card {
    margin: 24px 24px 0;
  }
</style>
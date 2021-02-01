export const search = {
  options: [
    { label: 'Name', key: 'name', value: null, placeholder: 'Name', type: 'input' },
    { label: 'Age', key: 'age', value: null, placeholder: 'Age', type: 'input' },
    { label: 'Address', key: 'address', value: null, placeholder: 'Address', type: 'input' },
    { label: 'Tags', key: 'tags', value: null, placeholder: 'Address', type: 'input' },
    {
      label: 'Select',
      key: 'select',
      value: null,
      placeholder: 'Select',
      type: 'select',
      options: [
        { value: '3', label: '备选项' },
        { value: '6', label: '备选项' },
        { value: '9', label: '备选项' },
      ]
    },
    {label: 'Daterange', key: 'daterange', value: [], placeholder: 'Daterange', type: 'daterange'},
  ],
}

export const table = {
  data: [
    { name: 'John Brown', age: '32', address: 'New York No. 1 Lake Park', tags: ['NICE', 'DEVELOPER'] },
    { name: 'Jim Green', age: '42', address: 'London No. 1 Lake Park', tags: ['LOSER'] },
    { name: 'Joe Black', age: '32', address: 'Sidney No. 1 Lake Park', tags: ['COOL', 'TEACHER'] },
  ],
  columns: [
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Address', key: 'address' },
    { label: 'Tags', key: 'tags' },
    { label: 'Action', key: 'action' },
  ],
}

export const form = [
  { label: 'input', key: 'input', value: null, placeholder: '文本框', type: 'input' },
  {
    label: 'digit',
    key: 'digit',
    value: null,
    placeholder: '正整数',
    type: 'digit',
    rules: [
      { required: true, message: '请输入正整数', trigger: 'blur' }
    ],
  },
  { label: 'number', key: 'number', value: null, placeholder: '数字', type: 'number' },
  { label: 'textarea', key: 'textarea', value: null, placeholder: '文本域', type: 'textarea' },
  {
    label: 'radio',
    key: 'radio',
    value: null,
    placeholder: '单选框组',
    type: 'radio',
    options: [
      { label: '3', value: '备选项' },
      { label: '6', value: '备选项' },
      { label: '9', value: '备选项' },
    ]
  },
  {
    label: 'select',
    key: 'select',
    value: null,
    placeholder: '选择器',
    type: 'select',
    options: [
      { value: '3', label: '备选项' },
      { value: '6', label: '备选项' },
      { value: '9', label: '备选项' },
    ]
  },
  {
    label: 'date',
    key: 'date',
    value: null,
    placeholder: '日期选择器',
    type: 'date'
  },
  {
    label: 'daterange',
    key: 'daterange',
    value: [],
    placeholder: '日期范围选择器',
    type: 'daterange'
  },
  {
    label: 'datetime',
    key: 'datetime',
    value: null,
    placeholder: '日期时间选择器',
    type: 'datetime'
  },
  { label: 'custom', key: 'custom' },
]

export const descriptions = {
  data: {
    product: 'Cloud Database',
    billing: 'Prepaid',
    time: '18:00:00',
    amount: '$80.00',
    discount: '$20.00',
    official: '$60.00',
    custom: 'custom',
  },
  columns: [
    { label: 'Product', key: 'product' },
    { label: 'Billing', key: 'billing' },
    { label: 'time', key: 'time' },
    { label: 'Amount', key: 'amount' },
    { label: 'Discount', key: 'discount' },
    { label: 'Official', key: 'official' },
    { label: 'Custom', key: 'custom' },
  ]
}
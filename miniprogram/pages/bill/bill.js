// 旅账：多人记账 + 智能AA + 一键结算
const mock = require('../../mock/data.js');

Page({
  data: {
    trip: {},
    total: 0,
    perPerson: 0,
    categories: ['交通', '住宿', '餐饮', '门票', '购物', '其他'],
    // 新增记账弹窗
    showAdd: false,
    form: { amount: '', category: '交通', desc: '', payerIndex: 0 },
    // 结算清单
    settlements: [],
    // 京东订单导入
    showJd: false,
    jdOrders: [],
  },
  onLoad() {
    this.setData({ jdOrders: mock.jdOrders });
    this.compute();
  },
  compute() {
    const bill = mock.bill;
    const total = bill.entries.reduce((s, e) => s + e.amount, 0);
    const perPerson = +(total / bill.members.length).toFixed(2);
    this.setData({ trip: bill, total, perPerson });
    this.calcSettlement(bill, perPerson);
  },
  // 智能AA结算算法：算出每人应付/应收，生成最少转账清单
  calcSettlement(bill, perPerson) {
    const paid = {};
    bill.members.forEach((m) => (paid[m.id] = 0));
    bill.entries.forEach((e) => (paid[e.payerId] += e.amount));
    // 净额 = 已付 - 应付
    const balances = bill.members.map((m) => ({
      id: m.id,
      name: m.name,
      net: +(paid[m.id] - perPerson).toFixed(2),
    }));
    const debtors = balances.filter((b) => b.net < -0.01).map((b) => ({ ...b }));
    const creditors = balances.filter((b) => b.net > 0.01).map((b) => ({ ...b }));
    const result = [];
    let i = 0;
    let j = 0;
    while (i < debtors.length && j < creditors.length) {
      const pay = Math.min(-debtors[i].net, creditors[j].net);
      result.push({
        from: debtors[i].name,
        to: creditors[j].name,
        amount: +pay.toFixed(2),
      });
      debtors[i].net += pay;
      creditors[j].net -= pay;
      if (Math.abs(debtors[i].net) < 0.01) i++;
      if (Math.abs(creditors[j].net) < 0.01) j++;
    }
    this.setData({ settlements: result });
  },
  openAdd() {
    this.setData({ showAdd: true });
  },
  closeAdd() {
    this.setData({ showAdd: false });
  },
  onAmount(e) {
    this.setData({ 'form.amount': e.detail.value });
  },
  onDesc(e) {
    this.setData({ 'form.desc': e.detail.value });
  },
  onCategory(e) {
    this.setData({ 'form.category': this.data.categories[e.detail.value] });
  },
  onPayer(e) {
    this.setData({ 'form.payerIndex': e.detail.value });
  },
  saveEntry() {
    const f = this.data.form;
    const amount = parseFloat(f.amount);
    if (!amount || amount <= 0) {
      wx.showToast({ title: '请输入正确金额', icon: 'none' });
      return;
    }
    const payer = this.data.trip.members[f.payerIndex];
    mock.bill.entries.push({
      id: 'e' + Date.now(),
      payer: payer.name,
      payerId: payer.id,
      amount,
      category: f.category,
      desc: f.desc || f.category,
      splitType: '均摊',
    });
    this.setData({ showAdd: false, form: { amount: '', category: '交通', desc: '', payerIndex: 0 } });
    this.compute();
    wx.showToast({ title: '记账成功', icon: 'success' });
  },
  onSettle() {
    if (this.data.settlements.length === 0) {
      wx.showToast({ title: '已经AA平账啦', icon: 'none' });
      return;
    }
    wx.showModal({
      title: '一键结算',
      content: '将按清单发起微信转账（Demo仅展示）',
      confirmText: '去结算',
      success: (r) => {
        if (r.confirm) wx.showToast({ title: '结算跳转(开发中)', icon: 'none' });
      },
    });
  },
  // 打开京东订单导入面板
  openJd() {
    this.setData({ showJd: true });
  },
  closeJd() {
    this.setData({ showJd: false });
  },
  // 一键导入京东订单为账单条目（按均摊拆分）
  importJd(e) {
    const order = this.data.jdOrders.find((o) => o.id === e.currentTarget.dataset.id);
    if (!order) return;
    const payer = this.data.trip.members[0];
    const catMap = { 住宿: '住宿', 门票: '门票', 装备: '购物' };
    mock.bill.entries.push({
      id: 'jd' + Date.now(),
      payer: payer.name,
      payerId: payer.id,
      amount: order.amount,
      category: catMap[order.category] || '其他',
      desc: '京东订单 · ' + order.name,
      splitType: '均摊',
    });
    this.setData({ showJd: false });
    this.compute();
    wx.showToast({ title: '已导入并按人数均摊', icon: 'none' });
  },
});
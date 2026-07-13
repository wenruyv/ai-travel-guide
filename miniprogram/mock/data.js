// mock/data.js 全量模拟数据，跑通 UI 用
// 攻略列表
const guides = [
  {
    id: 'g1',
    title: '川西环线7日：色达+稻城亚丁',
    author: '雪山下的猫',
    destination: '四川·甘孜',
    days: 7,
    budget: 3800,
    cover: '🏔️',
    tags: ['自驾', '摄影', '高原'],
    likes: 1289,
    copies: 342,
    summary: '沿途海拔4000+，色达佛学院日落绝美，稻城亚丁三神山徒步。',
    nodes: [
      { day: 1, seq: 1, type: 'location', title: '成都出发 → 康定', location: '康定', cost: 260, note: '住康定情歌广场附近，方便觅食',
        timeSlot: '07:00-15:00',
        transport: '自驾G318约4h，成雅高速→雅康高速→康定，过路费约80元',
        accommodation: '康定情歌酒店 标间180元/晚，情歌广场旁，步行觅食5分钟',
        meal: { breakfast: '成都出发前在酒店附近吃碗肥肠粉', lunch: '泸定服务区简餐或自带干粮', dinner: '康定情歌广场旁藏式牦牛肉火锅，人均80' },
        danmu: [
          { user: '路过的驴友', text: '康定早晚温差大，带件冲锋衣！' },
          { user: '楼主', text: '对，我D1晚上就冻到了哈哈', isAuthor: true },
        ],
        qa: { '几点出发合适': '建议早上7点前从成都走，避开成雅高速早高峰，中午能到泸定吃午饭。', '包车还是自驾': '我们是自驾，路况还行；不熟悉山路的话建议包车，师傅也认路。' } },
      { day: 2, seq: 1, type: 'location', title: '康定 → 色达佛学院', location: '色达佛学院', cost: 180, note: '海拔渐升，注意高反',
        timeSlot: '08:00-18:00',
        transport: '自驾S303约6h，翻越折多山垭口4298m，盘山路注意减速',
        accommodation: '色达县城民宿 标间140元/晚，海拔3800m比佛学院低缓解高反',
        meal: { breakfast: '康定酒店早餐/街边酥油茶+糌粑', lunch: '新都桥或八美镇路边川菜馆，人均40', dinner: '色达县城藏式餐馆，牦牛肉面+酥油茶，人均50' },
        danmu: [
          { user: '氧气不能停', text: '这段海拔上得快，红景天记得提前吃' },
        ],
        qa: { '高反怎么办': '提前2天吃红景天，当天别洗澡别剧烈运动，多喝热水，我备了便携氧气以防万一。', '路上有信号吗': '大部分路段有信号，翻山那段会断，建议提前下好离线地图。' } },
      { day: 2, seq: 2, type: 'cost', title: '色达佛学院日落', location: '色达', cost: 320, note: '傍晚拍红房子日落',
        timeSlot: '18:00-20:30',
        transport: '县城开车20分钟到佛学院，车停山下步行上山',
        accommodation: '同上（色达县城民宿）',
        meal: { breakfast: '-', lunch: '-', dinner: '佛学院斋饭15元/位，或回县城吃' },
        danmu: [
          { user: '摄影小白', text: '日落机位在哪呀求指路' },
          { user: '楼主', text: '观景台右侧山坡，去晚了占不到位', isAuthor: true },
        ],
        qa: { '住哪里方便': '住色达县城，海拔低一点缓解高反，到佛学院开车20分钟。', '门票多少钱': '佛学院本身免费，坛城转经免费，主要花在住宿和交通。' } },
      { day: 3, seq: 1, type: 'location', title: '色达 → 理塘 → 稻城', location: '理塘·稻城', cost: 200, note: '天空之城理塘停留2h',
        timeSlot: '07:00-20:00',
        transport: '自驾G318约8h，色达→炉霍→甘孜→理塘→稻城，理塘停留休整',
        accommodation: '稻城阳光酒店 标间200元/晚，有暖气和供氧',
        meal: { breakfast: '色达县城早餐铺，藏面+甜茶', lunch: '理塘县城川菜馆，松茸炖鸡必点人均60', dinner: '稻城县城牦牛肉汤锅，人均70' },
        danmu: [
          { user: '天空之城', text: '理塘勒通古镇逛逛不错' },
          { user: '楼主', text: '理塘海拔4014m，别跑跳，拍照就好', isAuthor: true },
        ],
        qa: { '理塘有什么逛': '勒通古镇+千户藏寨免门票，2小时逛完。', '路上要多久': '色达到稻城全程约8小时，建议在理塘吃午饭休整。' } },
      { day: 4, seq: 1, type: 'location', title: '稻城亚丁长线：洛绒牛场→牛奶海→五色海', location: '牛奶海', cost: 150, note: '建议骑马上行省体力，徒步约6h',
        timeSlot: '06:30-17:00',
        transport: '稻城开车1.5h到亚丁景区大门→景区大巴1h到扎灌崩→电瓶车20min到洛绒牛场',
        accommodation: '亚丁村藏家客栈 标间260元/晚，景区内省第二天早起',
        meal: { breakfast: '稻城早出发，自带面包牛奶路上吃', lunch: '洛绒牛场自带干粮（泡面/巧克力/能量棒）', dinner: '回亚丁村客栈藏式火锅，人均60' },
        danmu: [
          { user: '腿已废', text: '爬到牛奶海真的会喘不上气' },
          { user: '骑马也颠', text: '骑马300一段，看个人体力' },
        ],
        qa: { '需要多久': '从洛绒牛场到牛奶海徒步单程约2.5小时，骑马到马站再走40分钟。', '要带什么': '氧气罐、巧克力、防晒、雨衣，山上天气说变就变。' } },
      { day: 5, seq: 1, type: 'location', title: '亚丁短线：冲古寺→珍珠海→仙乃日', location: '珍珠海', cost: 0, note: '短线轻松，拍仙乃日倒影',
        timeSlot: '08:00-14:00',
        transport: '客栈步行到扎灌崩→冲古寺→珍珠海徒步40分钟',
        accommodation: '稻城阳光酒店 标间200元/晚，回稻城县城住条件好',
        meal: { breakfast: '亚丁村客栈早餐，稀饭馒头鸡蛋15元', lunch: '冲古草甸自带简餐', dinner: '稻城县城川菜馆，回锅肉+蒜泥白肉人均55' },
        danmu: [
          { user: '倒影控', text: '珍珠海拍仙乃日倒影要无风天' },
          { user: '楼主', text: '短线下午就能下山，回稻城休整', isAuthor: true },
        ],
        qa: { '短线难吗': '冲古寺到珍珠海全程栈道，来回1.5小时，几乎无爬升。', '下午去哪': '短线结束回稻城，可以逛白塔和红草地。' } },
      { day: 6, seq: 1, type: 'location', title: '稻城 → 新都桥', location: '新都桥', cost: 180, note: '摄影天堂，沿途光影绝美',
        timeSlot: '08:00-17:00',
        transport: '自驾G318约5h，翻越海子山垭口4685m+卡子拉山4718m，一路下坡到新都桥',
        accommodation: '新都桥摄影之家客栈 标间180元/晚，供氧房+200',
        meal: { breakfast: '稻城县城早餐', lunch: '雅江县城川菜馆，雅江鱼人均50', dinner: '新都桥客栈家常菜，土豆烧牦牛肉人均55' },
        danmu: [
          { user: '光影猎人', text: '新都桥傍晚侧逆光拍白杨树绝了' },
          { user: '楼主', text: '住摄影之家客栈，老板会带你去机位', isAuthor: true },
        ],
        qa: { '新都桥拍什么': '白杨树+藏寨+贡嘎雪山远景，秋冬最出片。', '要多久': '稻城到新都桥约5小时，建议雅江吃午饭。' } },
      { day: 7, seq: 1, type: 'location', title: '新都桥 → 成都', location: '成都', cost: 120, note: '翻越折多山回程，雅安吃午饭',
        timeSlot: '08:00-16:00',
        transport: '自驾G318→雅康高速约4.5h回成都',
        accommodation: '-',
        meal: { breakfast: '新都桥客栈早餐', lunch: '雅安桥头堡棒棒鸡，必吃人均45', dinner: '回成都火锅犒劳自己，人均100' },
        danmu: [
          { user: '返程愉快', text: '雅安的棒棒鸡真的绝' },
          { user: '楼主', text: '返程全程下坡轻松，安全到家！', isAuthor: true },
        ],
        qa: { '几点能到成都': '不堵车下午4点左右到，建议走雅康高速比老318快。', '还有什么要买': '新都桥可以买松茸干片和牦牛肉干当伴手礼。' } },
    ],
  },
  {
    id: 'g2',
    title: '厦门鼓浪屿慢生活3日',
    author: '海风咸咸',
    destination: '福建·厦门',
    days: 3,
    budget: 1500,
    cover: '🏖️',
    tags: ['海岛', '文艺', '美食'],
    likes: 876,
    copies: 210,
    summary: '鼓浪屿闲逛、沙坡尾扫街、八市吃海鲜，节奏很松弛。',
    nodes: [
      { day: 1, seq: 1, type: 'location', title: '鼓浪屿轮渡', location: '鼓浪屿', cost: 50, note: '提前网上预约船票',
        danmu: [
          { user: '排队排到哭', text: '一定要网上订！现场票基本抢不到' },
          { user: '楼主', text: '对，我们订的三丘田码头的班次', isAuthor: true },
        ],
        qa: { '船票怎么订': '关注“厦门轮渡”公众号提前1-3天订，去鼓浪屿从邮轮中心码头走。', '几点去人少': '早上第一班8点左右人最少，中午团客最多。' } },
      { day: 1, seq: 2, type: 'cost', title: '海鲜午餐', location: '八市', cost: 180, note: '现买现做，人均90',
        danmu: [
          { user: '吃货本货', text: '八市的血蛤绝了' },
        ],
        qa: { '哪家加工靠谱': '菜市场里买好拿去周边加工店，加工费按份算，认人多的店。', '人均多少': '两个人点三四样海鲜，加工费一起大概180，很划算。' } },
      { day: 2, seq: 1, type: 'location', title: '沙坡尾扫街', location: '沙坡尾', cost: 0, note: '文艺小店多，出片率高',
        danmu: [
          { user: '文艺青年', text: '这里咖啡馆随便拍都好看' },
          { user: '楼主', text: '推荐傍晚去，光线最舒服', isAuthor: true },
        ],
        qa: { '有推荐的店吗': '沙坡尾避风坞旁边有几家独立咖啡馆和杂货铺，慢慢逛半天没问题。' } },
    ],
  },
  {
    id: 'g3',
    title: '日本关西赏樱6日',
    author: 'Sakura酱',
    destination: '日本·大阪京都',
    days: 6,
    budget: 9800,
    cover: '🌸',
    tags: ['赏樱', '拍照', '购物'],
    likes: 2043,
    copies: 588,
    summary: '大阪城→京都哲学之道→岚山，樱花季机票需提前3个月订。',
    nodes: [
      { day: 1, seq: 1, type: 'location', title: '抵达关西机场 → 大阪心斋桥', location: '大阪·心斋桥', cost: 80, note: '入住难波附近，交通方便',
        timeSlot: '12:00-20:00',
        transport: '关西机场乘南海电铁特急rapi:t约40分钟到难波站，票价1450日元',
        accommodation: '大阪难波Cross Hotel 双人房650元/晚，地铁步行3分钟',
        meal: { breakfast: '飞机上', lunch: '机场或车上简餐', dinner: '道顿堀章鱼烧(¥60)+蟹道乐(¥280)+一兰拉面(¥90)' },
        danmu: [
          { user: '省钱达人', text: '机场坐南海电铁到难波最快最便宜' },
          { user: '楼主', text: '建议买好ICOCA交通卡，全程刷卡超方便', isAuthor: true },
        ],
        qa: { '机场怎么到市区': '南海电铁特急rapi:t约40分钟到难波，普通车也可以，便宜一点。', '住哪个区方便': '难波/心斋桥一带最方便，购物吃饭逛街都在步行范围。' } },
      { day: 1, seq: 2, type: 'cost', title: '道顿堀美食打卡', location: '道顿堀', cost: 200, note: '章鱼烧、蟹道乐、金龙拉面',
        timeSlot: '19:00-21:00',
        transport: '难波步行10分钟到道顿堀',
        accommodation: '同上',
        meal: { breakfast: '-', lunch: '-', dinner: '章鱼烧10个¥60 + 蟹道乐套餐¥280 + 格力高招牌前拍照' },
        danmu: [
          { user: '吃货本货', text: '蟹道乐要排队，建议提前订' },
        ],
        qa: { '必吃什么': '章鱼烧、大阪烧、蟹道乐、一兰拉面，晚上格力高招牌拍照打卡。' } },
      { day: 2, seq: 1, type: 'location', title: '大阪城公园赏樱', location: '大阪城', cost: 60, note: '樱花与天守阁同框',
        timeSlot: '08:00-12:00',
        transport: '地铁谷町四丁目站步行10分钟到大阪城公园',
        accommodation: '同上（大阪难波Cross Hotel）',
        meal: { breakfast: '酒店自助或便利店饭团', lunch: '大阪城周边梅田商圈拉面/定食人均¥80', dinner: '黑门市场海鲜烧烤人均¥200' },
        danmu: [
          { user: '樱花痴', text: '天守阁配樱花绝美，早去避人' },
          { user: '楼主', text: '西之丸庭园角度最好，门票另收但值得', isAuthor: true },
        ],
        qa: { '几月去有樱花': '关西樱花季通常3月底到4月初，具体看当年花期预报，机票建议提前3个月订。', '门票多少': '公园免费，天守阁登阁600日元，西之丸庭园200日元。' } },
      { day: 2, seq: 2, type: 'location', title: '黑门市场觅食', location: '黑门市场', cost: 150, note: '海鲜水果小吃天堂',
        timeSlot: '14:00-17:00',
        transport: '地铁日本桥站步行3分钟',
        accommodation: '同上',
        meal: { breakfast: '-', lunch: '-', dinner: '黑门市场海胆饭¥120+和牛串¥80+草莓¥50' },
        danmu: [
          { user: '海鲜控', text: '海胆饭一定尝，新鲜到哭' },
          { user: '楼主', text: '下午3点后人少，价格也会降', isAuthor: true },
        ],
        qa: { '人均多少': '丰俭由人，两个人吃三四样大概3000-5000日元。', '有什么推荐': '海胆饭、和牛串、鲜榨果汁、士多啤梨（草莓）。' } },
      { day: 3, seq: 1, type: 'location', title: '京都清水寺 + 二年坂', location: '京都·清水寺', cost: 40, note: '和服体验拍樱花人气高',
        timeSlot: '07:30-12:00',
        transport: '大阪难波→京阪电车到祇园四条约45分钟→公交到清水道步行10分钟',
        accommodation: '京都祇园花乐民宿 和室680元/晚，近八坂神社',
        meal: { breakfast: '大阪酒店早餐/便利店', lunch: '清水寺周边汤豆腐套餐人均¥100', dinner: '祇园先斗町居酒屋人均¥250' },
        danmu: [
          { user: '和服少女', text: '二年坂租和服拍照绝了，早去人少' },
          { user: '楼主', text: '清水寺8点前几乎没人', isAuthor: true },
        ],
        qa: { '和服哪里租': '清水寺周边很多和服店，提前网上预约便宜，含发型大约4000-6000日元。', '要爬山吗': '从公交站到清水寺是一段上坡，慢走10分钟。' } },
      { day: 3, seq: 2, type: 'location', title: '京都哲学之道', location: '京都·哲学之道', cost: 0, note: '沿河樱花隧道，早去人少',
        timeSlot: '13:30-16:00',
        transport: '公交到银阁寺道站下车，沿疏水道步行5分钟到哲学之道入口',
        accommodation: '同上（京都祇园花乐民宿）',
        meal: { breakfast: '-', lunch: '-', dinner: '-' },
        danmu: [
          { user: '早起打卡王', text: '7点去几乎没人，出片超干净' },
        ],
        qa: { '怎么过去': '从京都站坐公交到银阁寺道下车，沿疏水道往南走就是哲学之道。', '要走多久': '全程约2公里，慢慢逛拍照大概1.5小时。' } },
      { day: 4, seq: 1, type: 'location', title: '岚山竹林 + 渡月桥 + 嵯峨野小火车', location: '京都·岚山', cost: 50, note: '嵯峨野小火车赏樱',
        timeSlot: '08:00-15:00',
        transport: 'JR嵯峨野线到嵯峨岚山站约20分钟→步行10分钟到竹林→渡月桥',
        accommodation: '同上（京都祇园花乐民宿）',
        meal: { breakfast: '民宿和式早餐', lunch: '岚山汤豆腐老铺嵯峨野人均¥120', dinner: '京都站拉面小路人均¥80' },
        danmu: [
          { user: '铁道迷', text: '嵯峨野小火车樱花季一票难求，务必提前订' },
          { user: '楼主', text: '渡月桥两岸樱花配远山超美', isAuthor: true },
        ],
        qa: { '小火车怎么订': '嵯峨野观光小火车官网或JR绿色窗口提前订，樱花季提前1个月抢。', '岚山玩多久': '竹林+渡月桥+天龙寺半天足够，可以顺路吃汤豆腐。' } },
      { day: 5, seq: 1, type: 'location', title: '奈良公园喂鹿 + 东大寺', location: '奈良', cost: 30, note: '鹿仙贝+樱花，亲子友好',
        timeSlot: '08:30-16:00',
        transport: '近铁京都线到近铁奈良站约45分钟→步行15分钟到奈良公园',
        accommodation: '大阪难波华盛顿酒店 双人房550元/晚，回大阪住方便明天购物',
        meal: { breakfast: '京都民宿早餐', lunch: '奈良町kuraushi和食人均¥100', dinner: '大阪难波烧肉人均¥200' },
        danmu: [
          { user: '小鹿控', text: '鹿会鞠躬要仙贝太可爱了' },
          { user: '楼主', text: '注意别让鹿抢包，仙贝拿手上快点喂', isAuthor: true },
        ],
        qa: { '从京都怎么去': '近铁京都线到近铁奈良站约45分钟，比JR近。', '一天够吗': '奈良公园+东大寺+春日大社一天刚好，樱花季顺便赏樱。' } },
      { day: 6, seq: 1, type: 'cost', title: '心斋桥购物 → 返程', location: '大阪·心斋桥', cost: 800, note: '药妆、电器、手信扫货',
        timeSlot: '09:00-15:00',
        transport: '难波步行到心斋桥商业街→南海电铁回关西机场约40分钟',
        accommodation: '-',
        meal: { breakfast: '酒店自助', lunch: '心斋桥网红松坂牛寿司人均¥180', dinner: '机场简餐' },
        danmu: [
          { user: '剁手党', text: '大丸百货能退税还能用银联优惠' },
        ],
        qa: { '退税怎么弄': '单店满5000日元可退税，记得带护照，机场再核验。', '几点去机场': '国际航班建议提前3小时到关西机场，留足退税和值机时间。' } },
    ],
  },
  {
    id: 'g4',
    title: '泰国清迈+清莱7日慢游',
    author: '背包客Leo',
    destination: '泰国·清迈',
    days: 7,
    budget: 5200,
    cover: '🐘',
    tags: ['寺庙', '美食', '性价比'],
    likes: 1560,
    copies: 421,
    summary: '古城骑行、丛林飞跃、白庙蓝庙打卡，物价友好节奏慢。',
    nodes: [
      { day: 1, seq: 1, type: 'location', title: '清迈古城 + 契迪龙寺', location: '清迈古城', cost: 40, note: '租自行车环城最舒服',
        danmu: [
          { user: '慢旅行', text: '古城不大，骑车半天就能逛完' },
          { user: '楼主', text: '周日夜市一定别错过', isAuthor: true },
        ],
        qa: { '古城怎么逛': '租一辆自行车50泰铢一天，沿护城河骑，寺庙密集慢慢逛。', '门票贵吗': '大部分寺庙20-40泰铢，很便宜。' } },
      { day: 3, seq: 1, type: 'location', title: '丛林飞跃 Zipline', location: '清迈近郊', cost: 300, note: '含接送和午餐',
        danmu: [
          { user: '肾上腺素', text: '玩了一整天超值，教练很专业' },
        ],
        qa: { '安全吗': '正规公司装备齐全有保险，恐高的话前两条会怕，后面就适应了。', '要带什么': '穿运动鞋，戴防晒，贵重物品寄存。' } },
      { day: 5, seq: 1, type: 'location', title: '清莱白庙 + 蓝庙', location: '清莱', cost: 100, note: '包车一日游最省心',
        danmu: [
          { user: '拍照狂魔', text: '白庙纯白配蓝天太出片了' },
          { user: '楼主', text: '从清迈包车往返大约1200泰铢', isAuthor: true },
        ],
        qa: { '怎么去清莱': '清迈包车一日游或坐大巴3小时，包车能白庙蓝庙黑庙一起玩。', '要穿什么': '寺庙需着装得体，不能露肩露膝。' } },
    ],
  },
  {
    id: 'g5',
    title: '法国巴黎+小镇8日',
    author: '欧游日记',
    destination: '法国·巴黎',
    days: 8,
    budget: 18800,
    cover: '🗼',
    tags: ['艺术', '建筑', '浪漫'],
    likes: 2680,
    copies: 512,
    summary: '铁塔卢浮宫、凡尔赛宫、普罗旺斯小镇，申根签提前1个月办。',
    nodes: [
      { day: 1, seq: 1, type: 'location', title: '埃菲尔铁塔 + 塞纳河', location: '巴黎·铁塔', cost: 260, note: '傍晚看铁塔亮灯',
        danmu: [
          { user: '浪漫至上', text: '整点铁塔闪灯5分钟，别错过' },
          { user: '楼主', text: '战神广场草坪野餐机位最好', isAuthor: true },
        ],
        qa: { '铁塔要预约吗': '登顶强烈建议官网提前订票，现场排队要几小时。', '塞纳河游船值吗': '傍晚游船看两岸建筑亮灯很浪漫，约15欧一位。' } },
      { day: 2, seq: 1, type: 'location', title: '卢浮宫', location: '巴黎·卢浮宫', cost: 170, note: '提前订票走快速通道',
        danmu: [
          { user: '艺术生', text: '蒙娜丽莎前永远人山人海' },
        ],
        qa: { '一天逛得完吗': '重点看镇馆三宝，全部逛完要两天，建议挑感兴趣的展厅。', '门票多少': '官网约17欧，18-25岁欧盟居民免费。' } },
      { day: 4, seq: 1, type: 'location', title: '凡尔赛宫', location: '凡尔赛', cost: 200, note: 'RER C线直达，避周末',
        danmu: [
          { user: '历史迷', text: '镜厅太震撼了，花园免费' },
          { user: '楼主', text: '带够水，花园很大很晒', isAuthor: true },
        ],
        qa: { '怎么去': 'RER C线到Versailles Château站，步行10分钟。', '要多久': '宫殿+花园一整天，喷泉表演看当天场次。' } },
    ],
  },

  // ===== 以下 4 条为「AI 外部抓取」攻略：模拟从小红书/马蜂窝召回的原始笔记 =====
  // 结构刻意保留非结构化特征（rawTitle/rawContent/rawImages/rawTags/rawStats/rawSource/rawTime）
  // AI 引擎拿到 raw 后会调用 parseRawGuide 解析为结构化 nodes
  {
    id: 'g6',
    source: 'xhs', // 标记为小红书抓取
    rawTitle: '没去过东京你真的会后悔！5天4晚人均 9800 保姆级攻略🔥',
    rawContent: '刚从东京回来，必须给姐妹们安利这条路线✨\n\nDay1 下午到羽田，京急线直接杀到浅草寺，5 点多到雷门，灯笼下拍照绝了～晚上住浅草ビューホテル（标间 ¥780/晚，地铁口 2 分钟）\nDay2 一早冲涩谷十字路口，星巴克二楼拍俯瞰点！中午一兰拉面涩谷店（人均 75）真的香，下午明治神宫散步，晚上蟹道乐（人均 420）值回票价\nDay3 秋叶原 + 上野，Mandarake Complex 6 层扭蛋机天堂！退税记得带护照，单店满 5500 日元\nDay4 百合海鸥线去台场，彩虹桥下午 5 点日落最出片，晚上摩天轮 8 点亮灯（人均 100）\nDay5 凌晨 6 点爬起来筑地市场，寿司大海胆饭 ¥180 必吃，10 点收摊\n\n⚠️踩坑：地铁买 Tokyo Subway 72h 券最划算 ¥100，三天自由坐！避开 7-8 月台风季，3-4 月樱花 + 11 月红叶最舒服～\n\n我把酒店订单和行程单整理在收藏夹第 3 篇，需要的姐妹评论区扣 1～',
    rawImages: ['🗼', '🍜', '🎮', '🌉', '🍣'], // 模拟图片占位（emoji）
    rawAuthor: '霓虹捕手',
    rawAvatar: '🟠',
    rawSource: '小红书',
    rawUrl: 'xiaohongshu.com/explore/tokyo5d',
    rawTime: '2 周前',
    rawStats: { likes: 3120, collects: 826, comments: 248 },
    rawTags: ['#东京旅游', '#动漫打卡', '#日本自由行', '#保姆级攻略'],
    // parsed 字段是 AI 解析后的结构化数据（演示 parseRawGuide 结果）
    destination: '日本·东京',
    days: 5,
    budget: 9800,
    cover: '�',
    tags: ['购物', '动漫', '亲子'],
    author: '霓虹捕手',
    summary: 'AI 从小红书召回并解析：浅草寺求签、涩谷十字、秋叶原手办、台场夜景，地铁 3 日券最划算。',
  },
  {
    id: 'g7',
    source: 'mafengwo',
    rawTitle: '清迈5日｜人均4500慢生活｜寺庙咖啡大象全打卡☕',
    rawContent: '姐妹们来清迈一定要慢慢来！我这趟人均才 4500 超划算～\n\nDay1 下午到清迈机场，Grab 打车到古城民宿（标间 ¥260/晚带小泳池）超推荐！晚上塔佩门喂鸽子，凤飞飞猪脚饭 ¥25 吃到撑\nDay2 双条车去双龙寺（¥50），下午 3 点金光最美～山上餐厅 ¥50，自带水\nDay3 拼车去清莱看白庙 + 黑庙一日游（淘宝 ¥260/人含午餐），白庙内部禁止拍照\nDay4 美旺大象营半日游（¥200 含接送），推荐 Elephant Nature Park 更人道；晚上宁曼路iberry 花园餐厅¥80\nDay5 早上 Ristr8to 咖啡 ¥30，Mango Tango 芒果糯米饭 ¥40，Grab 古城→机场 ¥50\n\n⚠️避雷：突突车要砍价（直接对半砍）；清迈是精品咖啡重镇，单杯 15-30 元性价比超高；雨季 6-10 月别去\n\n收藏夹里有我整理的清迈手绘地图～',
    rawImages: ['🐘', '☕', '🏯', '🍜', '🌴'],
    rawAuthor: '热带漫游',
    rawAvatar: '🟢',
    rawSource: '马蜂窝',
    rawUrl: 'mafengwo.cn/gonglve/chiangmai5d',
    rawTime: '1 月前',
    rawStats: { likes: 1856, collects: 612, comments: 156 },
    rawTags: ['#清迈', '#泰国自由行', '#咖啡控', '#慢生活'],
    destination: '泰国·清迈',
    days: 5,
    budget: 4500,
    cover: '🐘',
    tags: ['休闲', '美食', '性价比'],
    author: '热带漫游',
    summary: 'AI 从马蜂窝召回并解析：双龙寺、古城寺庙、清莱白庙、宁曼路咖啡店，夜市吃到撑。',
  },
  {
    id: 'g8',
    source: 'xhs',
    rawTitle: '大理丽江6日｜人均5200｜风花雪月浪漫到哭💐',
    rawContent: '刚从云南回来，整理了这条超详细路线🌸\n\nDay1 下午到大理古城，住在古城内白族客栈（标间 ¥420/晚），晚上人民路有民谣\nDay2 环洱海一天（电动车租赁 ¥80/天），海舌公园下午 5 点光线最好，喜洲破酥粑粑 ¥15 必吃\nDay3 苍山洗马潭索道（¥280），海拔 3966m 体质弱备红景天；晚上古城菌菇火锅 ¥90\nDay4 大理站→丽江站高铁 2 小时（¥145），下午到束河古镇，比大研安静太多，住纳西庭院（标间 ¥480/晚）\nDay5 玉龙雪山冰川公园（¥480 含大索道），4506m 高反明显，氧气瓶 ¥60/瓶；山下租羽绒服 ¥30\nDay6 拉市海骑马（茶马古道 1 小时 ¥150），选正规马场别信门口拉客\n\n⚠️踩坑：3-5 月 / 9-11 月最舒服，避开 7-8 月雨季；洗马潭索道 12-4 月才开；束河晚上 8 点后几乎没人\n\n我整理的玉龙雪山避坑指南在收藏夹第 2 篇，需要的姐妹扣 2～',
    rawImages: ['🌸', '🏔️', '🏮', '🐴', '🍲'],
    rawAuthor: '苍山下的歌',
    rawAvatar: '🔴',
    rawSource: '小红书',
    rawUrl: 'xiaohongshu.com/explore/dali6d',
    rawTime: '3 周前',
    rawStats: { likes: 2104, collects: 587, comments: 189 },
    rawTags: ['#大理', '#丽江', '#云南旅游', '#风花雪月'],
    destination: '云南·大理',
    days: 6,
    budget: 5200,
    cover: '🌸',
    tags: ['文艺', '摄影', '亲子'],
    author: '苍山下的歌',
    summary: 'AI 从小红书召回并解析：苍山洱海骑行、大理古城、丽江束河古镇、玉龙雪山冰川公园。',
  },
  {
    id: 'g9',
    source: 'mafengwo',
    rawTitle: '首尔济州6日｜人均7800｜购物+自然全打卡🛍️',
    rawContent: '姐妹们韩国免签 15 天说走就走！这趟人均 7800 玩得很爽～\n\nDay1 下午到仁川，AREX 快线到首尔站（43 分钟），住明洞宜必思（标间 ¥520/晚，地铁口）；晚上南山塔看夜景（缆车 ¥100）\nDay2 景福宫 + 北村韩屋，租韩服 2 小时 ¥100 进去免费（强推！）；中午土俗村参鸡汤 ¥100\nDay3 弘大 + 梨大，OLIVE YOUNG 面膜 3CE 彩妆买买买；晚上 Myth 猪蹄 ¥80\nDay4 金浦机场飞济州（1 小时），住济州新罗海景房（¥780/晚）；下午城山日出峰看日落\nDay5 包车去汉拿山御里牧登山口（9.7km 需 4-5 小时），12-2 月山顶封山；柱状节理带\nDay6 济州民俗村 + 海女之家鲍鱼粥 ¥120，机场买柑橘巧克力 + 汉拿峰烧酒\n\n⚠️避雷：景福宫周三闭馆别去；明洞换钱所比机场划算；弘大周一/六有跳蚤市场\n\n免税店购物清单整理在收藏夹啦～',
    rawImages: ['🛍️', '🏯', '🌋', '🐚', '🍊'],
    rawAuthor: '首尔塔下的猫',
    rawAvatar: '🟡',
    rawSource: '马蜂窝',
    rawUrl: 'mafengwo.cn/gonglve/seoul6d',
    rawTime: '1 周前',
    rawStats: { likes: 1643, collects: 489, comments: 132 },
    rawTags: ['#首尔', '#济州岛', '#韩国自由行', '#免签'],
    destination: '韩国·首尔',
    days: 6,
    budget: 7800,
    cover: '🛍️',
    tags: ['购物', '美食', '亲子'],
    author: '首尔塔下的猫',
    summary: 'AI 从马蜂窝召回并解析：明洞弘大购物、景福宫、北村韩屋、济州岛城山日出峰，免签说走就走。',
  },
];

// 搭子广场
const buddies = [
  {
    id: 'b1',
    nickname: '登山客阿泽',
    avatar: '🧗',
    destination: '四川·稻城亚丁',
    dateRange: '10.01 - 10.07',
    budget: '3000-5000',
    interests: ['徒步', '摄影'],
    match: 96,
    intro: '想找个能一起徒步牛奶海的搭子，AA制，节奏可商量。',
    guideId: 'g1',
  },
  {
    id: 'b2',
    nickname: '文艺小鹿',
    avatar: '🦌',
    destination: '福建·厦门',
    dateRange: '09.20 - 09.23',
    budget: '1000-2000',
    interests: ['文艺', '美食', '拍照'],
    match: 88,
    intro: '慢节奏出游，喜欢咖啡馆和扫街，希望搭子也不赶行程。',
    guideId: 'g2',
  },
  {
    id: 'b3',
    nickname: '钓鱼佬老王',
    avatar: '🎣',
    destination: '浙江·千岛湖',
    dateRange: '09.15 - 09.17',
    budget: '800-1500',
    interests: ['钓鱼', '露营'],
    match: 79,
    intro: '找有船钓经验的搭子，分摊船费和饵料。',
    guideId: 'g3',
  },
  {
    id: 'b4',
    nickname: 'Sakura酱',
    avatar: '🌸',
    destination: '日本·关西',
    dateRange: '03.28 - 04.02',
    budget: '8000-12000',
    interests: ['赏樱', '拍照', '和服'],
    match: 92,
    intro: '关西赏樱6日，想找同好一起拍樱花，可拼房分摊住宿。',
    guideId: 'g5',
  },
  {
    id: 'b5',
    nickname: '背包客Leo',
    avatar: '🎒',
    destination: '泰国·清迈',
    dateRange: '11.10 - 11.16',
    budget: '4000-6000',
    interests: ['寺庙', '美食', '性价比'],
    match: 85,
    intro: '清迈慢游7天，喜欢逛夜市和骑车，AA制不赶行程。',
    guideId: 'g4',
  },
  {
    id: 'b6',
    nickname: '欧游日记',
    avatar: '🗼',
    destination: '法国·巴黎',
    dateRange: '05.01 - 05.08',
    budget: '15000-20000',
    interests: ['艺术', '建筑', '浪漫'],
    match: 81,
    intro: '巴黎+小镇8日，逛博物馆看展，希望搭子也爱艺术。',
    guideId: 'g5',
  },
];

// 旅账
const bill = {
  tripName: '2026 川西环线',
  members: [
    { id: 'u1', name: '我', avatar: '😎' },
    { id: 'u2', name: '阿泽', avatar: '🧗' },
    { id: 'u3', name: '小鹿', avatar: '🦌' },
  ],
  entries: [
    { id: 'e1', payer: '我', payerId: 'u1', amount: 780, category: '交通', desc: '包车费', splitType: '均摊' },
    { id: 'e2', payer: '阿泽', payerId: 'u2', amount: 360, category: '住宿', desc: '康定客栈2晚', splitType: '均摊' },
    { id: 'e3', payer: '小鹿', payerId: 'u3', amount: 240, category: '餐饮', desc: '藏餐晚饭', splitType: '均摊' },
    { id: 'e4', payer: '我', payerId: 'u1', amount: 150, category: '门票', desc: '亚丁景区', splitType: '均摊' },
  ],
};

// 打卡记录
const checkins = [
  {
    id: 'c1',
    type: '打卡',
    icon: '📍',
    author: '雪山下的猫',
    avatar: '😸',
    location: '色达佛学院',
    date: '2026-05-02',
    images: ['🏘️', '🌇', '⛩️'],
    note: '日落时分红房子层层叠叠，用偏振镜压天空。这个机位是当地人告诉我的，去晚了就占不到了，蹲了一个多小时终于等到云开。',
    tags: ['摄影', '色达', '日落'],
    likes: 328,
    liked: false,
    comments: [
      { user: '摄影小白', text: '请问用的什么镜头呀？' },
      { user: '雪山下的猫', text: '35mm定焦，光圈f/8，压了偏振镜。' },
    ],
  },
  {
    id: 'c2',
    type: '打卡',
    icon: '📍',
    author: '钓鱼佬阿强',
    avatar: '🎣',
    location: '千岛湖东南湾',
    date: '2026-04-18',
    images: ['🐟', '🌊', '🚤', '🎣'],
    note: '傍晚炸水厉害，连竿3条翘嘴！水深4.5米，用亮片路亚，多云天气最出鱼。分享给同样爱钓鱼的搭子们。',
    tags: ['钓鱼', '路亚', '千岛湖'],
    likes: 156,
    liked: false,
    comments: [
      { user: '翘嘴克星', text: '这波羡慕了，下次带我一个' },
    ],
  },
  {
    id: 'c3',
    type: '打卡',
    icon: '📍',
    author: '徒步老王',
    avatar: '🧗',
    location: '稻城·牛奶海',
    date: '2026-05-05',
    images: ['🏔️', '🏞️'],
    note: '海拔4600米，往返徒步8公里，雪山倒映在湖里，值了！高反的朋友记得备好氧气罐。',
    tags: ['徒步', '高原', '稻城'],
    likes: 542,
    liked: false,
    comments: [
      { user: '氧气不能停', text: '牛奶海真的绝，我也去过' },
      { user: '想去但腿软', text: '骑马能到吗？' },
      { user: '徒步老王', text: '骑马到马站，最后40分钟得自己走。' },
    ],
  },
  {
    id: 'c4',
    type: '打卡',
    icon: '📍',
    author: '海风咸咸',
    avatar: '🏖️',
    location: '厦门·鼓浪屿',
    date: '2026-04-10',
    images: ['🏖️', '🏝️', '🌅'],
    note: '鼓浪屿慢生活第二天，早起看日出，海边发呆一整个上午。八市的海鲜太新鲜了，强烈安利。',
    tags: ['海岛', '文艺', '美食'],
    likes: 289,
    liked: false,
    comments: [
      { user: '文艺青年', text: '这也太治愈了吧' },
    ],
  },
  {
    id: 'c5',
    type: '打卡',
    icon: '📍',
    author: 'Sakura酱',
    avatar: '🌸',
    location: '日本·京都岚山',
    date: '2026-03-30',
    images: ['🌸', '⛩️', '🎋', '🚃'],
    note: '岚山竹林配樱花绝了！嵯峨野小火车沿途粉色一片，渡月桥两岸远山配樱花，这趟关西赏樱6日太值了。',
    tags: ['赏樱', '京都', '日本'],
    likes: 876,
    liked: false,
    comments: [
      { user: '樱花痴', text: '小火车票好难抢，楼主怎么订到的？' },
      { user: 'Sakura酱', text: '官网提前一个月蹲点抢的，樱花季秒空。' },
    ],
  },
  {
    id: 'c6',
    type: '打卡',
    icon: '📍',
    author: '背包客Leo',
    avatar: '🎒',
    location: '泰国·清莱白庙',
    date: '2026-11-12',
    images: ['🛕', '🐘', '🌴'],
    note: '清莱白庙纯白配蓝天太震撼，从清迈包车一日游把白庙蓝庙一起打卡了，泰国物价真的友好。',
    tags: ['寺庙', '清莱', '性价比'],
    likes: 421,
    liked: false,
    comments: [
      { user: '拍照狂魔', text: '白庙出片率满分' },
    ],
  },
  {
    id: 'c7',
    type: '打卡',
    icon: '📍',
    author: '欧游日记',
    avatar: '🗼',
    location: '法国·巴黎铁塔',
    date: '2026-05-02',
    images: ['🗼', '🥐', '🎨'],
    note: '傍晚在战神广场草坪野餐等铁塔亮灯，整点闪灯那一刻全场欢呼，巴黎的浪漫名不虚传。',
    tags: ['巴黎', '浪漫', '打卡'],
    likes: 658,
    liked: false,
    comments: [
      { user: '浪漫至上', text: '铁塔闪灯真的会让人心动' },
    ],
  },
];

// ============ 京东商业化数据 ============

// 京东酒旅频道：酒店/机票/门票/度假，按目的地聚合
const jdTravel = {
  banner: { title: 'PLUS会员酒旅专享', desc: '订酒店最高返8%京豆 · 机票低价预警', tag: 'PLUS' },
  tabs: ['酒店', '机票', '门票', '度假'],
  hotels: [
    { id: 'h1', name: '稻城亚丁星空帐篷营地', city: '四川·稻城', score: 4.8, price: 688, origin: 899, bean: 55, tag: '搭子拼房立减100', img: '⛺' },
    { id: 'h2', name: '厦门鼓浪屿海景民宿', city: '福建·厦门', score: 4.9, price: 520, origin: 680, bean: 42, tag: 'PLUS专享价', img: '🏨' },
    { id: 'h3', name: '京都和风町屋(近哲学之道)', city: '日本·京都', score: 4.7, price: 1280, origin: 1580, bean: 96, tag: '樱花季爆款', img: '🏯' },
    // g6 东京
    { id: 'h4', name: '浅草ビューホテル(地铁口2分)', city: '日本·东京', score: 4.6, price: 780, origin: 980, bean: 62, tag: '日式温泉+地铁直达', img: '🗼' },
    { id: 'h5', name: '涩谷十字路口Loft(夜景房)', city: '日本·东京', score: 4.7, price: 1180, origin: 1480, bean: 94, tag: '俯瞰涩谷十字路口', img: '🌃' },
    // g7 清迈
    { id: 'h6', name: '清迈古城白族客栈(带小泳池)', city: '泰国·清迈', score: 4.8, price: 260, origin: 360, bean: 28, tag: '塔佩门步行5分', img: '🐘' },
    { id: 'h7', name: '宁曼路精品民宿(咖啡街中心)', city: '泰国·清迈', score: 4.7, price: 380, origin: 480, bean: 38, tag: '咖啡控打卡首选', img: '☕' },
    // g8 大理/丽江
    { id: 'h8', name: '大理古城白族庭院客栈', city: '云南·大理', score: 4.8, price: 420, origin: 520, bean: 42, tag: '人民路步行3分', img: '🌸' },
    { id: 'h9', name: '束河古镇纳西庭院酒店', city: '云南·丽江', score: 4.9, price: 480, origin: 620, bean: 48, tag: '比大研安静 拍照出片', img: '🏮' },
    // g9 首尔/济州
    { id: 'h10', name: '明洞宜必思酒店(地铁口)', city: '韩国·首尔', score: 4.6, price: 520, origin: 680, bean: 52, tag: 'AREX直达免税店', img: '🏨' },
    { id: 'h11', name: '济州新罗海景度假村', city: '韩国·济州', score: 4.8, price: 780, origin: 980, bean: 78, tag: '城山日出峰步行可达', img: '🌊' },
  ],
  flights: [
    { id: 'f1', from: '北京', to: '成都', date: '10-01', price: 780, tag: '低价预警', img: '✈️' },
    { id: 'f2', from: '上海', to: '大阪', date: '03-28', price: 1650, tag: '樱花季直飞', img: '✈️' },
  ],
  tickets: [
    { id: 't1', name: '稻城亚丁景区门票+观光车', city: '稻城', price: 270, bean: 27, img: '🎫' },
    { id: 't2', name: '大阪环球影城1日券', city: '大阪', price: 420, bean: 42, img: '🎢' },
  ],
  holidays: [
    { id: 'v1', name: '川西7日跟团·含酒店门票', city: '成都出发', price: 3299, bean: 260, tag: '搭子成团价', img: '🚌' },
  ],
};

// 行前装备清单：根据攻略标签推荐京东商品（种草→加购）
const gearByTag = {
  高原: [
    { id: 'p1', name: '便携氧气罐(3瓶装)', price: 89, bean: 8, sales: '月销2万+', img: '🫧' },
    { id: 'p2', name: '红景天胶囊', price: 68, bean: 6, sales: '月销1.5万+', img: '💊' },
  ],
  摄影: [
    { id: 'p3', name: '偏振镜CPL 67mm', price: 129, bean: 12, sales: '月销8千+', img: '📷' },
    { id: 'p4', name: '碳纤维三脚架', price: 399, bean: 39, sales: '月销5千+', img: '🎚️' },
  ],
  自驾: [
    { id: 'p5', name: '车载充气泵', price: 159, bean: 15, sales: '月销1万+', img: '🔧' },
  ],
  海岛: [
    { id: 'p6', name: '防水手机袋', price: 25, bean: 2, sales: '月销3万+', img: '📱' },
    { id: 'p7', name: '速干沙滩巾', price: 49, bean: 4, sales: '月销9千+', img: '🏖️' },
  ],
  赏樱: [
    { id: 'p8', name: '樱花季穿搭·女士风衣', price:299, bean: 29, sales: '月销6千+', img: '🧥' },
  ],
  钓鱼: [
    { id: 'p9', name: '路亚竿套装', price: 268, bean: 26, sales: '月销7千+', img: '🎣' },
  ],
  // g6-g9 raw 攻略标签（购物/动漫/亲子/美食/休闲/文艺/性价比）
  购物: [
    { id: 'p10', name: '便携折叠行李箱(20寸登机)', price: 399, bean: 39, sales: '月销1.2万+', img: '🧳' },
    { id: 'p11', name: '环球漫游WiFi(多国通用)', price: 28, bean: 2, sales: '月销5万+', img: '📶' },
  ],
  动漫: [
    { id: 'p12', name: '秋叶原扭蛋机代币套装', price: 89, bean: 8, sales: '月销3千+', img: '🎰' },
    { id: 'p13', name: '二次元痛包(出行打卡)', price: 159, bean: 15, sales: '月销6千+', img: '🎒' },
  ],
  亲子: [
    { id: 'p14', name: '儿童防晒霜(SPF50+)', price: 79, bean: 7, sales: '月销2万+', img: '🧴' },
    { id: 'p15', name: '便携婴儿推车(可登机)', price: 899, bean: 89, sales: '月销4千+', img: '👶' },
  ],
  美食: [
    { id: 'p16', name: '便携电热水壶(折叠式)', price: 129, bean: 12, sales: '月销1.5万+', img: '🫖' },
    { id: 'p17', name: '肠胃常备药/益生菌套装', price: 89, bean: 8, sales: '月销3万+', img: '💊' },
  ],
  休闲: [
    { id: 'p18', name: '旅行颈枕记忆棉', price: 69, bean: 6, sales: '月销4万+', img: '🛏️' },
    { id: 'p19', name: '蓝牙降噪耳机', price: 599, bean: 59, sales: '月销8千+', img: '🎧' },
  ],
  文艺: [
    { id: 'p20', name: '旅行手账本+贴纸套装', price: 58, bean: 5, sales: '月销7千+', img: '📔' },
    { id: 'p21', name: '拍立得mini相纸(20张)', price: 89, bean: 8, sales: '月销1万+', img: '📸' },
  ],
  性价比: [
    { id: 'p22', name: '多功能转换插头(全球通用)', price: 45, bean: 4, sales: '月销2.5万+', img: '🔌' },
    { id: 'p23', name: '压缩毛巾(一次性旅行装)', price: 19, bean: 1, sales: '月销6万+', img: '🧻' },
  ],
};

// ==================== AI 攻略生成引擎数据 ====================

// 场景模板（首页"挑一个场景试试"）
const aiScenarios = [
  { id: 'sc1', icon: '🌸', name: '日本关西赏樱 6 日', days: 6, budget: 9800, people: '2 人', tags: ['赏樱', '拍照'], cover: '🌸' },
  { id: 'sc2', icon: '🏔️', name: '川西环线 7 日', days: 7, budget: 3800, people: '2 人', tags: ['自驾', '高原'], cover: '🏔️' },
  { id: 'sc3', icon: '🐘', name: '泰国清迈慢游 5 日', days: 5, budget: 4500, people: '独自', tags: ['寺庙', '美食'], cover: '🐘' },
  { id: 'sc4', icon: '🗼', name: '法国巴黎经典 8 日', days: 8, budget: 18800, people: '情侣', tags: ['艺术', '浪漫'], cover: '🗼' },
  { id: 'sc5', icon: '🏖️', name: '厦门鼓浪屿 3 日', days: 3, budget: 1500, people: '亲子', tags: ['海岛', '美食'], cover: '🏖️' },
  { id: 'sc6', icon: '🗾', name: '京都深度 5 日', days: 5, budget: 8500, people: '独自', tags: ['文化', '古迹'], cover: '🗾' },
];

// 维度选项（表单用）
const aiFormOptions = {
  people: ['独自', '情侣', '亲子', '朋友 2-4 人', '全家 5 人+'],
  pace: ['轻松休闲', '深度漫游', '特种兵打卡'],
  preferences: ['美食', '拍照', '文化古迹', '购物', '户外徒步', '亲子乐园', '海岛', '小众'],
  budgetLevel: ['¥3000 以下', '¥3000-8000', '¥8000-15000', '¥15000+'],
};

// AI 生成历史（首页展示）
const aiHistory = [
  { id: 'h1', title: '带娃冲绳 5 日', days: 5, budget: 12000, time: '刚刚', cover: '🌊' },
  { id: 'h2', title: '云南大理丽江 6 日', days: 6, budget: 4200, time: '1 小时前', cover: '🏞️' },
  { id: 'h3', title: '西藏拉萨 7 日', days: 7, budget: 6800, time: '昨天', cover: '🏔️' },
];

// AI 行程助手（攻略详情浮动入口用）
const aiAssistant = {
  name: 'AI 行程助手·小伴',
  avatar: '🤖',
  greeting: '我是你的 AI 行程助手小伴，攻略有需要调整的随时问我～',
  presets: [
    { label: '换成民宿为主', icon: '🏡' },
    { label: '加亲子景点', icon: '🎠' },
    { label: '避开人多的', icon: '🙅' },
    { label: '预算砍半', icon: '💰' },
    { label: '美食优先', icon: '🍜' },
    { label: '节奏再慢点', icon: '🐢' },
  ],
};

// 会员成长体系
const membership = {
  level: 'PLUS会员',
  levelIcon: '👑',
  growth: 3200,
  nextLevel: 5000,
  bean: 1860, // 京豆余额
  benefits: [
    { icon: '🏨', name: '酒店返豆', desc: '订酒店最高返8%' },
    { icon: '🎫', name: '门票折扣', desc: '景区门票专享价' },
    { icon: '🚚', name: '免运费', desc: '装备包邮到家' },
    { icon: '🎁', name: '生日礼', desc: '旅行月双倍豆' },
  ],
};

// 旅行任务体系（促活跃/打开率）
const tasks = {
  signInDays: 4, // 已连续签到天数
  signedToday: false,
  list: [
    { id: 'task1', name: '每日打开旅伴', reward: 5, done: true, cta: '已完成' },
    { id: 'task2', name: '浏览1篇攻略', reward: 10, done: true, cta: '已完成' },
    { id: 'task3', name: '收藏1个京东酒店', reward: 20, done: false, cta: '去收藏' },
    { id: 'task4', name: '分享攻略给好友', reward: 30, done: false, cta: '去分享' },
    { id: 'task5', name: '完成1单酒旅预订', reward: 200, done: false, cta: '去预订' },
  ],
};

// 京东订单（旅账关联，可一键导入拆分）
const jdOrders = [
  { id: 'o1', name: '稻城亚丁星空帐篷营地·2晚', amount: 1376, category: '住宿', date: '2026-05-01', img: '⛺' },
  { id: 'o2', name: '便携氧气罐(3瓶装) x2', amount: 178, category: '装备', date: '2026-04-28', img: '🫧' },
  { id: 'o3', name: '稻城亚丁景区门票+观光车 x3', amount: 810, category: '门票', date: '2026-05-02', img: '🎫' },
];

// 聊天会话（IM 社交闭环）——初始预置若干会话，运行时用 storage 持久化增量
const conversations = [
  {
    id: 'conv_g1',
    name: '雪山向导老王',
    avatar: '🏔️',
    lastMsg: '亚丁那条线我走过很多次，随时问我～',
    time: '10:24',
    unread: 0,
    messages: [
      { from: 'other', text: '你好呀！看到你收藏了稻城亚丁的攻略～', time: '10:20' },
      { from: 'me', text: '是的，正准备十一去，有些细节想请教楼主', time: '10:22' },
      { from: 'other', text: '亚丁那条线我走过很多次，随时问我～', time: '10:24' },
    ],
  },
  {
    id: 'conv_b1',
    name: '登山客阿泽',
    avatar: '🧗',
    lastMsg: '好呀，那我们约稻城亚丁的行程细节～',
    time: '昨天',
    unread: 2,
    messages: [
      { from: 'me', text: '你好，我想和你一起结伴去稻城亚丁，方便一起吗？', time: '昨天 18:30' },
      { from: 'other', text: '好呀，那我们约稻城亚丁的行程细节～', time: '昨天 18:35' },
    ],
  },
];

// ===== AI 攻略生成：通用模板库（无现成攻略时按目的地关键字兜底）=====
// 模板覆盖 6 个大类；命中关键字时拼装成节点数组
const aiTemplateScenes = {
  // 1. 海岛度假
  island: {
    keywords: ['普吉', '巴厘', '马尔代夫', '三亚', '厦门', '青岛', '大连', '海岛', '沙巴', '长滩', '芽庄', '苏梅', '塞班', '冲绳'],
    cover: '🏝️',
    summary: '阳光沙滩+海鲜大餐+海上项目，慢节奏海边度假。',
    tags: ['休闲', '亲子', '海岛'],
    author: 'AI 攻略小伴',
    nodesByDay: (day, ctx) => ([
      {
        day, seq: 1, type: 'location',
        title: '抵达 + 海边漫步',
        location: ctx.dest + '·海边',
        cost: 0,
        timeSlot: '14:00-21:00',
        transport: '机场打车到酒店约¥80，建议提前订接机',
        accommodation: ctx.budgetHotel || '海景房 标间480元/晚，含早',
        meal: { breakfast: '飞机餐', lunch: '机场简餐', dinner: '酒店附近海鲜排档，人均¥120' },
        note: '傍晚沙滩散步+看日落',
        danmu: [{ user: 'AI 小伴', text: '海岛第一天不要排满，先适应气候' }],
        qa: { '防晒怎么做': 'SPF50+ 每 2 小时补涂，戴帽子墨镜，下午 4 点后下水。' },
      },
      {
        day, seq: 2, type: 'location',
        title: '浮潜/海上项目一日',
        location: ctx.dest + '·海上',
        cost: 380,
        timeSlot: '09:00-17:00',
        transport: '酒店拼船出海，含接送',
        accommodation: '同上',
        meal: { breakfast: '酒店自助', lunch: '船上 BBQ', dinner: '酒店附近泰式/海鲜餐厅 ¥150' },
        note: '浮潜看珊瑚+海钓',
        danmu: [{ user: '老玩家', text: '带防水手机袋，珊瑚区不能踩' }],
        qa: { '会不会晕船': '近岛一般不会，远海建议出发前 30 分钟吃晕船药。' },
      },
      {
        day, seq: 3, type: 'location',
        title: '环岛游 + 景点打卡',
        location: ctx.dest,
        cost: 200,
        timeSlot: '09:00-19:00',
        transport: '包车一日 ¥260，自驾/电瓶车也可',
        accommodation: '同上',
        meal: { breakfast: '酒店', lunch: '景区餐厅 ¥60', dinner: '夜市小吃 ¥80' },
        note: '看日落最佳点 + 灯塔',
        danmu: [{ user: '摄影派', text: '山顶日落 5:30pm 最好' }],
        qa: { '环岛几天合适': '3 天环岛，5 天能加跳岛。' },
      },
    ]),
  },

  // 2. 都市购物
  city: {
    keywords: ['香港', '澳门', '新加坡', '曼谷', '首尔', '东京', '大阪', '台北', '上海', '广州', '深圳', '成都', '重庆'],
    cover: '🛍️',
    summary: '经典景点+购物血拼+米其林餐厅，城市便利玩法。',
    tags: ['购物', '美食', '都市'],
    author: 'AI 攻略小伴',
    nodesByDay: (day, ctx) => ([
      {
        day, seq: 1, type: 'location',
        title: '抵达 + 标志性景点',
        location: ctx.dest + '·地标',
        cost: 0,
        timeSlot: '14:00-21:00',
        transport: '机场快线/打车到酒店约¥80',
        accommodation: ctx.budgetHotel || '市中心酒店 标间520元/晚',
        meal: { breakfast: '飞机餐', lunch: '机场便当', dinner: '米其林一星餐厅，人均¥280' },
        note: '先看夜景打打卡',
        danmu: [{ user: 'AI 小伴', text: '城市第一天别买重物，留出购物时间' }],
        qa: { '打车用什么': 'Grab/Uber/滴滴国际版，机场有正规出租。' },
      },
      {
        day, seq: 2, type: 'location',
        title: '购物区一日游',
        location: ctx.dest + '·商圈',
        cost: 0,
        timeSlot: '10:00-21:00',
        transport: '地铁一日券最划算',
        accommodation: '同上',
        meal: { breakfast: '酒店自助', lunch: '商场美食广场 ¥80', dinner: '本地网红餐厅 ¥150' },
        note: '退税攻略：单店满额+护照',
        danmu: [{ user: '代购党', text: '晚上 9 点后商场打折' }],
        qa: { '买什么划算': '化妆品/小家电/药妆，退税率 8-15% 不等。' },
      },
      {
        day, seq: 3, type: 'location',
        title: '文化景点 + 返程',
        location: ctx.dest,
        cost: 200,
        timeSlot: '09:00-15:00',
        transport: '地铁/打车到机场',
        accommodation: '返程',
        meal: { breakfast: '酒店', lunch: '百年老店 ¥120', dinner: '飞机餐' },
        note: '博物馆/历史街区',
        danmu: [{ user: '老饕', text: '老字号要提前 1 天订位' }],
        qa: { '机场提前多久': '国际航班提前 3 小时到机场。' },
      },
    ]),
  },

  // 3. 雪山高原
  plateau: {
    keywords: ['西藏', '拉萨', '稻城', '亚丁', '青海', '玉树', '香格里拉', '梅里', '林芝', '色达', '冈仁波齐', '新疆', '喀什', '阿里', '高原', '雪山', '川西', '甘南'],
    cover: '🏔️',
    summary: '高海拔路线，注意预防高反，行程节奏放慢。',
    tags: ['自驾', '摄影', '高原'],
    author: 'AI 攻略小伴',
    nodesByDay: (day, ctx) => ([
      {
        day, seq: 1, type: 'location',
        title: '低海拔适应 + 出发',
        location: ctx.dest,
        cost: 0,
        timeSlot: '08:00-18:00',
        transport: '自驾 G318/G109 约 4-6h',
        accommodation: ctx.budgetHotel || '县城酒店 标间280元/晚，海拔<3500m 缓解高反',
        meal: { breakfast: '出发前清淡', lunch: '服务区简餐', dinner: '藏式牦牛肉火锅 ¥80' },
        note: '前 24h 不洗澡不剧烈运动',
        danmu: [{ user: 'AI 小伴', text: '红景天出发前 3 天开始吃' }],
        qa: { '高反严重吗': '大多数人体质可适应，备葡萄糖+氧气瓶。' },
      },
      {
        day, seq: 2, type: 'location',
        title: '核心景区深度游',
        location: ctx.dest,
        cost: 350,
        timeSlot: '08:00-19:00',
        transport: '景区观光车/电瓶车',
        accommodation: '景区门口民宿 380元/晚',
        meal: { breakfast: '民宿', lunch: '景区餐厅 ¥60', dinner: '民宿家常菜 ¥80' },
        note: '主峰+冰川+海子',
        danmu: [{ user: '老驴', text: '主峰天气多变，看运气' }],
        qa: { '要请向导吗': '核心徒步线强烈建议请当地向导。' },
      },
      {
        day, seq: 3, type: 'location',
        title: '短线拍摄 + 返程',
        location: ctx.dest,
        cost: 200,
        timeSlot: '08:00-15:00',
        transport: '原路返回低海拔',
        accommodation: '返程',
        meal: { breakfast: '民宿', lunch: '途中小镇 ¥50', dinner: '抵达地简餐' },
        note: '日出机位+藏寨',
        danmu: [{ user: '摄影派', text: '日出前 30 分钟到机位' }],
        qa: { '自驾注意事项': '盘山路减速会车，备防滑链（冬季）。' },
      },
    ]),
  },

  // 4. 古镇文艺
  ancient: {
    keywords: ['丽江', '大理', '凤凰', '平遥', '乌镇', '西塘', '周庄', '宏村', '婺源', '阳朔', '镇远', '苏州', '绍兴', '敦煌'],
    cover: '🏮',
    summary: '古镇漫游+小桥流水+文艺咖啡店，慢生活体验。',
    tags: ['文艺', '摄影', '休闲'],
    author: 'AI 攻略小伴',
    nodesByDay: (day, ctx) => ([
      {
        day, seq: 1, type: 'location',
        title: '抵达 + 古镇漫步',
        location: ctx.dest + '·古镇',
        cost: 0,
        timeSlot: '14:00-21:00',
        transport: '高铁站打车 ¥30-50',
        accommodation: ctx.budgetHotel || '古镇内客栈 标间360元/晚，雕花木窗',
        meal: { breakfast: '飞机/高铁餐', lunch: '服务区简餐', dinner: '古镇私房菜 ¥80' },
        note: '傍晚小桥流水最美',
        danmu: [{ user: 'AI 小伴', text: '客栈选临河位置，清晨开窗就是景' }],
        qa: { '人会不会很多': '避开周末和节假日，工作日非常安静。' },
      },
      {
        day, seq: 2, type: 'location',
        title: '周边村寨 + 手作体验',
        location: ctx.dest + '·周边',
        cost: 200,
        timeSlot: '09:00-19:00',
        transport: '包车一日 ¥260',
        accommodation: '同客栈',
        meal: { breakfast: '客栈米线', lunch: '农家乐 ¥60', dinner: '古镇米其林推荐 ¥150' },
        note: '扎染/陶艺/古道徒步',
        danmu: [{ user: '文青', text: '宏村/婺源油菜花季 3 月最美' }],
        qa: { '手作体验哪里': '淘宝搜「XX 手作体验」提前 1 天预约。' },
      },
      {
        day, seq: 3, type: 'location',
        title: '日出 + 返程',
        location: ctx.dest,
        cost: 50,
        timeSlot: '05:00-12:00',
        transport: '高铁站打车',
        accommodation: '返程',
        meal: { breakfast: '古镇早茶 ¥30', lunch: '高铁便当', dinner: '返程' },
        note: '清晨 5:30 看晨雾',
        danmu: [{ user: '老玩家', text: '古镇门票基本免费，内部小景点另收' }],
        qa: { '高铁站提前多久': '提前 1 小时到站。' },
      },
    ]),
  },

  // 5. 户外徒步
  hiking: {
    keywords: ['徒步', '登山', '武功山', '四姑娘山', '梅里', '雨崩', '虎跳峡', '贡嘎', '鳌太', '太白山', '武夷山', '黄山', '张家界', '三清山', '徒步穿越'],
    cover: '🥾',
    summary: '专业徒步路线，装备齐全，量力而行。',
    tags: ['户外', '徒步', '挑战'],
    author: 'AI 攻略小伴',
    nodesByDay: (day, ctx) => ([
      {
        day, seq: 1, type: 'location',
        title: '进山 + 装备检查',
        location: ctx.dest + '·山脚',
        cost: 0,
        timeSlot: '08:00-18:00',
        transport: '自驾/包车到进山口',
        accommodation: ctx.budgetHotel || '山脚客栈 标间200元/晚',
        meal: { breakfast: '客栈', lunch: '沿途简餐 ¥40', dinner: '客栈家常菜 ¥60' },
        note: '必备：登山杖/护膝/头灯/雨衣',
        danmu: [{ user: 'AI 小伴', text: '提前看天气，山里雨说下就下' }],
        qa: { '要不要请向导': '首次进山强烈建议请向导，淘宝搜「XX 向导」' },
      },
      {
        day, seq: 2, type: 'location',
        title: '主峰徒步',
        location: ctx.dest + '·主峰',
        cost: 100,
        timeSlot: '06:00-19:00',
        transport: '徒步',
        accommodation: '山顶客栈/帐篷营地 ¥160',
        meal: { breakfast: '客栈 ¥20', lunch: '路餐（自备能量棒/巧克力）', dinner: '山顶简餐 ¥50' },
        note: '日出日落机位',
        danmu: [{ user: '老驴', text: '主峰日出 4:30 出发' }],
        qa: { '体力要求': '能连续走 6 小时山路 + 1000m 爬升为宜。' },
      },
      {
        day, seq: 3, type: 'location',
        title: '下山 + 返程',
        location: ctx.dest,
        cost: 0,
        timeSlot: '07:00-15:00',
        transport: '原路下山',
        accommodation: '返程',
        meal: { breakfast: '山顶 ¥20', lunch: '山脚农家乐 ¥60', dinner: '返程' },
        note: '膝盖护好，下山慢走',
        danmu: [{ user: '老驴', text: '护膝+登山杖可保膝盖' }],
        qa: { '会失联吗': '山上大多有信号，户外保险必备。' },
      },
    ]),
  },

  // 6. 亲子乐园
  family: {
    keywords: ['亲子', '带娃', '孩子', '小孩', '宝宝', '儿童', '迪士尼', '海洋公园', '动物园', '方特', '长隆', '新加坡环球影城'],
    cover: '🎠',
    summary: '主题乐园+动物互动+亲子餐厅，节奏放慢，孩子开心大人不累。',
    tags: ['亲子', '休闲', '主题'],
    author: 'AI 攻略小伴',
    nodesByDay: (day, ctx) => ([
      {
        day, seq: 1, type: 'location',
        title: '抵达 + 主题乐园一日',
        location: ctx.dest + '·主题乐园',
        cost: 480,
        timeSlot: '09:00-20:00',
        transport: '打车/酒店班车',
        accommodation: ctx.budgetHotel || '亲子主题酒店 标间680元/晚，乐园元素',
        meal: { breakfast: '酒店亲子餐', lunch: '乐园主题餐厅 ¥120', dinner: '乐园内儿童套餐 ¥80' },
        note: '提前下载乐园 APP 看排队',
        danmu: [{ user: 'AI 小伴', text: '工作日人少，周末爆满' }],
        qa: { '门票在哪买': '官方 APP 早鸟票比现场便宜 50 元/人。' },
      },
      {
        day, seq: 2, type: 'location',
        title: '动物园/海洋馆',
        location: ctx.dest,
        cost: 200,
        timeSlot: '09:00-17:00',
        transport: '地铁/打车',
        accommodation: '同亲子酒店',
        meal: { breakfast: '酒店', lunch: '园内亲子餐厅 ¥100', dinner: '酒店附近家常菜 ¥120' },
        note: '喂食/表演/科普',
        danmu: [{ user: '宝爸', text: '海豚表演要看场次表' }],
        qa: { '婴儿车租吗': '门口免费租，但旺季抢手。' },
      },
      {
        day, seq: 3, type: 'location',
        title: '公园/博物馆 + 返程',
        location: ctx.dest,
        cost: 100,
        timeSlot: '09:00-15:00',
        transport: '打车到机场/车站',
        accommodation: '返程',
        meal: { breakfast: '酒店', lunch: '亲子餐厅 ¥80', dinner: '返程' },
        note: '室内备选：雨天备选',
        danmu: [{ user: '宝妈', text: '科学博物馆最耐逛' }],
        qa: { '孩子年龄适合吗': '3-12 岁乐园类，海洋馆全年龄。' },
      },
    ]),
  },
};

// 兜底：未命中关键字时用的通用模板
const aiTemplateDefault = {
  cover: '🗺️',
  summary: '根据你的出行条件 AI 自动拼装，细节可向 AI 行程助手继续追问。',
  tags: ['AI 生成', '通用模板'],
  author: 'AI 攻略小伴',
  nodesByDay: (day, ctx) => ([
    {
      day, seq: 1, type: 'location',
      title: '抵达 + 城市初印象',
      location: ctx.dest,
      cost: 0,
      timeSlot: '14:00-21:00',
      transport: '机场/高铁站打车到酒店',
      accommodation: ctx.budgetHotel || '市中心酒店 标间450元/晚',
      meal: { breakfast: '出发地', lunch: '车站简餐', dinner: '酒店附近本地餐厅 ¥100' },
      note: '慢节奏熟悉环境',
      danmu: [{ user: 'AI 小伴', text: '可向 AI 行程助手继续追问详细玩法' }],
      qa: { '第一天玩什么': '建议附近商圈+老街，先适应。' },
    },
    {
      day, seq: 2, type: 'location',
      title: '经典景点 + 当地美食',
      location: ctx.dest,
      cost: 300,
      timeSlot: '09:00-19:00',
      transport: '地铁一日券',
      accommodation: '同上',
      meal: { breakfast: '酒店', lunch: '景区附近 ¥80', dinner: '本地老字号 ¥150' },
      note: '博物馆+老街',
      danmu: [{ user: 'AI 小伴', text: '热门景点早 9 点前人少' }],
      qa: { '景点要不要预约': '国内大多现场买，海外热门要 APP 预约。' },
    },
    {
      day, seq: 3, type: 'location',
      title: '自由活动 + 返程',
      location: ctx.dest,
      cost: 100,
      timeSlot: '09:00-15:00',
      transport: '打车到机场/车站',
      accommodation: '返程',
      meal: { breakfast: '酒店', lunch: '返程途中 ¥50', dinner: '返程' },
      note: '伴手礼采购',
      danmu: [{ user: 'AI 小伴', text: '机场安检后还有特产店' }],
      qa: { '伴手礼推荐': '本地特色糕点/茶/工艺品为佳。' },
    },
  ]),
};

/**
 * mockAiGenerate：本地攻略未命中时，按目的地/天数/预算/同行人/节奏/偏好，动态生成攻略对象
 * @param {Object} form { destination, days, budgetLevel, people, pace, preferences }
 * @returns {Object} 攻略对象（结构与 mock.guides 一致，source='ai' 标识 AI 生成）
 */
function mockAiGenerate(form) {
  const dest = (form.destination || '').trim();
  const days = Math.max(1, Math.min(15, parseInt(form.days) || 5));
  const budget = parseInt(String(form.budgetLevel).replace(/[^0-9]/g, '')) || 5000;
  const pace = form.pace || '深度漫游';
  const people = form.people || '情侣';
  const prefs = (form.preferences || []).join('、');

  // 1. 命中场景模板
  let scene = aiTemplateDefault;
  for (const key in aiTemplateScenes) {
    const sc = aiTemplateScenes[key];
    if (sc.keywords.some((k) => dest.includes(k))) { scene = sc; break; }
  }

  // 2. 拼装节点：根据 days 数量循环（取模板前 3 天模式）
  const ctx = { dest, budgetHotel: 'AI 推荐酒店 标间' + Math.round(budget * 0.25 / days) + '元/晚' };
  const nodes = [];
  const seq = 1;
  for (let d = 1; d <= days; d++) {
    const tplNodes = scene.nodesByDay(d, ctx);
    // 取当天的代表性节点（节奏映射：快闪 1 个、深度 3 个、漫游 2 个）
    let pickCount = 2;
    if (/快闪|紧凑|特种兵/.test(pace)) pickCount = 1;
    else if (/深度|漫游|慢/.test(pace)) pickCount = Math.min(3, tplNodes.length);
    for (let i = 0; i < pickCount; i++) {
      const n = Object.assign({}, tplNodes[i]);
      n.day = d;
      n.seq = seq + i;
      n.title = n.title + (d > 3 ? '（续）' : '');
      nodes.push(n);
    }
  }

  // 3. 拼预算和出行提示
  const coverEmoji = scene.cover || '🤖';
  const totalBudget = Math.round(budget * days / 5); // 简单按天数比例
  const summaryParts = [
    scene.summary,
    '基于「' + dest + ' ' + days + '日」AI 自动生成',
    '同行：' + people,
    '节奏：' + pace,
  ];
  if (prefs) summaryParts.push('偏好：' + prefs);

  return {
    id: 'ai_' + Date.now(),
    title: dest + ' ' + days + '日 AI 攻略',
    author: 'AI 攻略小伴',
    destination: dest,
    days: days,
    budget: totalBudget,
    cover: coverEmoji,
    tags: (scene.tags || []).concat(['AI 生成']),
    likes: 0,
    copies: 0,
    summary: summaryParts.join(' · '),
    nodes: nodes,
    source: 'ai', // 标识 AI 生成
    fromForm: { destination: dest, days, budgetLevel: form.budgetLevel, people, pace, preferences: form.preferences || [] },
  };
}

/**
 * parseRawGuide：模拟 LLM 解析外部抓取的原始笔记（小红书/马蜂窝）
 * 输入：raw 笔记对象（含 rawContent/rawTitle/rawTags 等）
 * 输出：结构化 nodes 数组（与 guides[*].nodes 同结构）
 *
 * 真实实现：调 LLM 抽取，这里用正则 + 行解析的 mock 实现
 * 解析维度：day / location / cost / transport / accommodation / meal
 */
function parseRawGuide(raw) {
  const content = (raw.rawContent || '').replace(/\r/g, '');
  const lines = content.split('\n').map((l) => l.trim()).filter(Boolean);
  const nodes = [];

  // 1. 按 "DayN" 切分段落
  const dayPattern = /^[Dd]ay\s*(\d+)\s*(.+)?$/;
  const dayBlocks = [];
  let cur = null;
  for (const line of lines) {
    const m = line.match(dayPattern);
    if (m) {
      if (cur) dayBlocks.push(cur);
      cur = { day: parseInt(m[1]), tail: (m[2] || '').trim(), text: line + '\n' };
    } else if (cur) {
      cur.text += line + '\n';
    }
  }
  if (cur) dayBlocks.push(cur);

  // 2. 每个 block 抽字段
  for (const blk of dayBlocks) {
    const text = blk.text;

    // 抽取地点（"Day1 下午到 X"，"Day1 X + Y"，"X站"），优先用「+」前第一个景点
    const titleMatch = text.match(/Day\s*\d+\s*(?:[上中下]午|早上|凌晨|傍晚|晚上|深夜)?\s*[\s,，、-]*([^+\n，。,]+)/);
    let title = titleMatch ? titleMatch[1].trim() : ('Day ' + blk.day);
    if (blk.tail) title = (title + ' ' + blk.tail).slice(0, 30);
    // 清理标题里残留的标点
    title = title.replace(/[，。,、!！?？]+$/, '').trim();

    // 抽取交通
    const transportMatch = text.match(/(?:交通|坐|乘|打车|地铁|公交|机场|高铁|动车|包车|拼车|打车|步行|走|线路|打车去)[^。\n]*/);
    const transport = transportMatch ? transportMatch[0].slice(0, 60) : '';

    // 抽取住宿（"住 X" / "民宿 X" / "酒店 X" / "标间 X"）
    const hotelMatch = text.match(/(?:住|入住|民宿|酒店|客栈|标间|青旅)([^。\n,，]{2,60})/);
    const accommodation = hotelMatch ? hotelMatch[0].slice(0, 80) : '';

    // 抽取费用（"人均 X" / "X 元" / "X 块" / "X ¥" / "X RMB"）
    const costMatches = text.match(/[¥￥]?\s*(\d{2,5})\s*(?:元|RMB|块|人|每人|人均)?/g) || [];
    let cost = 0;
    for (const c of costMatches) {
      const n = parseInt(c.replace(/[^\d]/g, '')) || 0;
      if (n >= 20 && n <= 2000) cost += n;
    }
    cost = Math.min(cost, 1500); // 兜底上限

    // 抽取餐饮
    const meals = { breakfast: '未提及', lunch: '未提及', dinner: '未提及' };
    const dinnerMatch = text.match(/(?:晚上|晚餐|晚饭|夜宵|晚上吃|晚餐吃)[^。\n]*?([\u4e00-\u9fa5A-Za-z\s\+\&·\-\d¥]+?)(?:[，。\n]|$)/);
    const lunchMatch = text.match(/(?:中午|午餐|午饭)[^。\n]*?([\u4e00-\u9fa5A-Za-z\s\+\&·\-\d¥]+?)(?:[，。\n]|$)/);
    const breakfastMatch = text.match(/(?:早上|早餐|早饭|凌晨|清晨|一[早]|起床)[^。\n]*?([\u4e00-\u9fa5A-Za-z\s\+\&·\-\d¥]+?)(?:[，。\n]|$)/);
    if (dinnerMatch) meals.dinner = dinnerMatch[0].slice(0, 30);
    if (lunchMatch) meals.lunch = lunchMatch[0].slice(0, 30);
    if (breakfastMatch) meals.breakfast = breakfastMatch[0].slice(0, 30);

    // 抽取踩坑/警示
    const warnings = [];
    const warningMatches = text.match(/[⚠️避雷：:：]?[^\n⚠️避雷]+/g) || [];
    for (const w of warningMatches) {
      if (/避雷|踩坑|⚠️|注意/.test(w)) warnings.push(w.slice(0, 80).trim());
    }

    // 时间段
    const timeMatch = text.match(/((?:[上中下]午)?\s*\d{1,2}\s*[:：]\s*\d{2}|凌晨\s*\d{1,2}\s*[:：]\s*\d{2})/);
    const timeSlot = timeMatch ? timeMatch[1] : '09:00-18:00';

    // 抽取地点
    const locationMatch = text.match(/(?:到|去|在|前往|飞)(\S+?[市区县站塔寺山岛港镇城])/);
    const location = locationMatch ? locationMatch[1] : title.slice(0, 8);

    nodes.push({
      day: blk.day,
      seq: 1,
      type: 'location',
      title: title || ('Day ' + blk.day),
      location: location,
      cost: cost,
      timeSlot: timeSlot,
      transport: transport,
      accommodation: accommodation,
      meal: meals,
      note: warnings.length ? ('⚠️ ' + warnings[0]) : '',
      danmu: [{ user: 'AI 解析', text: '此节点由 AI 从原始笔记抽取' }],
      qa: {},
    });
  }

  return nodes;
}

// ==================== 旅行空间（搭子拼成后建立） ====================
// 一次出行 = 一个 space，搭子对可建多个 space
// 攻略即契约：space.guideId 决定本次出行的路线骨架，所有成员共编
// 平权模式：所有成员 role: 'member'，都能改攻略+记账+收款
const travelSpaces = [
  {
    id: 'sp1',
    guideId: 'g1', // 绑 g1 川西环线
    title: '川西稻城亚丁星空之旅',
    cover: '🏔️',
    destination: '四川·甘孜',
    days: 7,
    budget: 4500,
    travelDate: '2024-10-01',
    createdAt: '2024-09-15',
    members: [
      { id: 'u1', nickname: '我', avatar: '🧑', role: 'member',
        creditScore: 92, pastTrips: 3, tags: ['靠谱', '准时'] },
      { id: 'u2', nickname: '登山客阿泽', avatar: '🧗', role: 'member',
        creditScore: 96, pastTrips: 5, tags: ['靠谱', '有趣'] },
    ],
  },
  {
    id: 'sp2',
    guideId: 'g5', // 绑 g5 巴黎+小镇
    title: '巴黎艺术漫游',
    cover: '🗼',
    destination: '法国·巴黎',
    days: 8,
    budget: 18800,
    travelDate: '2024-05-01',
    createdAt: '2024-04-20',
    members: [
      { id: 'u1', nickname: '我', avatar: '🧑', role: 'member',
        creditScore: 92, pastTrips: 3, tags: ['靠谱', '准时'] },
      { id: 'u6', nickname: '欧游日记', avatar: '🗼', role: 'member',
        creditScore: 88, pastTrips: 2, tags: ['艺术', '浪漫'] },
    ],
  },
];

// 旅账：差额AA，任一成员付，结算时算净转账
const spaceLedger = [
  // sp1 川西
  { id: 'l1', spaceId: 'sp1', title: '稻城亚丁景区门票', amount: 540, category: '门票',
    payerId: 'u1', date: '2024-10-02', splits: ['u1', 'u2'] },
  { id: 'l2', spaceId: 'sp1', title: '星空帐篷营地住宿', amount: 1376, category: '住宿',
    payerId: 'u2', date: '2024-10-03', splits: ['u1', 'u2'] },
  { id: 'l3', spaceId: 'sp1', title: '新都桥牦牛肉汤锅', amount: 240, category: '餐饮',
    payerId: 'u1', date: '2024-10-04', splits: ['u1', 'u2'] },
  { id: 'l4', spaceId: 'sp1', title: '包车费(成都-稻城往返)', amount: 780, category: '交通',
    payerId: 'u2', date: '2024-10-05', splits: ['u1', 'u2'] },
  // sp2 巴黎
  { id: 'l5', spaceId: 'sp2', title: '卢浮宫门票', amount: 320, category: '门票',
    payerId: 'u6', date: '2024-05-02', splits: ['u1', 'u6'] },
  { id: 'l6', spaceId: 'sp2', title: '塞纳河游船晚餐', amount: 880, category: '餐饮',
    payerId: 'u1', date: '2024-05-03', splits: ['u1', 'u6'] },
];

// 攻略共编留痕：每条编辑记录 {user, idx, oldVal, newVal, time}
const spaceEdits = [
  { id: 'e1', spaceId: 'sp1', userId: 'u2', nodeIdx: 2,
    oldVal: '冲古寺', newVal: '冲古寺+珍珠海',
    time: '2024-09-20 14:23', reason: '珍珠海徒步半小时就到，多一个景点不亏' },
  { id: 'e2', spaceId: 'sp1', userId: 'u1', nodeIdx: 4,
    oldVal: '稻城阳光酒店 标间200元', newVal: '稻城阳光酒店 标间220元(含早)',
    time: '2024-09-22 10:15', reason: '含早餐省事' },
  { id: 'e3', spaceId: 'sp2', userId: 'u6', nodeIdx: 1,
    oldVal: '卢浮宫(2小时)', newVal: '卢浮宫(半天)+杜伊勒里花园',
    time: '2024-04-25 16:40', reason: '加杜伊勒里花园顺路，春天郁金香超美' },
];

// 会话 ↔ 空间 关联（拼成后自动建空间，spaceId 写回会话）
const conversationSpace = {
  'c1-b1': 'sp1',  // 我 ↔ 登山客阿泽 → sp1
  'c1-b6': 'sp2',  // 我 ↔ 欧游日记 → sp2
};

module.exports = {
  guides,
  buddies,
  bill,
  checkins,
  jdTravel,
  gearByTag,
  membership,
  tasks,
  jdOrders,
  conversations,
  aiScenarios,
  aiFormOptions,
  aiHistory,
  aiAssistant,
  aiTemplateScenes,
  mockAiGenerate,
  parseRawGuide,
  travelSpaces,
  spaceLedger,
  spaceEdits,
  conversationSpace,
};
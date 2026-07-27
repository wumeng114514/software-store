// ========== 商品数据 ==========
const products = [
  { id: 1, name: "高级视频剪辑工具", desc: "专业级视频编辑软件，支持4K/8K剪辑、特效合成、色彩校正，适合内容创作者。", price: 99, originalPrice: 199, category: "media", icon: "🎬", hot: true, features: ["支持4K/8K超高清", "100+转场特效", "AI智能剪辑", "多轨时间线"] },
  { id: 2, name: "系统优化大师", desc: "一键清理系统垃圾、优化启动项、加速网络，让电脑飞速运行。", price: 49, originalPrice: 99, category: "tool", icon: "🚀", hot: true, features: ["一键深度清理", "启动项管理", "内存释放", "注册表优化"] },
  { id: 3, name: "代码编辑器 Pro", desc: "轻量级代码编辑器，支持100+语言高亮、智能补全、Git集成。", price: 79, originalPrice: 149, category: "dev", icon: "💻", hot: true, features: ["100+语言支持", "智能代码补全", "内置终端", "Git版本控制"] },
  { id: 4, name: "数据恢复精灵", desc: "支持硬盘、U盘、存储卡等多种存储设备的数据恢复，恢复率高达98%。", price: 69, originalPrice: 129, category: "tool", icon: "💾", hot: true, features: ["深度扫描恢复", "支持多种存储设备", "预览后恢复", "98%恢复率"] },
  { id: 5, name: "游戏加速器", desc: "全球节点加速，降低延迟，支持主流网游和单机游戏加速。", price: 39, originalPrice: 79, category: "game", icon: "🎮", hot: false, features: ["全球50+节点", "智能选路", "降低90%延迟", "支持500+游戏"] },
  { id: 6, name: "PDF工具箱", desc: "PDF转换、合并、拆分、加密、OCR识别，一站式PDF解决方案。", price: 59, originalPrice: 119, category: "tool", icon: "📄", hot: false, features: ["PDF转Word/Excel", "合并拆分", "OCR文字识别", "加密保护"] },
  { id: 7, name: "API调试平台", desc: "开发者必备的API测试工具，支持REST/GraphQL、自动化测试、团队协作。", price: 89, originalPrice: 169, category: "dev", icon: "🔧", hot: false, features: ["REST/GraphQL支持", "自动化测试", "环境变量管理", "团队协作"] },
  { id: 8, name: "音频工作站", desc: "专业音频编辑和混音工具，支持VST插件、多轨混音、母带处理。", price: 129, originalPrice: 249, category: "media", icon: "🎵", hot: false, features: ["多轨混音", "VST插件支持", "母带处理", "降噪修复"] },
  { id: 9, name: "屏幕录制专家", desc: "高清屏幕录制，支持游戏录制、教程制作、直播推流。", price: 59, originalPrice: 109, category: "media", icon: "🖥️", hot: true, features: ["4K高清录制", "游戏模式", "实时标注", "直播推流"] },
  { id: 10, name: "游戏修改器合集", desc: "热门单机游戏修改器合集，一键修改金币、生命、经验等属性。", price: 29, originalPrice: 59, category: "game", icon: "🕹️", hot: false, features: ["支持100+游戏", "一键修改", "自动更新", "安全可靠"] },
  { id: 11, name: "数据库管理工具", desc: "可视化数据库管理，支持MySQL/PostgreSQL/SQLite，查询优化器。", price: 109, originalPrice: 199, category: "dev", icon: "🗄️", hot: false, features: ["多数据库支持", "可视化设计", "查询优化", "数据导入导出"] },
  { id: 12, name: "网盘搜索引擎", desc: "全网网盘资源搜索，快速查找各类文件、教程、软件资源。", price: 19, originalPrice: 39, category: "tool", icon: "🔍", hot: false, features: ["全网搜索", "实时更新", "分类筛选", "高速下载"] },
];

const catNames = { tool: "工具", game: "游戏", dev: "开发", media: "媒体" };

// ========== 购物车 ==========
let cart = [];

function addToCart(id) {
  if (cart.find(c => c.id === id)) return;
  const p = products.find(x => x.id === id);
  cart.push({ ...p });
  updateCartUI();
  closeProductModal();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const countEl = document.getElementById("cartCount");
  const itemsEl = document.getElementById("cartItems");
  const emptyEl = document.getElementById("cartEmpty");
  const footerEl = document.getElementById("cartFooter");
  const totalEl = document.getElementById("cartTotal");

  countEl.textContent = cart.length;

  if (cart.length === 0) {
    emptyEl.style.display = "block";
    footerEl.style.display = "none";
    itemsEl.querySelectorAll(".cart-item").forEach(e => e.remove());
    return;
  }

  emptyEl.style.display = "none";
  footerEl.style.display = "block";

  let html = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    html += '<div class="cart-item">' +
      '<div class="cart-item-icon">' + item.icon + '</div>' +
      '<div class="cart-item-info"><div class="cart-item-name">' + item.name + '</div>' +
      '<div class="cart-item-price">¥' + item.price + '</div></div>' +
      '<button class="cart-item-remove" onclick="removeFromCart(' + item.id + ')">×</button></div>';
  });

  itemsEl.querySelectorAll(".cart-item").forEach(e => e.remove());
  itemsEl.insertAdjacentHTML("beforeend", html);
  totalEl.textContent = "¥" + total;
}

// ========== 购物车侧边栏 ==========
function toggleCart() {
  document.getElementById("cartSidebar").classList.toggle("show");
  document.getElementById("cartOverlay").classList.toggle("show");
}

// ========== 页面切换 ==========
function showPage(page) {
  document.getElementById("homePage").style.display = page === "home" ? "block" : "none";
  document.getElementById("productsPage").style.display = page === "products" ? "block" : "none";
  document.getElementById("aboutPage").style.display = page === "about" ? "block" : "none";
  document.getElementById("heroSection").style.display = page === "home" ? "block" : "none";

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.page === page);
  });

  if (page === "products") renderAllProducts("all");
  window.scrollTo(0, 0);
}

// ========== 商品渲染 ==========
function createProductCard(p) {
  return '<div class="product-card" onclick="openProductModal(' + p.id + ')">' +
    '<div class="product-img">' + p.icon + '</div>' +
    '<div class="product-body">' +
    '<span class="product-cat">' + catNames[p.category] + '</span>' +
    '<div class="product-name">' + p.name + '</div>' +
    '<div class="product-desc">' + p.desc + '</div>' +
    '<div class="product-footer">' +
    '<span class="product-price">¥' + p.price + '</span>' +
    '<span class="product-original">¥' + p.originalPrice + '</span>' +
    '</div></div></div>';
}

function renderHotProducts() {
  const hot = products.filter(p => p.hot);
  document.getElementById("hotProducts").innerHTML = hot.map(createProductCard).join("");
}

function renderAllProducts(cat) {
  const filtered = cat === "all" ? products : products.filter(p => p.category === cat);
  document.getElementById("allProducts").innerHTML = filtered.map(createProductCard).join("");
}

function filterProducts(cat) {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === cat);
  });
  renderAllProducts(cat);
}

// ========== 商品详情弹窗 ==========
function openProductModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  document.getElementById("modalImage").textContent = p.icon;
  document.getElementById("modalCat").textContent = catNames[p.category];
  document.getElementById("modalTitle").textContent = p.name;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalPrice").textContent = "¥" + p.price;
  document.getElementById("modalOriginal").textContent = "¥" + p.originalPrice;

  let featHtml = "";
  p.features.forEach(f => { featHtml += "<li>" + f + "</li>"; });
  document.getElementById("modalFeatures").innerHTML = "<ul>" + featHtml + "</ul>";

  const btn = document.getElementById("modalCartBtn");
  if (cart.find(c => c.id === id)) {
    btn.textContent = "已在购物车中";
    btn.disabled = true;
  } else {
    btn.textContent = "加入购物车";
    btn.disabled = false;
    btn.onclick = function() { addToCart(id); };
  }

  document.getElementById("productModal").classList.add("show");
}

function closeProductModal() {
  document.getElementById("productModal").classList.remove("show");
}

function closeModal(e) {
  if (e.target === document.getElementById("productModal")) closeProductModal();
}

// ========== 结算 ==========
function showCheckout() {
  if (cart.length === 0) return;
  toggleCart();

  let html = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    html += '<div class="checkout-item">' +
      '<span class="checkout-item-icon">' + item.icon + '</span>' +
      '<div class="checkout-item-info"><div class="checkout-item-name">' + item.name + '</div>' +
      '<div class="checkout-item-price">¥' + item.price + '</div></div></div>';
  });

  document.getElementById("checkoutItems").innerHTML = html;
  document.getElementById("checkoutSubtotal").textContent = "¥" + total;
  document.getElementById("checkoutFinal").textContent = "¥" + total;
  document.getElementById("checkoutOverlay").classList.add("show");
}

function hideCheckout() {
  document.getElementById("checkoutOverlay").classList.remove("show");
}

function submitOrder() {
  const contact = document.getElementById("contactInput").value.trim();
  if (!contact) {
    alert("请填写联系方式！");
    return;
  }

  hideCheckout();
  document.getElementById("successOverlay").classList.add("show");

  cart = [];
  updateCartUI();
  document.getElementById("contactInput").value = "";
  document.getElementById("remarkInput").value = "";
}

function closeSuccess() {
  document.getElementById("successOverlay").classList.remove("show");
  showPage("home");
}

// ========== 初始化 ==========
renderHotProducts();

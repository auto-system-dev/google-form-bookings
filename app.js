/* ===========================================================
   app.js － 前端流程控制（Google Material｜Card Flow Template）
   =========================================================== */

/* -------------------------
   日期加法（計算退房日期）
   ------------------------- */
function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

/* -------------------------
   檢查預約流程資料是否齊全
   用於 select-room / booking-form / result 頁面
   ------------------------- */
function validateBookingFlow(required = []) {
  for (let key of required) {
    const val = localStorage.getItem(key);
    if (!val) {
      alert("預約流程資料不足，請重新填寫");
      window.location.href = "index.html";
      return false;
    }
  }
  return true;
}

/* -------------------------
   存入預約資料
   ------------------------- */
function saveBookingData(data = {}) {
  Object.keys(data).forEach(key => {
    localStorage.setItem(key, data[key]);
  });
}

/* -------------------------
   取得預約資料（全部）
   ------------------------- */
function getBookingData() {
  return {
    checkin: localStorage.getItem("checkin"),
    nights: Number(localStorage.getItem("nights")),
    adult: localStorage.getItem("adult"),
    child: localStorage.getItem("child"),
    pet: localStorage.getItem("pet"),
    selected_room: localStorage.getItem("selected_room"),
    order_id: localStorage.getItem("order_id")
  };
}

/* -------------------------
   清除預約資料（付款完畢或重填）
   ------------------------- */
function clearBookingData() {
  const keepKeys = []; // 若之後要保留 UID 可加進來
  Object.keys(localStorage).forEach(k => {
    if (!keepKeys.includes(k)) localStorage.removeItem(k);
  });
}

/* -------------------------
   計算金額（可彈性擴充）
   amount = nightly_price × nights
   未來可加入：
   - 平假日差價
   - 旺季加價
   - 加床費
   - 寵物費用
   - 優惠券折抵
   ------------------------- */
function calculateAmount(pricePerNight, nights, options = {}) {
  let total = pricePerNight * nights;

  if (options.petFee) {
    total += Number(options.petFee) * Number(options.pet || 0);
  }
  if (options.extraFee) {
    total += Number(options.extraFee);
  }

  return total;
}

/* -------------------------
   格式化金額
   ------------------------- */
function formatCurrency(num) {
  return "NT$ " + Number(num).toLocaleString("zh-TW");
}

/* -------------------------
   取得 URL Query（備用）
   ------------------------- */
function getQuery(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

/* -------------------------
   工具：等待（for async 流程）
   ------------------------- */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* -------------------------
   工具：顯示 Loading（可自行客製）
   ------------------------- */
function showLoading(msg = "載入中...") {
  const div = document.createElement("div");
  div.id = "loadingBox";
  div.style = `
    position: fixed;
    top:0; left:0; width:100%; height:100%;
    background: rgba(255,255,255,.8);
    backdrop-filter: blur(2px);
    display: flex; justify-content:center; align-items:center;
    font-size: 18px; color:#1A73E8; z-index:9999;
  `;
  div.innerHTML = msg;
  document.body.appendChild(div);
}

function hideLoading() {
  const box = document.getElementById("loadingBox");
  if (box) box.remove();
}

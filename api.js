/* ===========================================================
   前端 API：GET 使用 JSONP（跨網域保證成功）
             POST 使用 fetch (JSON)
   =========================================================== */

const API_BASE =
  "https://script.google.com/macros/s/AKfycbydnqI9s9AQdqMgLZ5IqQDLQJUr1lMCMubZIUORD-Qrw0CJCL9VJfiMEoxMja_yB43A/exec";


/* ===========================================================
   ⭐ JSONP GET（rooms / availability / bookings）
   =========================================================== */
async function apiGet(params = "") {
  return new Promise((resolve, reject) => {
    const callback = "cb_" + Date.now();

    // 建立 callback
    window[callback] = function (data) {
      resolve(data);
      delete window[callback];
      script.remove();
    };

    const script = document.createElement("script");
    script.src = `${API_BASE}?${params}&callback=${callback}`;
    script.onerror = reject;

    document.body.appendChild(script);
  });
}


/* ===========================================================
   ⭐ JSON POST（createBooking / update / delete）
   =========================================================== */
async function apiPost(action, body = {}) {
  const res = await fetch(`${API_BASE}?action=${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res.json();
}


/* ===========================================================
   🚀 封裝成可直接呼叫的 API
   =========================================================== */

// 取得房型
function getRoomsAPI() {
  return apiGet("action=rooms");
}

// 查詢房況
function getAvailabilityAPI(date, nights = 1) {
  return apiGet(`action=availability&date=${date}&nights=${nights}`);
}

// 取得訂單列表
function getBookingsAPI() {
  return apiGet("action=bookings");
}

// 建立訂單
function createBookingAPI(data) {
  return apiPost("createBooking", data);
}

// 更新訂單
function updateBookingAPI(data) {
  return apiPost("updateBooking", data);
}

// 刪除訂單
function deleteBookingAPI(order_id) {
  return apiPost("deleteBooking", { order_id });
}

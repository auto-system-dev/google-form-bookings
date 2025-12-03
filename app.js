/* ===========================================================
   前端流程控制：JSONP + 事件綁定
   =========================================================== */

/* ------------------------------
   1️⃣ 載入房型
   ------------------------------ */
async function loadRooms() {
  const roomList = document.getElementById("roomList");
  roomList.innerHTML = `<div class="loading">載入中...</div>`;

  try {
    const res = await getRoomsAPI(); // <— 用 JSONP API
    console.log("房型資料：", res);

    if (!res.success) throw "資料錯誤";

    renderRoomCards(res.rooms);

  } catch (err) {
    console.error("房型載入失敗", err);
    roomList.innerHTML = `
      <div class="error-box">
        資料載入失敗，請稍後再試
      </div>`;
  }
}

/* ------------------------------
   2️⃣ 渲染房型卡片
   ------------------------------ */
function renderRoomCards(rooms) {
  const html = rooms.map(r => `
    <div class="room-card" onclick="selectRoom('${r.room_id}')">
      <img src="${r.image}" class="room-img">
      <div class="room-name">${r.name}</div>
      <div class="room-price">$${r.price}/晚</div>
    </div>
  `).join("");

  document.getElementById("roomList").innerHTML = html;
}

/* ------------------------------
   3️⃣ 選房型 → 進入下一頁
   ------------------------------ */
function selectRoom(room_id) {
  window.location.href = `booking-form.html?room_id=${room_id}`;
}

/* ------------------------------
   🚀 啟動
   ------------------------------ */
document.addEventListener("DOMContentLoaded", loadRooms);

const list = document.getElementById("notificationList");
const notifications = JSON.parse(localStorage.getItem("notifications")) || [];

if (notifications.length === 0) {
  list.innerHTML = "<p>No notifications</p>";
} else {
  notifications.reverse().forEach(n => {
    list.innerHTML += `
      <div class="complaint-card">
        <p>${n.message}</p>
        <small>${n.time}</small>
      </div>
    `;
  });
}

let notifications = document.getElementById("notifications");

function createToast(type, icon, title, text) {
  let newToast = document.createElement("div");
  newToast.classList.add("toast", type);
  newToast.innerHTML = `
    <i class="${icon}"></i>
    <div class="content">
      <div class="title">${title}</div>
      <span>${text}</span>
      <i class="fa-solid fa-xmark close-icon-toast"></i>
    </div>`;

  newToast.querySelector(".close-icon-toast").addEventListener("click", function () {
      notifications.removeChild(newToast);
    });
  notifications.appendChild(newToast);
  setTimeout(() => {
    if (notifications.contains(newToast)) {
      notifications.removeChild(newToast);
    }
  }, 5000);
}

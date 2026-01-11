const userBtn = document.getElementById("userBtn");
const adminBtn = document.getElementById("adminBtn");

const userForm = document.getElementById("userLoginForm");
const adminForm = document.getElementById("adminLoginForm");

if (userBtn && adminBtn) {
  userBtn.onclick = () => {
    userBtn.classList.add("active");
    adminBtn.classList.remove("active");
    userForm.style.display = "block";
    adminForm.style.display = "none";
  };

  adminBtn.onclick = () => {
    adminBtn.classList.add("active");
    userBtn.classList.remove("active");
    adminForm.style.display = "block";
    userForm.style.display = "none";
  };
}

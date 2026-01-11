document.getElementById("adminLoginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const adminId = document.getElementById("adminId").value;
  const password = document.getElementById("adminPassword").value;

  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  const admin = employees.find(
    e => e.employeeId === adminId && e.password === password
  );

  if (!admin) {
    alert("Invalid Employee ID or Password");
    return;
  }

  localStorage.setItem("adminLoggedIn", "true");
  localStorage.setItem("loggedAdmin", JSON.stringify(admin));

  window.location.href = "admin.html";
});

// ---------------- REGISTER ----------------
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const address = document.getElementById("address").value;
  const pincode = document.getElementById("pincode").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorMsg = document.getElementById("errorMsg");

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!passwordPattern.test(password)) {
    errorMsg.textContent =
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
    return;
  }

  if (password !== confirmPassword) {
    errorMsg.textContent = "Passwords do not match.";
    return;
  }

  const user = { name, mobile, address, pincode, password };
  localStorage.setItem("ghmcUser", JSON.stringify(user));

  alert("Registration successful!");
  window.location.href = "index.html";
});

// ---------------- LOGIN ----------------
function loginUser(e) {
  e.preventDefault();

  const mobile = document.getElementById("loginMobile").value;
  const password = document.getElementById("loginPassword").value;

  const storedUser = JSON.parse(localStorage.getItem("ghmcUser"));

  if (!storedUser) {
    alert("No user found. Please register first.");
    return;
  }

  if (mobile === storedUser.mobile && password === storedUser.password) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "complaints.html"; // ✅ REDIRECT
  } else {
    alert("Invalid mobile number or password");
  }
}

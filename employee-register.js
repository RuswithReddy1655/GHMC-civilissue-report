document.getElementById("employeeRegisterForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const employee = {
    name: empName.value,
    mobile: empMobile.value,
    department: empDepartment.value,
    employeeId: empId.value,
    designation: empDesignation.value,
    password: empPassword.value
  };

  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  // ❌ Prevent duplicate Employee ID
  const exists = employees.some(e => e.employeeId === employee.employeeId);
  if (exists) {
    alert("Employee ID already registered!");
    return;
  }

  employees.push(employee);
  localStorage.setItem("employees", JSON.stringify(employees));

  alert("Employee registered successfully!");
  window.location.href = "index.html"; // back to login
});

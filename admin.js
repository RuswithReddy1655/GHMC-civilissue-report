document.addEventListener("DOMContentLoaded", () => {

  const adminComplaints = document.getElementById("adminComplaints");

  // 🔢 STAT ELEMENTS
  const totalCount = document.getElementById("totalCount");
  const progressCount = document.getElementById("progressCount");
  const resolvedCount = document.getElementById("resolvedCount");

  let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

  // ===== UPDATE SUMMARY COUNTS =====
  totalCount.textContent = complaints.length;
  progressCount.textContent = complaints.filter(c => c.status === "In Progress").length;
  resolvedCount.textContent = complaints.filter(c => c.status === "Resolved").length;

  if (complaints.length === 0) {
    adminComplaints.innerHTML = "<p>No complaints found.</p>";
    return;
  }

  adminComplaints.innerHTML = "";

  complaints.forEach((c, index) => {
    adminComplaints.innerHTML += `
      <div class="complaint-card">
        <h3>${c.type}</h3>

        <p><strong>ID:</strong> ${c.id}</p>
        <p><strong>Zone:</strong> ${c.zone}</p>
        <p><strong>Circle:</strong> ${c.circle}</p>
        <p><strong>Ward:</strong> ${c.wardNumber} - ${c.wardName}</p>
        <p><strong>Department:</strong> ${c.department}</p>
        <p><strong>Team:</strong> ${c.team}</p>

        <p><strong>Issue Photo:</strong></p>
        ${c.photo ? `<img src="${c.photo}" class="complaint-photo">` : ""}

        <label>Status:</label>
        <select id="status-${index}">
          <option ${c.status === "Submitted" ? "selected" : ""}>Submitted</option>
          <option ${c.status === "In Progress" ? "selected" : ""}>In Progress</option>
          <option ${c.status === "Resolved" ? "selected" : ""}>Resolved</option>
        </select>

        <br><br>

        <input type="file" accept="image/*" id="resolvePhoto-${index}">

        <br><br>
        <button class="btn" onclick="updateStatus(${index})">Update Status</button>
      </div>
    `;
  });

  // ===== ANALYTICS COUNTS =====
  const submittedCount = complaints.filter(c => c.status === "Submitted").length;
  const inProgressCount = complaints.filter(c => c.status === "In Progress").length;
  const resolvedCountValue = complaints.filter(c => c.status === "Resolved").length;

  // ===== PIE CHART =====
  const pieCtx = document.getElementById("statusPieChart").getContext("2d");
  new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: ["Submitted", "In Progress", "Resolved"],
      datasets: [{
        data: [submittedCount, inProgressCount, resolvedCountValue],
        backgroundColor: ["#ffb300", "#42a5f5", "#66bb6a"]
      }]
    }
  });

  // ===== BAR CHART =====
  const barCtx = document.getElementById("statusBarChart").getContext("2d");
  new Chart(barCtx, {
    type: "bar",
    data: {
      labels: ["Submitted", "In Progress", "Resolved"],
      datasets: [{
        label: "Number of Complaints",
        data: [submittedCount, inProgressCount, resolvedCountValue],
        backgroundColor: ["#ffb300", "#42a5f5", "#66bb6a"]
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

});

// ===== STATUS UPDATE FUNCTION (GLOBAL) =====
function updateStatus(index) {
  let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  const status = document.getElementById(`status-${index}`).value;
  const fileInput = document.getElementById(`resolvePhoto-${index}`);

  complaints[index].status = status;
  complaints[index].updatedAt = new Date().toLocaleString();

  if (status === "Resolved" && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      complaints[index].resolutionPhoto = reader.result;
      localStorage.setItem("complaints", JSON.stringify(complaints));
      alert("Complaint resolved with proof!");
      location.reload();
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    localStorage.setItem("complaints", JSON.stringify(complaints));
    alert("Status updated successfully!");
    location.reload();
  }
}

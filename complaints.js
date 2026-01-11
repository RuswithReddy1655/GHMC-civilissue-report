document.addEventListener("DOMContentLoaded", () => {

  const complaintsList = document.getElementById("complaintsList");

  // 🔔 HANDLE NOTIFICATIONS (ONCE)
  const notifications = JSON.parse(localStorage.getItem("notifications")) || [];
  let unreadMessages = [];

  notifications.forEach(n => {
    if (!n.read) {
      unreadMessages.push(`🔔 ${n.message}`);
      n.read = true;
    }
  });

  if (unreadMessages.length > 0) {
    alert(unreadMessages.join("\n"));
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }

  // 📦 LOAD COMPLAINTS
  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];

  if (complaints.length === 0) {
    complaintsList.innerHTML = "<p>No complaints submitted yet.</p>";
    return;
  }

  complaintsList.innerHTML = "";

  complaints.forEach(c => {
    complaintsList.innerHTML += `
      <div class="complaint-card">
        <h3>${c.type}</h3>

        <p><strong>Complaint ID:</strong> ${c.id}</p>
        <p><strong>Zone:</strong> ${c.zone}</p>
        <p><strong>Circle:</strong> ${c.circle}</p>
        <p><strong>Ward:</strong> ${c.wardNumber} - ${c.wardName}</p>
        <p><strong>Assigned Team:</strong> ${c.team}</p>
        <p><strong>Department:</strong> ${c.department}</p>

        <!-- ✅ TIMELINE -->
        <div class="timeline">
          <div class="step ${c.status ? 'active' : ''}">Submitted</div>
          <div class="step ${c.status === 'In Progress' || c.status === 'Resolved' ? 'active' : ''}">
            In Progress
          </div>
          <div class="step ${c.status === 'Resolved' ? 'active' : ''}">
            Resolved
          </div>
        </div>

        <p class="status submitted"><strong>Status:</strong> ${c.status}</p>
        <p><strong>Reported At:</strong> ${c.createdAt}</p>

        <!-- 📸 ISSUE PHOTO -->
        ${c.photo ? `
          <p><strong>Issue Photo:</strong></p>
          <img src="${c.photo}" class="complaint-photo">
        ` : ""}

        <!-- ✅ STEP 3: RESOLUTION PHOTO -->
        ${c.resolutionPhoto ? `
          <p><strong>Resolution Photo:</strong></p>
          <img src="${c.resolutionPhoto}" class="complaint-photo">
        ` : ""}
      </div>
    `;
  });

});

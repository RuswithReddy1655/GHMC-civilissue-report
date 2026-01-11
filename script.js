document.addEventListener("DOMContentLoaded", () => {

  console.log("script.js loaded");

  // ================= PHOTO PREVIEW & DELETE =================
  const photoInput = document.getElementById("issuePhoto");
  const photoPreview = document.getElementById("photoPreview");
  const removePhotoBtn = document.getElementById("removePhotoBtn");

  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      photoPreview.src = reader.result;
      photoPreview.style.display = "block";
      removePhotoBtn.style.display = "inline-block";
    };
    reader.readAsDataURL(file);
  });

  removePhotoBtn.addEventListener("click", () => {
    photoInput.value = "";
    photoPreview.src = "";
    photoPreview.style.display = "none";
    removePhotoBtn.style.display = "none";
  });

  // ================= ASSIGNMENT RULES =================
  const assignmentRules = {
    Garbage: {
      team: "Sanitation Team",
      department: "Solid Waste Management"
    },
    Water: {
      team: "Water Supply Team",
      department: "Water Works Department"
    },
    Road: {
      team: "Road Maintenance Team",
      department: "Engineering Department"
    },
    Electricity: {
      team: "Electrical Team",
      department: "Electrical Department"
    },
    Others: {
      team: "General Maintenance Team",
      department: "GHMC"
    }
  };

  // ================= ZONES =================
  const zones = [
    "Malkajgiri","Uppal","LB Nagar","Shamshabad","Rajendranagar",
    "Charminar","Golconda","Khairatabad","Secunderabad",
    "Serilingampally","Kukatpally","Quthbullapur"
  ];

  const zoneCircles = {
    Malkajgiri: ["Keesara","Alwal","Bowenpally"],
    Uppal: ["Ghatkesar","Kapra"],
    "LB Nagar": ["Nagole","Saroornagar"],
    Shamshabad: ["Shamshabad"],
    Rajendranagar: ["Rajendranagar"],
    Charminar: ["Charminar"],
    Golconda: ["Golconda"],
    Khairatabad: ["Khairatabad"],
    Secunderabad: ["Musheerabad"],
    Serilingampally: ["Serilingampally"],
    Kukatpally: ["Madhapur"],
    Quthbullapur: ["Jeedimetla"]
  };

  const circleWards = {
    Ghatkesar: [
      { number: 21, name: "Ghatkesar" },
      { number: 22, name: "Annojiguda" }
    ],
    Keesara: [
      { number: 1, name: "Keesara" },
      { number: 2, name: "Dammaiguda" }
    ],
    Alwal: [
      { number: 190, name: "Alwal" }
    ]
  };

  // ================= ELEMENTS =================
  const zoneSelect = document.getElementById("zoneSelect");
  const circleSelect = document.getElementById("circleSelect");
  const wardSelect = document.getElementById("wardSelect");
  const form = document.getElementById("issueForm");

  // ================= POPULATE ZONES =================
  zones.forEach(zone => {
    zoneSelect.appendChild(new Option(zone, zone));
  });

  // ================= ZONE → CIRCLE =================
  zoneSelect.addEventListener("change", () => {
    circleSelect.innerHTML = '<option value="">Select Circle</option>';
    wardSelect.innerHTML = '<option value="">Select Ward</option>';
    circleSelect.disabled = true;
    wardSelect.disabled = true;

    const circles = zoneCircles[zoneSelect.value] || [];
    circles.forEach(circle => {
      circleSelect.appendChild(new Option(circle, circle));
    });

    if (circles.length > 0) {
      circleSelect.disabled = false;
    }
  });

  // ================= CIRCLE → WARD =================
  circleSelect.addEventListener("change", () => {
    wardSelect.innerHTML = '<option value="">Select Ward</option>';
    wardSelect.disabled = true;

    const wards = circleWards[circleSelect.value] || [];
    wards.forEach(ward => {
      wardSelect.appendChild(
        new Option(`Ward ${ward.number} - ${ward.name}`, `${ward.number}|${ward.name}`)
      );
    });

    if (wards.length > 0) {
      wardSelect.disabled = false;
    }
  });

 // ================= SUBMIT COMPLAINT =================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!wardSelect.value || !photoPreview.src) {
    alert("Please select ward and upload photo");
    return;
  }

  const [wardNumber, wardName] = wardSelect.value.split("|");
  const issueType = document.getElementById("issueType").value;

  const assignment = assignmentRules[issueType] || {
    team: "GHMC Field Team",
    department: "GHMC"
  };

  const issue = {
    id: "GHMC-" + Date.now(),
    type: issueType,
    zone: zoneSelect.value,
    circle: circleSelect.value,
    wardNumber,
    wardName,
    address: document.getElementById("address").value,

    // ✅ AUTO ASSIGNMENT
    department: assignment.department,
    team: assignment.team,

    status: "Submitted",
    createdAt: new Date().toLocaleString(),

    // ✅ PHOTO STORED FOR ADMIN & USER
    photo: photoPreview.src
  };

  const complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  complaints.push(issue);
  localStorage.setItem("complaints", JSON.stringify(complaints));

  alert("Complaint submitted successfully!");
  form.reset();
  photoPreview.style.display = "none";
  removePhotoBtn.style.display = "none";
  circleSelect.disabled = true;
  wardSelect.disabled = true;
});


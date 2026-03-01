/* =====================================
   REPORT ISSUE PAGE SCRIPT
===================================== */

console.log("✅ Report Issue JS Loaded");

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("issueForm");
    const zoneSelect = document.getElementById("zone");
    const circleSelect = document.getElementById("circle");
    const wardSelect = document.getElementById("ward");
    const photoInput = document.querySelector("input[name='photo']");

    /* ---------- FORM SUBMIT ---------- */
    if (form) form.addEventListener("submit", handleSubmit);

    /* ---------- IMAGE PREVIEW ---------- */
    if (photoInput) photoInput.addEventListener("change", previewImage);

    /* ---------- LOAD ZONES ---------- */
    loadZones();

    /* ---------- ZONE → CIRCLE ---------- */
    zoneSelect.addEventListener("change", loadCircles);

    /* ---------- CIRCLE → WARD ---------- */
    circleSelect.addEventListener("change", loadWards);
});


/* =====================================
   DROPDOWN FUNCTIONS
===================================== */

function resetSelect(select, text) {
    select.innerHTML = `<option value="">${text}</option>`;
    select.disabled = true;
}

function loadZones() {
    const zone = document.getElementById("zone");
    const circle = document.getElementById("circle");
    const ward = document.getElementById("ward");

    resetSelect(zone, "Select Zone");
    resetSelect(circle, "Select Circle");
    resetSelect(ward, "Select Ward");

    for (let z in ghmcData) {
        const option = document.createElement("option");
        option.value = z;
        option.textContent = z;
        zone.appendChild(option);
    }

    zone.disabled = false;
}

function loadCircles() {
    const zone = document.getElementById("zone").value;
    const circle = document.getElementById("circle");
    const ward = document.getElementById("ward");

    resetSelect(circle, "Select Circle");
    resetSelect(ward, "Select Ward");

    if (!zone) return;

    for (let c in ghmcData[zone]) {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        circle.appendChild(option);
    }

    circle.disabled = false;
}

function loadWards() {
    const zone = document.getElementById("zone").value;
    const circle = document.getElementById("circle").value;
    const ward = document.getElementById("ward");

    resetSelect(ward, "Select Ward");

    if (!zone || !circle) return;

    ghmcData[zone][circle].forEach(w => {
        const option = document.createElement("option");
        option.value = w;
        option.textContent = w;
        ward.appendChild(option);
    });

    ward.disabled = false;
}


/* =====================================
   HANDLE FORM SUBMIT
===================================== */

function handleSubmit(e) {
    e.preventDefault();

    const department = document.querySelector("[name='type']").value;
    const zone = document.getElementById("zone").value;
    const circle = document.getElementById("circle").value;
    const ward = document.getElementById("ward").value;
    const address = document.querySelector("[name='address']").value;

    if (!department || !zone || !circle || !ward || !address) {
        alert("Please fill all fields");
        return;
    }

    const complaint = {
        id: generateID(),
        department,
        zone,
        circle,
        ward,
        address,
        status: "Ongoing",
        date: new Date().toLocaleString()
    };

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    complaints.push(complaint);
    localStorage.setItem("complaints", JSON.stringify(complaints));

    alert("Complaint submitted successfully ✅");
    window.location.href = "citizen-dashboard.html";
}


/* =====================================
   IMAGE PREVIEW
===================================== */

function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    console.log("📷 Image selected:", file.name);
}


/* =====================================
   GENERATE COMPLAINT ID
===================================== */

function generateID() {
    return "CMP" + Math.floor(100000 + Math.random() * 900000);
}

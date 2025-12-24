// === CONFIG (max lengths) ===
const LIMITS = {
  name: 50,
  email: 50,
  message: 1000
};

// === ELEMENTS ===
const form = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");
const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  message: document.getElementById("message")
};

// === VALIDATION FUNCTION ===
function validateForm() {
  let valid = true;

  // Check every field
  for (const key in fields) {
    const el = fields[key];
    const max = LIMITS[key];
    const value = el.value.trim();

    // Empty check
    if (value.length === 0) valid = false;

    // Max length check
    if (value.length > max) valid = false;
  }

  // Toggle button state
  sendBtn.disabled = !valid;
}

// === SUBMIT HANDLER (double protection + disable button) ===
form.addEventListener("submit", (e) => {
  // Validate one final time
  validateForm();

  if (sendBtn.disabled) {
    e.preventDefault();
    alert("Your message is too long or incomplete!");
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";
});

// === LIVE VALIDATION WHILE TYPING ===
for (const key in fields) {
  fields[key].addEventListener("input", validateForm);
}

// === RESTORE DEFAULT STATE WHEN RETURNING FROM WEB3FORMS ===
window.addEventListener("pageshow", (event) => {
  // Detect back/forward navigation cache (bfcache)
  if (event.persisted) {
    form.reset();
    sendBtn.disabled = false;
    sendBtn.textContent = "Send";
  }
});

// Initial validation on load
validateForm();

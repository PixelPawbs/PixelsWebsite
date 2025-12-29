// hai... i used chatgpt for this... im dumb... i just dont want spam ok? love ya <3
window.addEventListener("load", () => {
const LIMITS = {
  name: 50,
  email: 50,
  message: 1000
};

const form = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");
const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  message: document.getElementById("message")
};

function validateForm() {
  let valid = true;

  for (const key in fields) {
    const el = fields[key];
    const max = LIMITS[key];
    const value = el.value.trim();
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value.length === 0) valid = false;
	
	if (!emailPattern.test(fields.email.value)) valid = false;

    if (value.length > max) valid = false;
  }

  sendBtn.disabled = !valid;
}

form.addEventListener("submit", (e) => {
  validateForm();

  if (sendBtn.disabled) {
    e.preventDefault();
    alert("Invalid message.");
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";
});

for (const key in fields) {
  fields[key].addEventListener("input", validateForm);
}

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    form.reset();
    sendBtn.disabled = false;
    sendBtn.textContent = "Send";
  }
});

validateForm();
});
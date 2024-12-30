//Animation Timeline
function qs(selector, all = false) {
  return all
    ? document.querySelectorAll(selector)
    : document.querySelector(selector);
}
const section = qs(".time-line-description", true);
const timeline = qs(".timeline");
const line = qs(".line");
line.style.bottoms = `calc(100% - 20px)`;
let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * 0.8;
function scrollHandler(e) {
  const { scrollY } = window;
  up = scrollY < prevScrollY;
  down = !up;
  const timelineRect = timeline.getBoundingClientRect();
  const lineRect = line.getBoundingClientRect();
  const dist = targetY - timelineRect.top;
  if (down && !full) {
    set = Math.max(set, dist);
    line.style.bottom = `calc(100% - ${set}px)`;
  }
  if (dist > timeline.offsetHeight + 50 && !full) {
    full = true;
    line.style.bottom = `-50px`;
  }
  section.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top + item.offsetHeight / 5 < targetY) {
      item.classList.add("show-me");
    }
  });
  prevScrollY = window.scrollY;
}
scrollHandler();
line.style.display = "block";
window.addEventListener("scroll", scrollHandler);
//Form
document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    subject: "",
    message: "",
  };
  const inputEmail = document.querySelector("#email");
  const inputSubject = document.querySelector("#subject");
  const inputMessage = document.querySelector("#message");
  const btnSubmit = document.querySelector('#form button[type="submit"]');
  const btnReset = document.querySelector('#form button[type="reset"]');
  const spinner = document.querySelector("#spinner");
  inputEmail.addEventListener("input", validate);
  inputSubject.addEventListener("input", validate);
  inputMessage.addEventListener("input", validate);
  form.addEventListener("submit", sendEmail);
  btnReset.addEventListener("click", function (e) {
    e.preventDefault();
    resetForm();
  });
  function sendEmail(e) {
    e.preventDefault();
    spinner.classList.remove("hideSpinner");
    setTimeout(() => {
      spinner.classList.add("hideSpinner");
      resetForm();
      const alertSuccess = document.createElement("P");
      alertSuccess.textContent = "Message Sent!";
      alertSuccess.classList.add("messageSent");
      form.appendChild(alertSuccess);
      setTimeout(() => {
        alertSuccess.remove();
      }, 3000);
    }, 3000);
  }
  function validate(e) {
    if (e.target.value.trim() === "") {
      showAlert(
        `This field ${e.target.id} is required`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      checkEmail();
      return;
    }
    if (e.target.id === "email" && !validateEmail(e.target.value)) {
      showAlert("This email is not valid", e.target.parentElement);
      email[e.target.name] = "";
      checkEmail();
      return;
    }
    cleanAlert(e.target.parentElement);
    email[e.target.name] = e.target.value.trim().toLowerCase();
    checkEmail();
  }
  function showAlert(message, reference) {
    cleanAlert(reference);
    const error = document.createElement("P");
    error.textContent = message;
    error.classList.add("error-form");
    reference.appendChild(error);
  }
  function cleanAlert(reference) {
    const alert = reference.querySelector(".error-form");
    if (alert) {
      alert.remove();
    }
  }
  function validateEmail(email) {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const result = regex.test(email);
    return result;
  }
  function checkEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.disabled = false;
  }
  function resetForm() {
    email.email = "";
    email.subject = "";
    email.message = "";
    form.reset();
    checkEmail();
  }
});
// Smooth Scrolling for Navigation Links
document.querySelectorAll('.main-nav-links').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

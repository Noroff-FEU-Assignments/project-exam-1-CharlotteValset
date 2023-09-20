const contactForm = document.querySelector("#contact-form");

const firstName = document.querySelector("#name");
const firstNameError = document.querySelector("#nameError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");

const addMessage = document.querySelector("#addMessage");
const addMessageError = document.querySelector("#addMessageError");

function checkLength(value, minLength) {
  return value.trim().length > minLength;
}

function validateInput(input, errorElement, minLength) {
  const valid = checkLength(input.value, minLength);
  errorElement.style.display = valid ? "none" : "block";
  return valid;
}

function validateForm(event) {
  event.preventDefault();

  const isFirstNameValid = validateInput(firstName, firstNameError, 5);
  const isEmailValid = validateEmail(email.value);
  const isSubjectValid = validateInput(subject, subjectError, 15);
  const isAddMessageValid = validateInput(addMessage, addMessageError, 25);

  if (isFirstNameValid && isEmailValid && isSubjectValid && isAddMessageValid) {
    contactForm.submit();
  }
  emailError.style.display = isEmailValid ? "none" : "block";
}

contactForm.addEventListener("submit", validateForm);
// validate email function from Noroff with modified regEx pattern.
function validateEmail(email) {
  const regEx = /\S+@\S+\.[a-zA-Z]{2,4}/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

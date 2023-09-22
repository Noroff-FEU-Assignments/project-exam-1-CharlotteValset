const contactForm = document.querySelector("#contact-form");

const firstName = document.querySelector("#name");
const firstNameError = document.querySelector("#nameError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");

const addMessage = document.querySelector("#addMessage");
const addMessageError = document.querySelector("#addMessageError");

// Function to check the length of a value
function checkLength(value, minLength) {
  // Remove leading and trailing white spaces with trim(), then check length
  return value.trim().length > minLength;
}

// Function to validate input fields
function validateInput(input, errorElement, minLength) {
  // Check if the input value's length is greater than the specified minLength
  const valid = checkLength(input.value, minLength);
  // Update the visibility of the error message based on validation result
  errorElement.style.display = valid ? "none" : "block";
  // Return whether the input is valid
  return valid;
}

// Function to validate the entire form when it's submitted
function validateForm(event) {
  // Prevent the form from submitting by default
  event.preventDefault();

  // Validate each input field and store whether they are valid
  const isFirstNameValid = validateInput(firstName, firstNameError, 5);
  const isEmailValid = validateEmail(email.value);
  const isSubjectValid = validateInput(subject, subjectError, 15);
  const isAddMessageValid = validateInput(addMessage, addMessageError, 25);

  // If all fields are valid, submit the form
  if (isFirstNameValid && isEmailValid && isSubjectValid && isAddMessageValid) {
    contactForm.submit();
  }

  // Display email error message if the email is not valid
  emailError.style.display = isEmailValid ? "none" : "block";
}

// Add a submit event listener to the form that triggers form validation
contactForm.addEventListener("submit", validateForm);
// validate email function from Noroff with modified regEx pattern.
// Function to validate email
function validateEmail(email) {
  const regEx = /\S+@\S+\.[a-zA-Z]{2,4}/;
  // Test if the provided email matches the pattern and return the result
  const patternMatches = regEx.test(email);
  return patternMatches;
}

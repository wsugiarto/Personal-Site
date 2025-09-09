const fullname = document.getElementById("fullname-field");
const email = document.getElementById('email-field');
const message = document.getElementById('message-field');
const formErrors = document.getElementById('form-errors-field');
const form = document.getElementById('contact-form');

let form_errors = [];
function addError(field, error){
    form_errors.push({
        field: field,
        error: error
    });
}
fullname.addEventListener("input", (e) => {
    if(fullname.validity.patternMismatch){
        fullname.setCustomValidity("Please enter your full name (Letters, spaces, hyphens or apostrophes only)")
        addError('fullname', 'naming error');
    }
    else{
        fullname.setCustomValidity("");
    }
});

email.addEventListener("input", (event) => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an email address!");
    addError('email', 'incorrect email error');
  } else {
    email.setCustomValidity("");
  }
});

message.addEventListener("input", () => {
    let len = message.value.length;
    if(len ==0) {
        message.setCustomValidity("Please Enter A Message!");
        addError('message', 'no message error');
    }
    else if (len < 10) {
        message.setCustomValidity("Message should be at least 10 characters long!");
        addError('message', 'message too short error');
    }
    else{
        message.setCustomValidity("");
        
    }
})
// form_errors
form.addEventListener('submit', e => {
    formErrors.value = JSON.stringify(form_errors);
  });

const nameError   = document.getElementById("name-error");

// Flashing input field
function flashField(el) {
  el.classList.add("flash");
  setTimeout(() => el.classList.remove("flash"), 300);
}

const nameCharPattern = /^[A-Za-z\s\-']$/;

fullname.addEventListener("keypress", e => {
  if (
    e.ctrlKey || e.metaKey ||
    e.key === "Backspace" ||
    e.key === "Delete" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight" ||
    e.key === "Tab"
  ) {
    return;
  }

  if (!nameCharPattern.test(e.key)) {
    e.preventDefault();
    flashField(fullname);

    nameError.textContent = `Illegal character: "${e.key}"`;
    nameError.style.display = "block";
    nameError.style.opacity = "1";

    setTimeout(() => {
      nameError.style.transition = "opacity 0.5s";
      nameError.style.opacity = "0";
      setTimeout(() => {
        nameError.style.display = "none";
        nameError.style.transition = "";
        nameError.textContent = "Error: Please enter your full name (Letters, spaces, hyphens or apostrophes only)";
      }, 500);
    }, 1500);
  }
});
// Message counter
charCount = document.getElementById('message-count');
document.getElementById('message-field').onkeyup = function () {
  let charsLeft = (500 - this.value.length); 
  if(charsLeft <= 10){
    charCount.classList.add('warning');
  }
  else{
    charCount.classList.remove('warning')
  }
  document.getElementById('message-count').innerHTML = "Characters left: " + charsLeft;
};



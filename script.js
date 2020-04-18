import {
    endpoint,
    apiKey
} from "./modules/settings";

const form = document.querySelector("form");
// to access form from everywhere: 
window.form = form;
const elements = form.elements;
// to access form elements from everywhere: 
window.elements = elements;

// CONTROLLING ELEMENTS
// disable "area" when "unknown" is clicked
elements.unknown.addEventListener("click", e => {
    elements.area.disabled = !elements.area.disabled;
});

// FORM RELATED EVENTS
// when a key is pressed, set value to what is being pressed
elements.area.addEventListener("keyup", e => {
    console.dir(e.target.value);
})

// submit
form.addEventListener("submit", e => {
    e.preventDefault();
    console.log("submitted")
})

/* // JS POWERED VALIDATION
const formIsValid = form.checkValidity();
if (formIsValid) {
    console.log("yay!")
} else {
    console.log("not ready for submit")
} */
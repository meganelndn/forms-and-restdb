import {
    endpoint,
    apiKey
} from "./modules/settings";

const form = document.querySelector("form");
//to access form from everywhere: 
window.form = form;
const elements = form.elements;
//to access elements from everywhere: 
window.elements = elements;


// HOW TO VALIDATE CORRECTLY
/* 
1. remove all error msgs
2. loop through
3. show custom error msgs 
    - create with JS
    - have them in the DOM hide/show
    - "post" data
*/


//disable "area" when "unknown" is clicked
elements.unknown.addEventListener("click", e => {
    elements.area.disabled = !elements.area.disabled;
});

//delete default HTML error messages
form.setAttribute("novalidate", true);

// submit
form.addEventListener("submit", e => {
    e.preventDefault();
    let validForm = true;
    // REMOVE VALIDATION WHEN SUBMITTING
    const formElements = form.querySelectorAll("input");
    formElements.forEach(el => {
        el.classList.remove("invalid");
    });

    // converted cbs into an array, bc otherwise "cbs.filter" is not a function
    const cbs = [...form.querySelectorAll(`[name=cities]`)];
    const checked = cbs.filter(el => el.checked)

    const errorContainerCities = form.querySelector("fieldset p");

    if (checked.length == 0) {
        validForm = false;
        errorContainerCities.classList.remove("hidden");
    } else {
        errorContainerCities.classList.add("hidden");
    }

    if (form.checkValidity() && validForm) {
        //send to restdb/api
        console.log("submit ready");
        // ADDING VALIDATION IN CASE OF ERROR
    } else {
        formElements.forEach(el => {
            if (!el.checkValidity()) {
                el.classList.add("invalid");
            }
        });
    }
});
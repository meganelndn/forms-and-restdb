import {
    endpoint,
    apiKey
} from "./modules/settings";

window.addEventListener("load", init);

function init() {
    setUpForm();
    getCountries();
}

function setUpForm() {

}

const form = document.querySelector("form");
//to access form from everywhere: 
window.form = form;
const elements = form.elements;
//to access elements from everywhere: 
window.elements = elements;

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
        postCountry({
            country: form.elements.country.value,
            area: form.elements.area.value, // TODO
            language: form.elements.language.value,
            //take array=[checked] && create new one
            cities: checked.map(el => el.value),
        });
        //reset form when submitted
        form.reset();
        // ADDING VALIDATION IN CASE OF ERROR
    } else {
        formElements.forEach(el => {
            if (!el.checkValidity()) {
                el.classList.add("invalid");
            }
        });
    }
});

// "POST" data
function postCountry(payload) {
    const postData = JSON.stringify(payload);
    fetch(endpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": apiKey,
                "cache-control": "no-cache",
            },
            body: postData,
        })
        .then(res => res.json())
        //whenever form filled out, browser updates with new country autom.
        .then(data => {
            console.log(data);
            showCountry(data);
        });
}

// "GET" data
function getCountries() {
    fetch(endpoint, {
            method: "get",
            headers: {
                "accept": "application/json",
                "x-apikey": apiKey,
                "cache-control": "no-cache",
            }
        })
        .then(res => res.json())
        .then(data => data.forEach(showCountry));
}

const template = document.querySelector("template").content;
const countryContainer = document.querySelector("#countryList");

function showCountry(country) {
    const clone = template.cloneNode(true);

    clone.querySelector("h1").textContent = country.country;
    clone.querySelector("h2").textContent = country.area;
    clone.querySelector("h3").textContent = country.language;

    const ul = clone.querySelector("ul");
    country.cities.forEach(ctr => {
        const li = document.createElement("li");
        li.textContent = ctr;
        ul.appendChild(li);
    })

    countryContainer.appendChild(clone);
}


// !NOTES

// HOW TO VALIDATE CORRECTLY
/* 
1. remove all error msgs
2. loop through
3. show custom error msgs 
    - create with JS
    - have them in the DOM hide/show
    - "post" data
*/
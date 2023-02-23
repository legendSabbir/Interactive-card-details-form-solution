const cvcText = document.querySelector(".card-cvc-text");
const numberText = document.querySelector(".card-number-text");
const nameText = document.querySelector(".card-name-text");
const monthText = document.querySelector(".expiry-month-text");
const yearText = document.querySelector(".expiry-year-text");
const submitBtn = document.querySelector(".submit-btn");
const inputs = document.querySelectorAll("input");
const form = document.querySelector("form")
const thankYou = document.querySelector(".thank-you")



inputs.forEach((input, index) => {
  const type = input.id;
  const isCardNumber = type === "card-number-input";
  const isMonthOrYear = type === "expiry-month-input" || type === "expiry-year-input";
  const isCvcOrName = type === "card-cvc-input" || type === "card-name-input";

  input.addEventListener("blur", () => {
    const hasValue = input.value.trim().length > 0;
    input.className = hasValue ? "" : "error-info";
  });

  if (isMonthOrYear) {
    input.addEventListener("input", () => {
      if (input.value.length >= 2) {
        input.value = input.value.slice(0, 2);
        inputs[index + 1].focus();
      }
      if (type === "expiry-month-input") monthText.textContent = input.value.padStart(2, "0");
      if (type === "expiry-year-input") yearText.textContent = input.value.padStart(2, "0");
    });
  } else if (isCvcOrName) {
    input.addEventListener("input", () => {
      if (type === "card-cvc-input") cvcText.textContent = input.value;
      if (type === "card-name-input") nameText.textContent = input.value;
    });
  } else {
    input.addEventListener("input", () => {
      const value = input.value.trim().match(/[0-9A-Za-z]{1,4}/g) || [];
      numberText.textContent = value.join(" ");
      if (input.value.length === 16) inputs[index + 1].focus();
    });
    input.addEventListener("blur", () => {
      if (input.value.length === 0) input.className = "error-info";
      else if (input.value.length < 16) input.className = "error-info-length";
      else if (/[^0-9]/g.test(input.value)) input.className = "error-info-format";
      else input.className = "";
    });
  }
});



function checkForErrors() {
  let hasErrors = false;
  inputs.forEach((input) => {
    const type = input.id;
    const hasValue = input.value.trim().length > 0;
    const isCardNumber = type === "card-number-input";
    
    if (!isCardNumber) {
      if (!hasValue) input.className = "error-info";
      else input.className = "";
    } else {
      if (!hasValue) input.className = "error-info";
      else if (input.value.length < 16) input.className = "error-info-length";
      else if (/[^0-9]/g.test(input.value)) input.className = "error-info-format";
      else input.className = "";
    }
    
    if (input.className !== "") hasErrors = true;
  });

  return hasErrors;
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  if (!checkForErrors()) {
    form.style.display = "none"
    thankYou.style.display = "block"
  }
});
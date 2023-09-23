// categorey
const btn = document.getElementById("calculator-btn");
const input = document.getElementById("priceInput");
const priveValute = document.getElementById("priveValute");
const rublesChar = document.getElementById("rublesChar");
const rublesValue = document.getElementById("rublesValue");

let isReset = false;

btn.addEventListener("click", () => {
  const selectedCategory = document.querySelector("li.calculator__card-item.active");
  const calculatorBtns = document.getElementById("calculator-btns");
  calculatorBtns.classList.remove(".calculator-btns")

  if (isReset) {
    btn.textContent = "Рассчитать";
    calculatorBtns.classList.remove("calculator-btns")
    input.value = "0";
    
    input.style.width = "50%";
    priveValute.textContent = "Cтоимость в юанях";
    rublesValue.style.display = "none";    
    rublesChar.style.display = "none";

    isReset = false;

    return;
  }
  
  if (selectedCategory) {
    const calculatorBtns = document.getElementById("calculator-btns");
    const priceText = selectedCategory.querySelector(".calculator__card-span").getAttribute("data-price");
    if (priceText === "связь с менеджером") {
      input.value = "Свяжитесь с менеджером";
      input.style.width = "100%";
      calculatorBtns.classList.remove("calculator-btns")
      priveValute.textContent = "";
      rublesValue.style.display = "none";
      rublesChar.style.display = "none";
    } else {
      const price = parseFloat(priceText);
      const totalPrice = price + (price * 0.02);
      calculatorBtns.classList.add("calculator-btns");
      priveValute.textContent = "Cтоимость в юанях";
      btn.textContent = "Сбросить";
      input.style.width = "50%";
      rublesChar.style.display = "block";
      input.value = totalPrice.toFixed(2);
      
      const exchangeRate = 75;
      const priceInRubles = totalPrice * exchangeRate;
      rublesValue.style.display = "block";
      rublesValue.textContent = priceInRubles.toFixed(2);
    }
    
    isReset = true;
  }
});

const categoryItems = document.querySelectorAll("li.calculator__card-item");

categoryItems.forEach(item => {
  item.addEventListener("click", () => {
    categoryItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});
// categorey
const btn = document.getElementById("calculator-btn");
const input = document.getElementById("priceInput");
const priveValute = document.getElementById("priveValute");
const rublesChar = document.getElementById("rublesChar");
const rublesValue = document.getElementById("rublesValue");

let isReset = false;

input.addEventListener("focus", () => {
  input.value = ""
})

btn.addEventListener("click", () => {
  
  const selectedCategory = document.querySelector("li.calculator__card-item.active");
  const calculatorBtns = document.getElementById("calculator-btns");
  calculatorBtns.classList.remove(".calculator-btns")

  if (selectedCategory === null) {
    priceInput.value = "Выберите категорию"

    input.style.width = "100%";
    priveValute.textContent = "";
    rublesValue.style.display = "none";
    rublesChar.style.display = "none";

    setTimeout(() => {
      input.style.width = "50%";
      priceInput.value = "0"
      priveValute.textContent = "Cтоимость в юанях";
    }, 1000)    
  }

  if (isReset) {   

    btn.textContent = "Рассчитать";    
    input.value = "0";
    
    // css
    calculatorBtns.classList.remove("calculator-btns")
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

      // css
      input.style.width = "100%";
      calculatorBtns.classList.remove("calculator-btns")
      priveValute.textContent = "";
      rublesValue.style.display = "none";
      rublesChar.style.display = "none";
    }

    if (priceInput.value == 0) {
      priceInput.value = "Вы не заполнили данные"

      input.style.width = "100%";
      priveValute.textContent = "";
      rublesValue.style.display = "none";
      rublesChar.style.display = "none";
  
      setTimeout(() => {
        input.style.width = "50%";
        priceInput.value = "0"
        priveValute.textContent = "Cтоимость в юанях";
      }, 1000)
    } else {
      const exchangeRate = 13;
      const price = input.value * exchangeRate;
      const totalPrice = price;
      const priceWithTwoPercentIncrease = parseFloat(priceText) + totalPrice * 1.02;      
      
      rublesValue.textContent = priceWithTwoPercentIncrease.toFixed() | 0;

      // css
      calculatorBtns.classList.add("calculator-btns");
      priveValute.textContent = "Cтоимость в юанях";
      btn.textContent = "Сбросить";
      input.style.width = "50%";
      rublesValue.style.display = "block";
      rublesChar.style.display = "block";
    }

    isReset = true;
  }
});
const cardItems = document.querySelectorAll(".calculator__card-item");

cardItems.forEach(item => {
  item.addEventListener("click", () => {
    // Уберите класс .active у всех элементов .calculator__card-checkbox
    cardItems.forEach(i => i.querySelector('.calculator__card-checkbox').classList.remove("active"));
    
    // Добавьте класс .active только к текущему элементу .calculator__card-checkbox
    item.querySelector('.calculator__card-checkbox').classList.add("active");
  });
});
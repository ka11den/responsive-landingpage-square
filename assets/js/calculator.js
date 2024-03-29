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

    input.classList.add(".calculator__card-input-active");
    priveValute.textContent = "";
    rublesValue.style.display = "none";
    rublesChar.style.display = "none";

    setTimeout(() => {
      input.classList.add(".calculator__card-input-active");
      priceInput.value = "0"
      priveValute.textContent = "Cтоимость в юанях";
    }, 1000)    
  }

  if (isReset) {   

    btn.textContent = "Рассчитать";    
    input.value = "0";
    
    // css
    calculatorBtns.classList.remove("calculator-btns")
    input.classList.add(".calculator__card-input-active");
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
        input.classList.add(".calculator__card-input-active");
        priceInput.value = "0"
        priveValute.textContent = "Cтоимость в юанях";
      }, 1000)
    } else {
      // курс юаня
      const exchangeCourse = 14.7;

      // комиссия
      const commission = 1000;

      // значение которое мы вводим умножаем на курс
      const price = input.value * exchangeCourse;
      const totalPrice = price + commission;
      const priceWithTwoPercentIncrease = (totalPrice * 1.02) + parseFloat(priceText);
      
      rublesValue.textContent = priceWithTwoPercentIncrease.toFixed() | 0;

      // css
      calculatorBtns.classList.add("calculator-btns");
      priveValute.textContent = "Cтоимость в юанях";
      btn.textContent = "Сбросить";
      input.classList.add(".calculator__card-input-active");
      rublesValue.style.display = "block";
      rublesChar.style.display = "block";
    }

    isReset = true;
  }
});

const categoryItems = document.querySelectorAll("li.calculator__card-item");
const cardItems = document.querySelectorAll(".calculator__card-item");

cardItems.forEach(item => {
  item.addEventListener("click", () => {
    cardItems.forEach(i => i.querySelector('.calculator__card-checkbox').classList.remove("active"));    
    item.querySelector('.calculator__card-checkbox').classList.add("active");
  });
});

categoryItems.forEach(item => {
  item.addEventListener("click", () => {
    categoryItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});
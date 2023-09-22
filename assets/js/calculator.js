// categorey
const btn = document.getElementById("calculator-btn");

btn.addEventListener("click", () => {
  const selectedCategory = document.querySelector("li.calculator__card-item.active");
  if (selectedCategory) {
    const input = document.getElementById("priceInput");
    const priveValute = document.getElementById("priveValute");
    const priceText = selectedCategory.querySelector(".calculator__card-span").getAttribute("data-price");
    
    if (priceText === "связь с менеджером") {
      input.value = "Свяжитесь с менеджером";
      input.style.width = "100%"
      priveValute.textContent = ""
    } else {
      const price = parseFloat(priceText);
      const totalPrice = price + (price * 0.02);
      priveValute.textContent = "Cтоимость в рублях"
      input.style.width = "50%"
      input.value = totalPrice.toFixed(2);
    }
  }
});

const categoryItems = document.querySelectorAll("li.calculator__card-item");

categoryItems.forEach(item => {
  item.addEventListener("click", () => {
    categoryItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});
// loader
const loader = document.querySelector(".loader");

window.onload = () => {
  loader.style.opacity = "0";
  loader.style.display = "none";
}

// header
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close')

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('snow-menu');
  })
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('snow-menu');
  })
}

// scroll
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.scrollY

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 40;
    sectionId = current.getAttribute('id')

    if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.add('nav__link-active')
    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.remove('nav__link-active')
    }
  })
}
window.addEventListener('scroll', scrollActive)

// works
const data = [
  {
    id: "1",
    number: "01",
    img: "./assets/img/home.webp",
    desc: "Вы обращаетесь к нам, присылаете позицию, которая вам интересна, а Мы помогаем подобрать Вам размер и заканчиваем оформления заказа сразу после оплаты."
  },
  {
    id: "2",
    number: "02",
    img: "./assets/img/work1.webp",
    desc: "После того как оформление заказа завершено и оплата получена, Мы выкупаем вашу позицию с ранее обговоренными требованиями с сайта Poizon"
  },
  {
    id: "3",
    number: "03",
    img: "./assets/img/work2.webp",
    desc: "Poizon отправляет товар на наш склад в Китае в скором времени"
  },
  {
    id: "4",
    number: "04",
    img: "./assets/img/home.webp",
    desc: "Мы проверяем каждую позицию на оригинал, наличие дефектом и других недочетов. В случае возникновения каких-либо форс-мажоров мы меняем позицию на новую"
  },
  {
    id: "5",
    number: "05",
    img: "./assets/img/work1.webp",
    desc: "После полной проверки каждой из позиций Мы отправляем на наш склад в Россию большой партией. При получении партии в России мы вновь проверяем товар и готовим к выдаче или отправке клиентам"
  },
  {
    id: "6",
    number: "06",
    img: "./assets/img/work2.webp",
    desc: "Заключительная часть, Мы сортируем заказы и выдаем или отправляем клиентам их товар"
  },
  {
    id: "7",
    number: "07",
    img: "./assets/img/home.webp",
    desc: "Не так уж и трудно. Ваш заказ у вас в идеально состоянии и все довольны!"
  }
]

const worksContainer = document.getElementById("work-container");
let currentIndex = 0;
let touchStartX;
let touchEndX;

function displaySlide(index) {
  worksContainer.innerHTML = "";

  const slide = data[index];
  const slideElement = document.createElement("article");
  slideElement.classList.add("works__card");
  slideElement.innerHTML = `
    <h1 class="works__card-numbers">${slide.number}</h1>
    <img class="works__card-img" src="${slide.img}" />
    <p class="works__card-desc">${slide.desc}</p>
  `;

  worksContainer.appendChild(slideElement);
}

displaySlide(currentIndex);

worksContainer.addEventListener("mousedown", (e) => {
  touchStartX = e.clientX;  
});

worksContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

worksContainer.addEventListener("mouseup", (e) => {
  touchEndX = e.clientX;
  handleSwipe();
});

worksContainer.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const deltaX = touchEndX - touchStartX;

  if (deltaX > 50) {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = data.length - 1;
    }
  } else if (deltaX < -50) {
    currentIndex++;
    if (currentIndex >= data.length) {
      currentIndex = 0;
    }
  }

  displaySlide(currentIndex);
}

const categoriesContainer = document.getElementById("works__numbers-category");

function setCategories () {
  const allCats = data.map((item) => item.id);
  const categories = [
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];

  categoriesContainer.innerHTML = categories
    .map(
      (cat) =>
        `
        <button class="works__number-btn">
          ${cat}
        </button>
        `
    )
    .join("");

  categoriesContainer.addEventListener("click", (e) => {
    let selectedCat = e.target.innerHTML.split("")[11];

    if (selectedCat === "u") selectedCat = "1"

    displaySlide(selectedCat);
  });
};

const worksSlider = document.querySelector(".works__slider");
let isDragging = false;
let startX;
let translateX = 0;
let currentTranslateX = 0;

worksSlider.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  worksSlider.style.cursor = "grabbing";
});

worksSlider.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  worksSlider.style.cursor = "grabbing";
});

worksSlider.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const offsetX = e.clientX - startX;
  translateX = currentTranslateX + offsetX;

  worksContainer.style.transform = `translateX(${translateX}px)`;
});

worksSlider.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const offsetX = e.touches[0].clientX - startX;
  translateX = currentTranslateX + offsetX;

  worksContainer.style.transform = `translateX(${translateX}px)`;
});

worksSlider.addEventListener("mouseup", () => {
  if (!isDragging) return;

  currentTranslateX = translateX;
  isDragging = false;
  worksSlider.style.cursor = "grab";

  // Сброс смещения при свайпе
  translateX = 0;
  currentTranslateX = 0;
  worksContainer.style.transform = "translateX(0)";
});

worksSlider.addEventListener("touchend", () => {
  if (!isDragging) return;

  currentTranslateX = translateX;
  isDragging = false;
  worksSlider.style.cursor = "grab";

  // Сброс смещения при свайпе
  translateX = 0;
  currentTranslateX = 0;
  worksContainer.style.transform = "translateX(0)";
});

setCategories();

// faq
const faq = [
  {
    id: 1,
    title: "Что такое POIZON и как сделать заказ?",
    desc: "POIZON - это китайский маркетплейс оригинальной продукции, где кроссовки и одежда продаются на 30–50% дешевле, чем в России. К сожалению, площадка работает только на территории Китая и заказать вещи или обувь для обычного обывателя становится невозможным, но для этого существуем мы! Обратитесь по любым указанным контактам на сайте и мы вам в этом поможем."
  },
  {
    id: 2,
    title: "Где я могу посмотреть каталог товаров?",
    desc: "Смотреть и выбирать вы можете в приложении Poizon. Скачать его на iPhone вы можете тут https://apps.apple.com/ru/app/得物-有毒的运动-潮流-好物/id1012871328 на Android - тут https://m.anxinapk.com/rj/12201303.html. Скачав и авторизовавшись в приложении вам откроется каталог в миллионы позиций, вы выбираете, а мы поможем доставить. При возникновении трудностей с установкой приложения или чего - либо вы так же можете обратиться к нам и мы вам подскажем"
  },
  {
    id: 3,
    title: "Сколько стоит ваша услуга и доставка в мой город?",
    desc: "Стоимость нашей услуги фиксированная - 1000р за позицию и всё. Стоимость доставки рассчитывается индивидуально в зависимости от выбранной категории товара, веса и так далее. Вы можете воспользоваться нашим калькулятором на сайте или в любом из указанных мессенджерах и рассчитать стоимость вашего заказа самостоятельно вместе с доставкой до Москвы, указав просто в сумму вашего товара в юанях.  Доставка Москва - Ваш город оплачивается отдельно в отделении CDEK, в среднем её стоимость составляет 150-300 рублей. "
  },
  {
    id: 4,
    title: "Что если мой заказ потеряют или с ним что-то случится?",
    desc: "Каждый заказ застрахован на полную стоимость, страховка уже включена в стоимость, которую вы видите при расчёте. В случае форс-мажора всегда будет предоставлен выбор. Возврат или повторный заказ позиции."
  },
  {
    id: 5,
    title: "Что делать если не подошёл размер?",
    desc: "К сожалению, если заказ уже у вас на руках или прибыл в Россию - невозможен. Так как площадка даёт всего 7 дней на возврат, но мы не оставим вас в беде и предложим продать вашу позицию в нашем сообществе по вашей цене"
  },
]

const faqContainer = document.getElementById("faq-container");

function displayFaq(faqs) {
  faqContainer.innerHTML = faqs.map((item) => (
      `
      <article class="faq__card" data-id="${item.id}">
        <div class="faq__card-header">
          <h1 class="faq__card-title">
          ${item.title}
          </h1>
          <img src="./assets/img/open.svg" class="faq__toggle-button" /> 
        </div>
        <div class="faq__card-dropdown">
          <p class="faq__card-dropdown__desc">${item.desc}</p>
        </div>
      </article>
      `
    ))
    .join("");

  const cards = document.querySelectorAll(".faq__card");
  cards.forEach((card) => {
    card.addEventListener("click", toggleDropdown);
  });
}

function toggleDropdown(event) { 
  const button = event.target;
  const card = button.closest(".faq__card");
  const header = card.querySelector(".faq__card-header");
  const headerTitle = card.querySelector(".faq__card-title")
  const dropdown = card.querySelector(".faq__card-dropdown");
  const btn = card.querySelector(".faq__toggle-button");

  if (dropdown.style.maxHeight <= "0px") {
    dropdown.style.maxHeight = "1000px";
    header.style.background = "#161616"
    headerTitle.style.color = "#fff"
    btn.style.transform = "rotate(30deg)";
    card.classList.add("active");
  } else {
    dropdown.style.maxHeight = "0";
    header.style.background = "#0E0E0E"
    headerTitle.style.color = "#5E5E5E"
    btn.style.transform = "rotate(0)";
    card.classList.remove("active");
  }
}

displayFaq(faq);
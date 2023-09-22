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
    desc: "Вы обр."
  },
  {
    id: "3",
    number: "03",
    img: "./assets/img/work2.webp",
    desc: "Вы обр."
  },
  {
    id: "4",
    number: "04",
    img: "./assets/img/home.webp",
    desc: "Вы обр."
  },
  {
    id: "5",
    number: "05",
    img: "./assets/img/work1.webp",
    desc: "Вы обр."
  },
  {
    id: "6",
    number: "06",
    img: "./assets/img/work2.webp",
    desc: "Вы обр."
  },
  {
    id: "7",
    number: "07",
    img: "./assets/img/home.webp",
    desc: "Вы обр."
  }
]

const worksContainer = document.getElementById("work-container");

function displayWorksCard (works) {
  worksContainer.innerHTML = works
  .map((work) => (
    `
    <article class="works__card">
      <h1 class="works__card-numbers">${work.number}</h1>
      <img class="works__card-img" src="${work.img}" />
      <p class="works__card-desc">
        ${work.desc}
      </p>
    </article>
    `
  ))
  .join("");
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

    displayWorksCard(data.filter((item) => item.id === selectedCat));
  });
};

displayWorksCard(data.filter((item) => item.id === "1"))
setCategories();

// faq
const faq = [
  {
    id: 1,
    title: "Где и как мне выбирать позицию для заказа?",
    desc: "1"
  },
  {
    id: 2,
    title: "Что такое Poizon и точно ли там оригинальная продукция?",
    desc: "2"
  },
  {
    id: 3,
    title: "Что, если мой заказ потеряют или с ним что-либо случится?",
    desc: "3"
  },
  {
    id: 4,
    title: "Нужно ли платить дополнительно за доставку в мой город?",
    desc: "4"
  },
  {
    id: 5,
    title: "Могу ли я оформить возврат, если мне не подошел размер или не устроило что-либо еще",
    desc: "5"
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
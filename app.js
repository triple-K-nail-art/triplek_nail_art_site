const galleryImages = Array.from({ length: 31 }, (_, index) => {
  const number = index + 1;
  return {
    src: `images/nail${number}.jpeg`,
    alt: `Nail design ${number}`,
  };
});

const pricingItems = [
  { title: "Short Nails", price: "$3000" },
  { title: "Medium Nails", price: "$3500" },
  { title: "Long Nails", price: "$4000" },
  { title: "Pedicure", price: "$3000" },
  { title: "Manicure", price: "$2000" },
  { title: "Gel X", price: "$3500" },
  { title: "Polish Toe", price: "$1000" },
  { title: "Tip Toe Nail", price: "$1500" },
  { title: "Soak off Fingers", price: "$1500" },
  { title: "Soak off Toes", price: "$1000" },
  { title: "Acrylic all Toes", price: "$2500" },
  { title: "Refill Fingers", price: "$2500" },
  { title: "Refill Toes", price: "$1200" },
  { title: "Charms", price: "price varies" },
];

const specialOffers = [
  {
    title: "✨ V - Day Special Offer ✨",
    lines: [
      { label: "Short French (1 design)", price: "$2500" },
      { label: "Short French Tip (Toes)", price: "$1200" },
    ],
    dates: "*Feb 6 - Feb 16*",
  },
  {
    title: "💅 Limited Time 💅",
    lines: [
      { label: "Short French + Pedicure", price: "$5200" },
      { label: "Pedi Only", price: "$2700" },
    ],
    dates: "*Feb 6 - Feb 16*",
  },
];

const createPricingItem = ({ title, price }) => {
  const item = document.createElement("div");
  item.className = "item";

  const titleSpan = document.createElement("span");
  titleSpan.className = "title";
  titleSpan.textContent = title;

  const dots = document.createElement("span");
  dots.className = "dots";

  const priceSpan = document.createElement("span");
  priceSpan.className = "price";
  priceSpan.textContent = price;

  item.append(titleSpan, dots, priceSpan);
  return item;
};

const renderGallery = () => {
  const wrapper = document.getElementById("gallery-slides");
  if (!wrapper) return;

  galleryImages.forEach(({ src, alt }) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    img.decoding = "async";

    slide.appendChild(img);
    wrapper.appendChild(slide);
  });
};

const renderPricing = () => {
  const pricingContainer = document.getElementById("pricing-items");
  if (!pricingContainer) return;

  pricingItems.forEach((item) => pricingContainer.appendChild(createPricingItem(item)));
};

const renderSpecialOffers = () => {
  const offersContainer = document.getElementById("special-offers");
  if (!offersContainer) return;

  specialOffers.forEach((offer) => {
    const card = document.createElement("div");
    card.className = "special-offer";

    const title = document.createElement("h3");
    title.textContent = offer.title;

    const lines = document.createElement("div");
    offer.lines.forEach((line) => {
      const p = document.createElement("p");
      p.innerHTML = `${line.label} - <span class=\"highlight\">${line.price}</span>`;
      lines.appendChild(p);
    });

    const dates = document.createElement("p");
    dates.textContent = offer.dates;

    card.append(title, lines, dates);
    offersContainer.appendChild(card);
  });
};

const initSwiper = () => {
  if (!window.Swiper) return;

  new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      600: { slidesPerView: 2 },
      900: { slidesPerView: 3 },
    },
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  renderPricing();
  renderSpecialOffers();
  initSwiper();
});

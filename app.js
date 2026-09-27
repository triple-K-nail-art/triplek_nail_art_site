const galleryImages = Array.from({ length: 31 }, (_, index) => {
  const number = index + 1;
  return {
    src: `images/nail${number}.jpeg`,
    alt: `Nail design ${number}`,
  };
});

const pricingItems = [
  { title: "Short Nails", price: "$3500" },
  { title: "Medium Nails", price: "$4000" },
  { title: "Long Nails", price: "$5500 and up" },
  { title: "Fill Short Nails", price: "$2500" },
  { title: "Fill Medium Nails", price: "$3000" },
  { title: "Fill Long Nails", price: "$4000" },
  { title: "Fill Toes", price: "$1500" },
  { title: "Tip Toes", price: "$1800" },
  { title: "Acrylic All Toes", price: "$2500" },
  { title: "Gel Polish Toes", price: "$1500" },
  { title: "Pedicure (Female)", price: "$3500" },
  { title: "Pedicure (Men)", price: "$4000" },
  { title: "Gel-X", price: "$4000" },
];

const featuredPricing = pricingItems.slice(0, 3);

const specialOffers = [
  {
    title: "✨ October Special ✨",
    lines: [
      { label: "Short Short Nails", price: "$3000" },
    ],
    dates: "Oct 1 - Oct 31",
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

  pricingItems.slice(featuredPricing.length).forEach((item) => {
    pricingContainer.appendChild(createPricingItem(item));
  });
};

const renderFeaturedPricing = () => {
  const featuredContainer = document.getElementById("pricing-featured");
  if (!featuredContainer) return;

  featuredPricing.forEach((item) => {
    const card = document.createElement("div");
    card.className = "pricing-card";

    const title = document.createElement("h4");
    title.textContent = item.title;

    const price = document.createElement("p");
    price.className = "pricing-card-price";
    price.textContent = item.price;

    const note = document.createElement("p");
    note.className = "pricing-card-note";
    note.textContent = "Signature length options.";

    card.append(title, price, note);
    featuredContainer.appendChild(card);
  });
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
  renderFeaturedPricing();
  renderSpecialOffers();
  initSwiper();
  initRevealAnimations();
});

const initRevealAnimations = () => {
  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((element) => {
    Array.from(element.children).forEach((child, index) => {
      child.classList.add("stagger");
      child.style.setProperty("--stagger-delay", `${index * 80}ms`);
    });
  });

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((el) => observer.observe(el));
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
});

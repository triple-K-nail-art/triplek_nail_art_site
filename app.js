const galleryImages = Array.from({ length: 31 }, (_, index) => {
  const number = index + 1;
  return {
    src: `images/nail${number}.jpeg`,
    alt: `Nail design ${number}`,
  };
});

galleryImages.push(
  ...[
    "PHOTO-2026-09-27-09-11-30 2.jpg",
    "PHOTO-2026-09-27-09-11-30 3.jpg",
    "PHOTO-2026-09-27-09-11-30 4.jpg",
    "PHOTO-2026-09-27-09-11-30 5.jpg",
    "PHOTO-2026-09-27-09-11-30.jpg",
    "PHOTO-2026-09-27-09-11-31 2.jpg",
    "PHOTO-2026-09-27-09-11-31 3.jpg",
    "PHOTO-2026-09-27-09-11-31 4.jpg",
    "PHOTO-2026-09-27-09-11-31 5.jpg",
    "PHOTO-2026-09-27-09-11-31 6.jpg",
    "PHOTO-2026-09-27-09-11-31 7.jpg",
    "PHOTO-2026-09-27-09-11-31 8.jpg",
    "PHOTO-2026-09-27-09-11-31.jpg",
    "PHOTO-2026-09-27-09-11-32 2.jpg",
    "PHOTO-2026-09-27-09-11-32 3.jpg",
    "PHOTO-2026-09-27-09-11-32 4.jpg",
    "PHOTO-2026-09-27-09-11-32.jpg",
  ].map((filename, index) => ({
    src: `images/${filename}`,
    alt: `Nail art design ${index + 32}`,
  })),
);

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

  galleryImages.slice(0, 4).forEach(({ src, alt }, index) => {
    const slot = document.createElement("div");
    slot.className = "gallery-slot";
    slot.dataset.index = index;
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.decoding = "async";
    slot.appendChild(img);
    wrapper.appendChild(slot);
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

const initGallery = () => {
  const track = document.getElementById("gallery-slides");
  const counter = document.getElementById("gallery-counter");
  const previous = document.querySelector(".gallery-prev");
  const next = document.querySelector(".gallery-next");
  if (!track || !counter || !previous || !next) return;

  const slots = Array.from(track.querySelectorAll(".gallery-slot"));
  const total = galleryImages.length;
  let firstIndex = 0;
  let isAnimating = false;
  let isReady = false;
  const visibleSlotCount = () => (window.matchMedia("(max-width: 540px)").matches ? 4 : 3);

  const updateCounter = () => {
    if (!isReady) {
      counter.textContent = "Loading photos…";
      return;
    }
    const count = visibleSlotCount();
    counter.textContent = `${String(firstIndex + 1).padStart(2, "0")}–${String(
      (firstIndex + count - 1) % total + 1,
    ).padStart(2, "0")} / ${total}`;
  };

  const turn = (step) => {
    if (!isReady || isAnimating) return;
    isAnimating = true;
    const count = visibleSlotCount();
    const animations = slots.slice(0, count).map((slot, index) => {
      const img = slot.querySelector("img");
      const targetIndex = (firstIndex + index + step + total) % total;
      const delay = index * 90;
      const movement = index % 2 === 0 ? -1 : 1;

      return new Promise((resolve) => {
        window.setTimeout(() => {
          const outgoing = img.animate(
            [
              { transform: "translateY(0)", opacity: 1 },
              { transform: `translateY(${movement * 110}%)`, opacity: 0.25 },
            ],
            { duration: 340, easing: "cubic-bezier(0.4, 0, 1, 1)" },
          );
          outgoing.onfinish = () => {
            img.src = galleryImages[targetIndex].src;
            img.alt = galleryImages[targetIndex].alt;
            const incoming = img.animate(
              [
                { transform: `translateY(${movement * -110}%)`, opacity: 0.25 },
                { transform: "translateY(0)", opacity: 1 },
              ],
              { duration: 380, easing: "cubic-bezier(0, 0, 0.2, 1)" },
            );
            incoming.onfinish = resolve;
          };
        }, delay);
      });
    });

    firstIndex = (firstIndex + step + total) % total;
    updateCounter();
    Promise.all(animations).then(() => {
      isAnimating = false;
    });
  };

  previous.addEventListener("click", () => turn(-visibleSlotCount()));
  next.addEventListener("click", () => turn(visibleSlotCount()));
  window.addEventListener("resize", updateCounter);

  previous.disabled = true;
  next.disabled = true;
  updateCounter();

  Promise.all(
    galleryImages.map(({ src }) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
      return image.decode().catch(() => undefined);
    }),
  ).then(() => {
    isReady = true;
    previous.disabled = false;
    next.disabled = false;
    updateCounter();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  renderPricing();
  renderFeaturedPricing();
  renderSpecialOffers();
  initGallery();
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

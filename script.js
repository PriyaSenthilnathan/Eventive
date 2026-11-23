const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    primaryNav.classList.toggle("is-open", !isOpen);
  });
}

const categoryIcons = {
  Music: "♫",
  Technology: "⌘",
  Sports: "↗",
  Workshops: "✳"
};

const createEventCard = (event) => {
  const card = document.createElement("article");
  card.className = "event-card";

  const top = document.createElement("div");
  top.className = "card-top";
  const category = document.createElement("span");
  category.className = "category-tag";
  category.textContent = `${categoryIcons[event.category] || "✦"} ${event.category}`;
  const emoji = document.createElement("span");
  emoji.className = "card-emoji";
  emoji.setAttribute("aria-hidden", "true");
  emoji.textContent = event.emoji;
  top.append(category, emoji);

  const title = document.createElement("h3");
  title.textContent = event.title;
  const description = document.createElement("p");
  description.textContent = event.description;
  const meta = document.createElement("div");
  meta.className = "event-meta";
  const date = document.createElement("span");
  date.textContent = `▦ ${new Date(`${event.date}T12:00:00`).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}`;
  const location = document.createElement("span");
  location.textContent = `⌖ ${event.location}`;
  meta.append(date, location);

  const details = document.createElement("a");
  details.className = "event-card-link";
  details.href = `contact.html?event=${encodeURIComponent(event.title)}`;
  details.textContent = "View Details →";

  card.append(top, title, description, meta, details);
  return card;
};

const featuredContainer = document.querySelector("[data-featured-events]");
const eventsContainer = document.querySelector("[data-events-grid]");
const searchInput = document.querySelector("#event-search");
const emptyMessage = document.querySelector("[data-empty-message]");
const filterButtons = document.querySelectorAll("[data-category]");

if (featuredContainer || eventsContainer) {
  let allEvents = [];
  let selectedCategory = "All";

  const renderEvents = () => {
    if (!eventsContainer) return;

    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const filteredEvents = allEvents.filter((event) => {
      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
      return matchesCategory && event.title.toLowerCase().includes(searchTerm);
    });

    eventsContainer.replaceChildren(...filteredEvents.map(createEventCard));
    if (emptyMessage) emptyMessage.hidden = filteredEvents.length > 0;
  };

  fetch("events.json")
    .then((response) => {
      if (!response.ok) throw new Error(`Could not load events (${response.status}).`);
      return response.json();
    })
    .then((events) => {
      if (!Array.isArray(events)) throw new Error("The event data must be a JSON array.");
      allEvents = events;
      if (featuredContainer) {
        featuredContainer.replaceChildren(...allEvents.slice(0, 3).map(createEventCard));
      }
      renderEvents();
    })
    .catch((error) => {
      console.error("Eventive could not load event data:", error);
      if (featuredContainer) featuredContainer.innerHTML = '<p class="loading-message">Events could not be loaded. Please try again using Live Server.</p>';
      if (eventsContainer) eventsContainer.innerHTML = '<p class="loading-message">Events could not be loaded. Please try again using Live Server.</p>';
    });

  if (searchInput) searchInput.addEventListener("input", renderEvents);

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedCategory = button.dataset.category || "All";
      filterButtons.forEach((filterButton) => {
        const isSelected = filterButton === button;
        filterButton.classList.toggle("is-active", isSelected);
        filterButton.setAttribute("aria-pressed", String(isSelected));
      });
      renderEvents();
    });
  });
}

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  const feedback = document.querySelector("[data-form-feedback]");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const eventTitle = new URLSearchParams(window.location.search).get("event");
  const subjectInput = contactForm.elements.namedItem("subject");
  if (eventTitle && subjectInput) subjectInput.value = `Question about ${eventTitle}`;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const subject = formData.get("subject").trim();
    const message = formData.get("message").trim();
    const firstEmptyField = [contactForm.elements.name, contactForm.elements.email, subjectInput, contactForm.elements.message]
      .find((field) => !field.value.trim());

    feedback.classList.remove("is-error");
    if (firstEmptyField) {
      feedback.textContent = "Please fill in all fields before submitting.";
      feedback.classList.add("is-error");
      firstEmptyField.focus();
      return;
    }

    if (!emailPattern.test(email)) {
      feedback.textContent = "Please enter a valid email address.";
      feedback.classList.add("is-error");
      contactForm.elements.email.focus();
      return;
    }

    feedback.textContent = `Thanks, ${name}! Your message has been received successfully (demo).`;
    contactForm.reset();
  });
}
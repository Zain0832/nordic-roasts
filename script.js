document.addEventListener("DOMContentLoaded", () => {
  // 1. Responsive Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // 2. Live Christmas / Holiday Blend Countdown (Home Page)
  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    function updateCountdown() {
      const now = new Date();
      let targetYear = now.getFullYear();
      let christmas = new Date(targetYear, 11, 25, 0, 0, 0); // Dec 25

      if (now > christmas) {
        christmas = new Date(targetYear + 1, 11, 25, 0, 0, 0);
      }

      const diff = christmas - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // 3. Menu Category Filter (Menu Page)
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuRows = document.querySelectorAll("#menuBody tr");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      menuRows.forEach((row) => {
        if (
          category === "all" ||
          row.getAttribute("data-category") === category
        ) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });

  // 4. Form Validation (Menu & Contact Page)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const messageError = document.getElementById("messageError");
      const formSuccess = document.getElementById("formSuccess");

      // Clear previous messages
      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";
      formSuccess.textContent = "";

      let isValid = true;

      if (name.length < 2) {
        nameError.textContent =
          "Please enter your name (at least 2 characters).";
        isValid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
      }

      if (message.length < 10) {
        messageError.textContent =
          "Please enter a message of at least 10 characters.";
        isValid = false;
      }

      if (isValid) {
        formSuccess.textContent = `Thank you, ${name}! Your message has been received.`;
        contactForm.reset();
      }
    });
  }
});

(function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const form = document.querySelector("#feedback-form");
  const topic = document.querySelector("#topic");
  const message = document.querySelector("#message");
  const formMessage = document.querySelector("#form-message");

  function toggleMobileMenu(forceOpen) {
    const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !mobileMenu.classList.contains("is-open");
    mobileMenu.hidden = !shouldOpen;
    mobileMenu.classList.toggle("is-open", shouldOpen);
    menuToggle.setAttribute("aria-expanded", String(shouldOpen));
  }

  function buildMailtoUrl() {
    const subject = `PractEar feedback: ${topic.value}`;
    const body = [
      `Topic: ${topic.value}`,
      "",
      "Feedback:",
      message.value.trim()
    ].join("\n");

    return `mailto:support@practear.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      toggleMobileMenu();
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggleMobileMenu(false);
      });
    });
  }

  if (form && topic && message && formMessage) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      formMessage.textContent = "Opening your email app...";
      window.location.href = buildMailtoUrl();
    });
  }

  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });

  document.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });

  document.addEventListener("copy", function (event) {
    event.preventDefault();
  });
})();

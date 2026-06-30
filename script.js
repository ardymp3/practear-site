(function () {
  document.documentElement.classList.add("js");

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

  const revealTargets = document.querySelectorAll(
    ".section-heading, .exercise-card, .progress-visual, .leaderboard-visual, .faq-list"
  );

  revealTargets.forEach(function (target, index) {
    target.classList.add("reveal-target");
    if (target.classList.contains("exercise-card")) {
      target.style.setProperty("--reveal-delay", `${(index % 6) * 55}ms`);
    }
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    revealTargets.forEach(function (target) {
      revealObserver.observe(target);
    });
  } else {
    revealTargets.forEach(function (target) {
      target.classList.add("is-visible");
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

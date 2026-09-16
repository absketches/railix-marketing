(function () {
  const fallbackLanguage = "de";
  const savedLanguage = localStorage.getItem("railix-language");
  const initialLanguage = savedLanguage === "en" ? "en" : fallbackLanguage;
  const languageControls = Array.from(document.querySelectorAll("[data-language-switch]"));
  const siteHeader = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNavigation = document.querySelector(".site-tabs");

  function getMessage(messages, key) {
    return key.split(".").reduce((value, part) => value && value[part], messages);
  }

  function setLanguage(language) {
    const messages = window.RailixMessages && window.RailixMessages[language];

    if (!messages) {
      return;
    }

    document.documentElement.lang = language;
    localStorage.setItem("railix-language", language);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const message = getMessage(messages, element.dataset.i18n);

      if (typeof message === "string") {
        element.textContent = message;
      }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const message = getMessage(messages, element.dataset.i18nAlt);

      if (typeof message === "string") {
        element.setAttribute("alt", message);
      }
    });

    const page = document.body.dataset.page;
    const title = page && getMessage(messages, `${page}.title`);
    const description = page && getMessage(messages, `${page}.meta`);

    if (title) {
      document.title = title;
    }

    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    }

    languageControls.forEach((control) => {
      control.value = language;
    });
  }

  languageControls.forEach((control) => {
    control.addEventListener("change", () => {
      setLanguage(control.value);
    });
  });

  if (siteHeader && menuToggle && siteNavigation) {
    siteHeader.classList.add("menu-ready");

    function setMenuOpen(isOpen) {
      siteHeader.classList.toggle("menu-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    }

    menuToggle.addEventListener("click", () => {
      setMenuOpen(!siteHeader.classList.contains("menu-open"));
    });

    siteNavigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenuOpen(false);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    });
  }

  setLanguage(initialLanguage);
})();

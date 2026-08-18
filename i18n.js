(function () {
  const fallbackLanguage = "de";
  const savedLanguage = localStorage.getItem("railix-language");
  const initialLanguage = savedLanguage === "en" ? "en" : fallbackLanguage;
  const buttons = Array.from(document.querySelectorAll("[data-language-switch]"));

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

    const page = document.body.dataset.page;
    const title = page && getMessage(messages, `${page}.title`);
    const description = page && getMessage(messages, `${page}.meta`);

    if (title) {
      document.title = title;
    }

    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    }

    buttons.forEach((button) => {
      const isActive = button.dataset.languageSwitch === language;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.languageSwitch);
    });
  });

  setLanguage(initialLanguage);
})();

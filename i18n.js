(function () {
  const fallbackLanguage = "de";
  const savedLanguage = localStorage.getItem("railix-language");
  const initialLanguage = savedLanguage === "en" ? "en" : fallbackLanguage;
  const languageControls = Array.from(document.querySelectorAll("[data-language-switch]"));
  const siteHeader = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNavigation = document.querySelector(".site-tabs");
  const activeNavigationLink = siteNavigation && siteNavigation.querySelector("a.active");
  const mobileNavigationQuery = window.matchMedia("(max-width: 720px)");
  const focusVideos = Array.from(document.querySelectorAll("[data-focus-video]"));
  const localizedVideos = Array.from(document.querySelectorAll("[data-localized-video]"));
  const audioToggleButtons = Array.from(document.querySelectorAll("[data-audio-toggle-button]"));
  const navigationPageKeys = {
    home: "overview",
    model: "model",
    run: "runAnywhere",
    useCases: "useCases",
    security: "security",
    team: "team",
    contact: "contact",
  };

  function getMessage(messages, key) {
    return key.split(".").reduce((value, part) => value && value[part], messages);
  }

  function syncLocalizedVideos(language) {
    localizedVideos.forEach((video) => {
      let source = video.querySelector("source");
      const sourcePath = language === "en" ? video.dataset.videoSrcEn : video.dataset.videoSrcDe;
      const posterPath = language === "en" ? video.dataset.videoPosterEn : video.dataset.videoPosterDe;

      if (posterPath) {
        video.setAttribute("poster", posterPath);
      }

      if (!sourcePath) {
        return;
      }

      if (!source) {
        source = document.createElement("source");
        source.type = "video/mp4";
        video.append(source);
      }

      if (source.getAttribute("src") === sourcePath) {
        return;
      }

      const shouldResume = !video.paused;

      source.setAttribute("src", sourcePath);
      video.load();

      if (shouldResume) {
        video.play().catch(() => {});
      }
    });
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

    syncLocalizedVideos(language);

    if (menuToggle) {
      const navigationKey = page && navigationPageKeys[page];
      const fallbackLabel = navigationKey && getMessage(messages, `nav.${navigationKey}`);
      const menuLabel = activeNavigationLink ? activeNavigationLink.textContent : fallbackLabel;

      if (menuLabel) {
        menuToggle.textContent = menuLabel;
        menuToggle.setAttribute("aria-label", `Navigation: ${menuLabel}`);
      }
    }
  }

  languageControls.forEach((control) => {
    control.addEventListener("change", () => {
      setLanguage(control.value);
    });
  });

  setLanguage(initialLanguage);

  if (siteHeader && menuToggle && siteNavigation) {
    siteHeader.classList.add("menu-ready");

    function setMenuOpen(isOpen) {
      siteHeader.classList.toggle("menu-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    }

    function syncMenuVisibility() {
      const isMobile = mobileNavigationQuery.matches;

      menuToggle.hidden = !isMobile;

      if (!isMobile) {
        setMenuOpen(false);
      }
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

    mobileNavigationQuery.addEventListener("change", syncMenuVisibility);
    syncMenuVisibility();
  }

  if (focusVideos.length) {
    if ("IntersectionObserver" in window) {
      const videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target;

            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.4 },
      );

      focusVideos.forEach((video) => {
        videoObserver.observe(video);
      });
    } else {
      focusVideos.forEach((video) => {
        video.play().catch(() => {});
      });
    }
  }

  audioToggleButtons.forEach((button) => {
    const video = button.closest(".vision-hero")?.querySelector("video");

    if (!video) {
      return;
    }

    function syncAudioButton() {
      const isMuted = video.muted;
      const label = isMuted ? button.dataset.mutedLabel : button.dataset.unmutedLabel;

      button.setAttribute("aria-label", label || (isMuted ? "Muted" : "Sound on"));
      button.setAttribute("aria-pressed", String(!isMuted));
    }

    button.addEventListener("click", () => {
      video.muted = !video.muted;
      video.play().catch(() => {});
      syncAudioButton();
    });

    syncAudioButton();
  });
})();

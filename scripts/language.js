const langButtons = document.querySelectorAll("[data-language]");
const preferredLang = navigator.languages;
let currentLanguage = "es";
const translationsCache = {};

const savedLang = localStorage.getItem("lang");

if (savedLang) {
  loadLanguage(savedLang);
} else if (preferredLang[0]?.includes("es")) {
  loadLanguage("es");
} else {
  loadLanguage("en");
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    loadLanguage(btn.dataset.language);
  });
});

async function loadLanguage(language) {
  try {
    currentLanguage = language;

    if (!translationsCache[language]) {
      const response = await fetch(`/lang/${language}.json`);
      if (!response.ok) {
        throw new Error("Failed to load language file");
      }
      translationsCache[language] = await response.json();
    }

    updateTexts(translationsCache[language]);
    updateActiveButton(language);
  } catch (error) {
    console.error("Error loading language:", error);
  }
}

function updateTexts(data) {
  const textsToChange = document.querySelectorAll("[data-section]");

  textsToChange.forEach((element) => {
    const { section, value } = element.dataset;

    if (section && value && data[section]?.[value]) {
      element.textContent = data[section][value];
    }
  });
}

function updateActiveButton(language) {
  langButtons.forEach((btn) => {
    btn.classList.toggle("lang-active", btn.dataset.language === language);
  });
  localStorage.setItem("lang", language);
}

window.retranslate = function () {
  if (translationsCache[currentLanguage]) {
    updateTexts(translationsCache[currentLanguage]);
  }
};

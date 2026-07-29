const CONFIG = {
  recipientName: "una persona molto speciale",
  senderName: "Giovanni",
  dateTitle: "un aperitivo e una passeggiata",
  dateNote: "Scegli il giorno. A tutto il resto penso io.",
  whatsappNumber: "393924899781",
  whatsappMessage:
    "Confermo ufficialmente: accetto l'itnvito.",
  photos: [
    {
      src: "photos/placeholder-01.svg",
      alt: "Spazio riservato alla prima fotografia di Giovanni",
      caption: "Ritratto ufficiale, da sostituire",
    },
    {
      src: "photos/placeholder-02.svg",
      alt: "Spazio riservato alla seconda fotografia di Giovanni",
      caption: "Reperto fotografico numero due",
    },
    {
      src: "photos/placeholder-03.svg",
      alt: "Spazio riservato alla terza fotografia di Giovanni",
      caption: "Documentazione complementare",
    },
    {
      src: "photos/placeholder-04.svg",
      alt: "Spazio riservato alla quarta fotografia di Giovanni",
      caption: "Ultima prova depositata agli atti",
    },
  ],
};

const MAX_DECLINE_ATTEMPTS = 5;
const REASONS_PER_ATTEMPT = 4;
const CAROUSEL_AUTOPLAY_DELAY = 5_800;

const declineReasons = [
  {
    id: "calendar",
    title: "Consultazione del calendario in corso",
    detail: "I pianeti e gli impegni non hanno ancora raggiunto un accordo.",
  },
  {
    id: "snacks",
    title: "Informativa snack insufficiente",
    detail: "Non sono state fornite garanzie scritte sulla disponibilità di cibo.",
  },
  {
    id: "charm",
    title: "Livello di fascino sospetto",
    detail: "L'offerta appare fin troppo interessante per essere archiviata subito.",
  },
  {
    id: "hair",
    title: "Giornata amministrativamente sfavorevole per i capelli",
    detail: "La piega non ha ancora ricevuto il nulla osta ministeriale.",
  },
  {
    id: "series",
    title: "Serie televisiva in fase critica",
    detail: "Mancano soltanto sette episodi, tre stagioni e un minimo di autocontrollo.",
  },
  {
    id: "cat",
    title: "Il gatto non ha controfirmato",
    detail: "L'autorità felina competente mantiene un silenzio ostinatamente ambiguo.",
  },
  {
    id: "weather",
    title: "Previsione di atmosfera troppo romantica",
    detail: "Si segnalano possibili sorrisi diffusi e precipitazioni di complimenti.",
  },
  {
    id: "outfit",
    title: "Assenza di un outfit diplomaticamente adeguato",
    detail: "Il guardaroba ha chiesto quarantotto ore per deliberare.",
  },
  {
    id: "pizza",
    title: "Mancata dichiarazione sulla pizza",
    detail: "Non risultano depositate preferenze ufficiali in materia di condimenti.",
  },
  {
    id: "playlist",
    title: "Playlist ancora priva di autorizzazione",
    detail: "La commissione musicale non ha escluso la presenza di brani imbarazzanti.",
  },
  {
    id: "moon",
    title: "Mercurio probabilmente sta facendo qualcosa",
    detail: "Nessuno sa esattamente cosa, ma sembra prudente citarlo nel modulo.",
  },
  {
    id: "laundry",
    title: "Lavatrice convocata nello stesso orario",
    detail: "Il programma delicati non accetta rinvii né mediazioni.",
  },
  {
    id: "social-battery",
    title: "Batteria sociale al 14,7 per cento",
    detail: "La ricarica è iniziata, ma il caricatore emotivo è piuttosto lento.",
  },
  {
    id: "mystery",
    title: "Eccesso di mistero nella proposta",
    detail: "L'aperitivo potrebbe nascondere risate, dolci o altre intenzioni piacevoli.",
  },
  {
    id: "bureaucracy",
    title: "Mancanza del modulo per rifiutare questo modulo",
    detail: "La pratica presenta un vizio burocratico di rara e notevole eleganza.",
  },
  {
    id: "nap",
    title: "Pisolino preventivo non ancora effettuato",
    detail: "La normativa interna vieta decisioni importanti in condizioni di sonnolenza.",
  },
  {
    id: "committee",
    title: "Il gruppo delle amiche non ha ancora votato",
    detail: "Il quorum è lontano e la chat risulta occupata da messaggi vocali.",
  },
  {
    id: "too-good",
    title: "Proposta irritantemente difficile da rifiutare",
    detail: "La formulazione appare studiata per mettere in crisi l'ufficio dinieghi.",
  },
];

const rulings = [
  {
    title: "Motivazione non abbastanza grave.",
    message:
      "La motivazione è stata esaminata da tre impiegati immaginari. Nessuno è riuscito a prenderla abbastanza sul serio.",
  },
  {
    title: "Carenza perfettamente sanabile.",
    message:
      "Il richiedente si impegna a risolvere la questione davanti a qualcosa di buono. L'istanza perde efficacia.",
  },
  {
    title: "Il Ministero ha detto «ritenta».",
    message:
      "Il fascicolo ha percorso diciassette corridoi ed è tornato con un timbro rosso e nessuna spiegazione utile.",
  },
  {
    title: "Ricorso respinto con grande teatralità.",
    message:
      "Una commissione straordinaria ha sospirato, guardato fuori dalla finestra e decretato che serve un ultimo tentativo.",
  },
  {
    title: "Ricorso accolto.",
    message:
      "Va bene, il comitato ha capito. Nessuna pressione: puoi depositare un elegante “magari un'altra volta”.",
  },
];

const invitationView = document.querySelector("#invitationView");
const successView = document.querySelector("#successView");
const raincheckView = document.querySelector("#raincheckView");
const acceptButton = document.querySelector("#acceptButton");
const declineButton = document.querySelector("#declineButton");
const declineDialog = document.querySelector("#declineDialog");
const declineForm = document.querySelector("#declineForm");
const closeDialogButton = document.querySelector("#closeDialog");
const formStage = document.querySelector("#formStage");
const reasonList = document.querySelector("#reasonList");
const rulingStage = document.querySelector("#rulingStage");
const formError = document.querySelector("#formError");
const rulingCounter = document.querySelector("#rulingCounter");
const rulingTitle = document.querySelector("#rulingTitle");
const rulingMessage = document.querySelector("#rulingMessage");
const retryDeclineButton = document.querySelector("#retryDecline");
const raincheckButton = document.querySelector("#raincheckButton");
const dateInput = document.querySelector("#dateInput");
const dateFormError = document.querySelector("#dateFormError");
const whatsappLink = document.querySelector("#whatsappLink");
const confetti = document.querySelector("#confetti");
const restartButtons = document.querySelectorAll(".restart-button");
const photoCarousel = document.querySelector("#photoCarousel");
const carouselViewport = document.querySelector("#carouselViewport");
const carouselTrack = document.querySelector("#carouselTrack");
const carouselPrevious = document.querySelector("#carouselPrevious");
const carouselNext = document.querySelector("#carouselNext");
const carouselStatus = document.querySelector("#carouselStatus");
const carouselDots = document.querySelector("#carouselDots");

let declineAttempts = 0;
let lastReasonIds = [];
let carouselIndex = 0;
let carouselAutoplayTimer;
let carouselPointerStartX;
let carouselPointerStartY;

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function getFreshReasons() {
  let selection = [];
  let safetyCounter = 0;

  do {
    selection = shuffle(declineReasons).slice(0, REASONS_PER_ATTEMPT);
    safetyCounter += 1;
  } while (
    selection.every((reason) => lastReasonIds.includes(reason.id)) &&
    safetyCounter < 12
  );

  lastReasonIds = selection.map((reason) => reason.id);
  return selection;
}

function renderReasonOptions() {
  const fragment = document.createDocumentFragment();

  getFreshReasons().forEach((reason, index) => {
    const label = document.createElement("label");
    label.className = "reason-option";
    label.style.setProperty("--option-index", index);

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "reason";
    input.value = reason.id;

    const copy = document.createElement("span");
    const title = document.createElement("strong");
    const detail = document.createElement("small");

    title.textContent = reason.title;
    detail.textContent = reason.detail;
    copy.append(title, detail);
    label.append(input, copy);
    fragment.appendChild(label);
  });

  reasonList.replaceChildren(fragment);
}

function normalizeRecipientName(value) {
  if (!value) return "";

  return value
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
}

function resolveRecipientName() {
  const searchParams = new URLSearchParams(window.location.search);
  return normalizeRecipientName(
    searchParams.get("nome") || searchParams.get("name"),
  ) || CONFIG.recipientName;
}

function populateConfiguration() {
  CONFIG.recipientName = resolveRecipientName();

  document.querySelectorAll("[data-config]").forEach((element) => {
    const key = element.dataset.config;
    if (Object.hasOwn(CONFIG, key)) {
      element.textContent = CONFIG[key];
    }
  });

  dateInput.min = getLocalISODate();
}

function renderCarousel() {
  const photos = Array.isArray(CONFIG.photos)
    ? CONFIG.photos.filter((photo) => photo?.src)
    : [];

  if (photos.length === 0) {
    photoCarousel.classList.add("is-empty");
    carouselViewport.removeAttribute("tabindex");
    carouselTrack.innerHTML =
      '<div class="carousel-empty"><strong>Nessuna fotografia depositata.</strong><span>Aggiungi le immagini dentro CONFIG.photos in script.js.</span></div>';
    carouselPrevious.hidden = true;
    carouselNext.hidden = true;
    carouselStatus.textContent = "Archivio fotografico vuoto";
    return;
  }

  const slides = document.createDocumentFragment();
  const dots = document.createDocumentFragment();

  photos.forEach((photo, index) => {
    const figure = document.createElement("figure");
    figure.className = "carousel-slide";
    figure.setAttribute("role", "group");
    figure.setAttribute("aria-roledescription", "diapositiva");
    figure.setAttribute("aria-label", `Fotografia ${index + 1} di ${photos.length}`);

    const frame = document.createElement("div");
    frame.className = "photo-frame is-loading";
    frame.style.setProperty("--photo-tilt", `${index % 2 === 0 ? -0.55 : 0.55}deg`);

    const image = document.createElement("img");
    image.src = photo.src;
    image.alt = photo.alt || `Fotografia ${index + 1} del richiedente`;
    image.loading = index === 0 ? "eager" : "lazy";
    image.decoding = "async";
    image.draggable = false;

    const fallback = document.createElement("div");
    fallback.className = "photo-error";
    fallback.innerHTML =
      "<strong>Fotografia non disponibile</strong><span>Controlla il percorso del file in script.js.</span>";

    image.addEventListener("load", () => frame.classList.remove("is-loading"));
    image.addEventListener("error", () => {
      frame.classList.remove("is-loading");
      frame.classList.add("has-error");
      image.hidden = true;
    });

    const caption = document.createElement("figcaption");
    const reference = document.createElement("span");
    const description = document.createElement("span");
    reference.textContent = `Allegato A.${index + 1}`;
    description.textContent = photo.caption || `Fotografia ${index + 1}`;
    caption.append(reference, description);

    frame.append(image, fallback);
    figure.append(frame, caption);
    slides.appendChild(figure);

    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Mostra la fotografia ${index + 1}`);
    dot.addEventListener("click", () => {
      showCarouselSlide(index);
      restartCarouselAutoplay();
    });
    dots.appendChild(dot);
  });

  carouselTrack.replaceChildren(slides);
  carouselDots.replaceChildren(dots);
  carouselPrevious.hidden = photos.length < 2;
  carouselNext.hidden = photos.length < 2;
  showCarouselSlide(0, false);
}

function getCarouselSlideCount() {
  return carouselTrack.querySelectorAll(".carousel-slide").length;
}

function showCarouselSlide(nextIndex, announce = true) {
  const slideCount = getCarouselSlideCount();
  if (!slideCount) return;

  carouselIndex = (nextIndex + slideCount) % slideCount;
  carouselTrack.style.setProperty("--carousel-index", carouselIndex);

  carouselTrack.querySelectorAll(".carousel-slide").forEach((slide, index) => {
    slide.setAttribute("aria-hidden", index === carouselIndex ? "false" : "true");
  });

  carouselDots.querySelectorAll(".carousel-dot").forEach((dot, index) => {
    const isCurrent = index === carouselIndex;
    dot.classList.toggle("is-current", isCurrent);
    dot.setAttribute("aria-current", isCurrent ? "true" : "false");
  });

  const activeCaption = CONFIG.photos[carouselIndex]?.caption;
  carouselStatus.textContent = `Fotografia ${carouselIndex + 1} di ${slideCount}${
    activeCaption ? ` — ${activeCaption}` : ""
  }`;

  if (announce) {
    carouselViewport.focus({ preventScroll: true });
  }
}

function stopCarouselAutoplay() {
  window.clearInterval(carouselAutoplayTimer);
  carouselAutoplayTimer = undefined;
}

function startCarouselAutoplay() {
  stopCarouselAutoplay();

  if (
    getCarouselSlideCount() < 2 ||
    document.hidden ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  carouselAutoplayTimer = window.setInterval(() => {
    showCarouselSlide(carouselIndex + 1, false);
  }, CAROUSEL_AUTOPLAY_DELAY);
}

function restartCarouselAutoplay() {
  stopCarouselAutoplay();
  startCarouselAutoplay();
}

function initializeCarouselInteractions() {
  carouselPrevious.addEventListener("click", () => {
    showCarouselSlide(carouselIndex - 1);
    restartCarouselAutoplay();
  });

  carouselNext.addEventListener("click", () => {
    showCarouselSlide(carouselIndex + 1);
    restartCarouselAutoplay();
  });

  carouselViewport.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    showCarouselSlide(carouselIndex + (event.key === "ArrowRight" ? 1 : -1), false);
    restartCarouselAutoplay();
  });

  carouselViewport.addEventListener("pointerdown", (event) => {
    carouselPointerStartX = event.clientX;
    carouselPointerStartY = event.clientY;
    carouselViewport.classList.add("is-dragging");
  });

  carouselViewport.addEventListener("pointerup", (event) => {
    if (carouselPointerStartX === undefined || carouselPointerStartY === undefined) return;

    const distanceX = event.clientX - carouselPointerStartX;
    const distanceY = event.clientY - carouselPointerStartY;

    if (Math.abs(distanceX) > 48 && Math.abs(distanceX) > Math.abs(distanceY)) {
      showCarouselSlide(carouselIndex + (distanceX < 0 ? 1 : -1), false);
      restartCarouselAutoplay();
    }

    carouselPointerStartX = undefined;
    carouselPointerStartY = undefined;
    carouselViewport.classList.remove("is-dragging");
  });

  carouselViewport.addEventListener("pointercancel", () => {
    carouselPointerStartX = undefined;
    carouselPointerStartY = undefined;
    carouselViewport.classList.remove("is-dragging");
  });

  photoCarousel.addEventListener("mouseenter", stopCarouselAutoplay);
  photoCarousel.addEventListener("mouseleave", startCarouselAutoplay);
  photoCarousel.addEventListener("focusin", stopCarouselAutoplay);
  photoCarousel.addEventListener("focusout", (event) => {
    if (!photoCarousel.contains(event.relatedTarget)) startCarouselAutoplay();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopCarouselAutoplay();
    } else {
      startCarouselAutoplay();
    }
  });
}

function getLocalISODate() {
  const now = new Date();
  const offsetInMilliseconds = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offsetInMilliseconds).toISOString().slice(0, 10);
}

function formatDateForMessage(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function createWhatsappUrl(date) {
  const cleanNumber = CONFIG.whatsappNumber.replace(/\D/g, "");
  const message = [
    CONFIG.whatsappMessage,
    "",
    `Programma: ${CONFIG.dateTitle}`,
    `Data scelta: ${formatDateForMessage(date)}`,
    "",
    "Per il luogo, l'organizzazione e tutto il resto mi affido a te.",
    "Puoi considerare la pratica approvata.",
  ].join("\n");

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

function updateWhatsappLink() {
  const chosenDate = dateInput.value;
  const isValidDate = chosenDate && chosenDate >= getLocalISODate();

  if (isValidDate) {
    whatsappLink.href = createWhatsappUrl(chosenDate);
    whatsappLink.setAttribute("aria-disabled", "false");
  } else {
    whatsappLink.removeAttribute("href");
    whatsappLink.setAttribute("aria-disabled", "true");
  }
}

function showView(view) {
  invitationView.hidden = true;
  successView.hidden = view !== successView;
  raincheckView.hidden = view !== raincheckView;
  view.classList.remove("is-entering");
  void view.offsetWidth;
  view.classList.add("is-entering");
  window.scrollTo({ top: 0, behavior: "smooth" });
  requestAnimationFrame(() => view.querySelector("h2")?.focus({ preventScroll: true }));
}

function createConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const fragment = document.createDocumentFragment();
  const colors = ["#791f2b", "#292522", "#c9aa78", "#f5efe3"];

  for (let index = 0; index < 42; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 320}ms`;
    piece.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    piece.style.setProperty("--turn", `${Math.random() * 780 - 390}deg`);
    fragment.appendChild(piece);
  }

  confetti.replaceChildren(fragment);
  window.setTimeout(() => confetti.replaceChildren(), 1800);
}

function resetDeclineForm() {
  declineForm.reset();
  formError.textContent = "";
  formStage.hidden = false;
  rulingStage.hidden = true;
  retryDeclineButton.hidden = false;
  raincheckButton.hidden = true;
  renderReasonOptions();
}

function resetExperience() {
  declineAttempts = 0;
  lastReasonIds = [];
  successView.hidden = true;
  raincheckView.hidden = true;
  invitationView.hidden = false;
  dateInput.value = "";
  dateFormError.textContent = "";
  updateWhatsappLink();
  resetDeclineForm();
  window.scrollTo({ top: 0, behavior: "smooth" });
  requestAnimationFrame(() => acceptButton.focus({ preventScroll: true }));
}

acceptButton.addEventListener("click", () => {
  showView(successView);
  createConfetti();
});

whatsappLink.addEventListener("click", (event) => {
  const chosenDate = dateInput.value;

  if (!chosenDate) {
    event.preventDefault();
    dateFormError.textContent = "Per protocollare la conferma devi scegliere un giorno.";
    dateInput.focus();
    return;
  }

  if (chosenDate < getLocalISODate()) {
    event.preventDefault();
    dateFormError.textContent = "La macchina del tempo non è disponibile: scegli una data futura.";
    dateInput.focus();
    return;
  }

  dateFormError.textContent = "";
  whatsappLink.href = createWhatsappUrl(chosenDate);
});

dateInput.addEventListener("input", () => {
  dateFormError.textContent = "";
  updateWhatsappLink();
});

declineButton.addEventListener("click", () => {
  resetDeclineForm();
  declineDialog.showModal();
});

closeDialogButton.addEventListener("click", () => declineDialog.close());

declineForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedReason = new FormData(declineForm).get("reason");

  if (!selectedReason) {
    formError.textContent = "Il modulo non può essere protocollato senza una motivazione.";
    declineForm.querySelector('input[name="reason"]')?.focus();
    return;
  }

  declineAttempts += 1;
  const ruling = rulings[Math.min(declineAttempts - 1, rulings.length - 1)];
  const selectedReasonTitle =
    declineReasons.find((reason) => reason.id === selectedReason)?.title ??
    "Motivazione non identificata";

  formError.textContent = "";
  formStage.hidden = true;
  rulingStage.hidden = false;
  declineForm.classList.remove("is-denied");
  void declineForm.offsetWidth;
  declineForm.classList.add("is-denied");
  rulingCounter.textContent = `Esito ${declineAttempts} di ${MAX_DECLINE_ATTEMPTS}`;
  rulingTitle.textContent = ruling.title;
  rulingMessage.textContent = `«${selectedReasonTitle}». ${ruling.message}`;

  const isFinalAttempt = declineAttempts >= MAX_DECLINE_ATTEMPTS;
  retryDeclineButton.hidden = isFinalAttempt;
  raincheckButton.hidden = !isFinalAttempt;
  requestAnimationFrame(() => {
    (isFinalAttempt ? raincheckButton : retryDeclineButton).focus();
  });
});

retryDeclineButton.addEventListener("click", () => {
  declineForm.reset();
  declineForm.classList.remove("is-denied");
  rulingStage.hidden = true;
  formStage.hidden = false;
  renderReasonOptions();
  requestAnimationFrame(() => declineForm.querySelector('input[name="reason"]')?.focus());
});

raincheckButton.addEventListener("click", () => {
  declineDialog.close();
  showView(raincheckView);
});

restartButtons.forEach((button) => button.addEventListener("click", resetExperience));

declineDialog.addEventListener("click", (event) => {
  if (event.target === declineDialog) {
    declineDialog.close();
  }
});

populateConfiguration();
renderCarousel();
initializeCarouselInteractions();
startCarouselAutoplay();

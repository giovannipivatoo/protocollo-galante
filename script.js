const CONFIG = {
  recipientName: "[IL SUO NOME]",
  senderName: "[IL TUO NOME]",
  dateTitle: "un aperitivo e una passeggiata",
  dateWhen: "[GIORNO E ORA]",
  dateWhere: "[LUOGO]",
  dateNote: "Vieni come sei. Al resto penso io.",
  whatsappNumber: "39XXXXXXXXXX",
  whatsappMessage:
    "Confermo ufficialmente: accetto l'invito. Puoi considerare la pratica approvata.",
};

const rulings = [
  {
    title: "Motivazione non abbastanza grave.",
    message:
      "Il calendario può essere consultato davanti a qualcosa di buono. L'istanza viene restituita al mittente.",
  },
  {
    title: "Carenza sanabile.",
    message:
      "Il richiedente si impegna formalmente a fornire snack adeguati. Il rifiuto perde quindi efficacia.",
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
const rulingStage = document.querySelector("#rulingStage");
const formError = document.querySelector("#formError");
const rulingCounter = document.querySelector("#rulingCounter");
const rulingTitle = document.querySelector("#rulingTitle");
const rulingMessage = document.querySelector("#rulingMessage");
const retryDeclineButton = document.querySelector("#retryDecline");
const raincheckButton = document.querySelector("#raincheckButton");
const whatsappLink = document.querySelector("#whatsappLink");
const confetti = document.querySelector("#confetti");
const restartButtons = document.querySelectorAll(".restart-button");

let declineAttempts = 0;

function populateConfiguration() {
  document.querySelectorAll("[data-config]").forEach((element) => {
    const key = element.dataset.config;
    if (Object.hasOwn(CONFIG, key)) {
      element.textContent = CONFIG[key];
    }
  });

  const cleanNumber = CONFIG.whatsappNumber.replace(/\D/g, "");
  whatsappLink.href = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    CONFIG.whatsappMessage,
  )}`;
  whatsappLink.target = "_blank";
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
}

function resetExperience() {
  declineAttempts = 0;
  successView.hidden = true;
  raincheckView.hidden = true;
  invitationView.hidden = false;
  resetDeclineForm();
  window.scrollTo({ top: 0, behavior: "smooth" });
  requestAnimationFrame(() => acceptButton.focus({ preventScroll: true }));
}

acceptButton.addEventListener("click", () => {
  showView(successView);
  createConfetti();
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

  formError.textContent = "";
  formStage.hidden = true;
  rulingStage.hidden = false;
  rulingCounter.textContent = `Esito ${declineAttempts} di ${rulings.length}`;
  rulingTitle.textContent = ruling.title;
  rulingMessage.textContent = ruling.message;

  const isFinalAttempt = declineAttempts >= rulings.length;
  retryDeclineButton.hidden = isFinalAttempt;
  raincheckButton.hidden = !isFinalAttempt;
  requestAnimationFrame(() => {
    (isFinalAttempt ? raincheckButton : retryDeclineButton).focus();
  });
});

retryDeclineButton.addEventListener("click", () => {
  declineForm.reset();
  rulingStage.hidden = true;
  formStage.hidden = false;
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

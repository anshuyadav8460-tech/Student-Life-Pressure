
// ==============================
// FOOTER YEAR
// ==============================
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ==============================
// MOBILE NAVIGATION
// ==============================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });
}


// ==============================
// STUDENT MESSAGE FORM
// ==============================
const messageForm = document.getElementById("messageForm");
const messageList = document.getElementById("messageList");

if (messageForm && messageList) {
  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nicknameInput = document.getElementById("nickname");
    const messageInput = document.getElementById("messageText");

    const nickname = nicknameInput.value.trim() || "A Student";
    const messageText = messageInput.value.trim();

    if (!messageText) {
      messageInput.focus();
      return;
    }

    if (messageText.length > 300 || nickname.length > 35) {
      return;
    }

    // Create elements safely without inserting raw HTML.
    const messageCard = document.createElement("article");
    messageCard.className = "message";

    const author = document.createElement("small");
    author.textContent = nickname;

    const message = document.createElement("p");
    message.textContent = messageText;

    messageCard.append(author, message);
    messageList.prepend(messageCard);

    messageForm.reset();
    messageInput.focus();
  });
}


// ==============================
// MONTHLY BUDGET CALCULATOR
// ==============================
const calculateButton = document.getElementById("calculate");
const budgetResult = document.getElementById("budgetResult");

if (calculateButton && budgetResult) {
  calculateButton.addEventListener("click", () => {
    const incomeInput = document.getElementById("income");
    const expensesInput = document.getElementById("expenses");

    const incomeText = incomeInput.value.trim();
    const expensesText = expensesInput.value.trim();

    budgetResult.className = "result";

    if (
      incomeText === "" ||
      expensesText === "" ||
      !Number.isFinite(Number(incomeText)) ||
      !Number.isFinite(Number(expensesText)) ||
      Number(incomeText) < 0 ||
      Number(expensesText) < 0
    ) {
      budgetResult.textContent =
        "Please enter valid, non-negative amounts in both fields.";
      budgetResult.classList.add("warning");
      return;
    }

    const income = Number(incomeText);
    const expenses = Number(expensesText);
    const balance = income - expenses;

    const formatRupees = (amount) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
      }).format(amount);

    if (balance > 0) {
      budgetResult.textContent =
        `Money left this month: ${formatRupees(balance)}. ` +
        "Consider saving some of it for future needs.";

      budgetResult.classList.add("success");
    } else if (balance === 0) {
      budgetResult.textContent =
        "Your budget is balanced. All available money is allocated.";

      budgetResult.classList.add("warning");
    } else {
      budgetResult.textContent =
        `You are short by ${formatRupees(Math.abs(balance))}. ` +
        "Review optional expenses and explore available student support.";

      budgetResult.classList.add("warning");
    }
  });
}


// ==============================
// BREATHING BREAK
// ==============================
const breakButton = document.getElementById("breakButton");
const breathMessage = document.getElementById("breathMessage");

if (breakButton && breathMessage) {
  breakButton.addEventListener("click", () => {
    const steps = [
      "Relax your shoulders. Breathe in gently.",
      "Now breathe out slowly. There is no need to rush.",
      "Take another comfortable breath and release the tension.",
      "Look around, relax your body and notice the present moment.",
      "You have taken a moment for yourself. That matters.",
      "Your reset is complete. Continue whenever you feel ready."
    ];

    let step = 0;

    breakButton.disabled = true;
    breakButton.textContent = "Take Your Time...";

    breathMessage.textContent = steps[step];

    const interval = window.setInterval(() => {
      step++;

      if (step < steps.length) {
        breathMessage.textContent = steps[step];
      } else {
        window.clearInterval(interval);

        breakButton.disabled = false;
        breakButton.textContent = "Take Another Break";
      }
    }, 5000);
  });
}

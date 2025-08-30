const categories = [
  "Income - Salary",
  "Income - Other",
  "Housing (Rent/EMI)",
  "Utilities",
  "Food & Groceries",
  "Transport",
  "Healthcare",
  "Entertainment",
  "Shopping",
  "Miscellaneous",
  "Savings & Investments"
];

const tbody = document.querySelector("#budget-table tbody");
categories.forEach(cat => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${cat}</td>
    <td contenteditable="true"></td>
    <td contenteditable="true"></td>
    <td></td>
  `;
  tbody.appendChild(row);
});

// Theme toggle
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      .then(() => console.log("Service Worker Registered"));
  });
}
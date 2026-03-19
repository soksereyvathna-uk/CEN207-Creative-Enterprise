// PRICING
let originalTotal = 80;
let total = 80;
let discountUsed = false;

// UPDATE UI
function updatePriceUI() {
  const priceBox = document.getElementById("priceBox");

  priceBox.innerHTML = `
    <div class="original">Original: $${originalTotal}</div>
    <div class="discounted">Total: $${total.toFixed(2)}</div>
  `;
}

// SHARED DISCOUNT LOGIC
function applyDiscountLogic(source) {
  if (discountUsed) {
    document.getElementById("status").innerText = "⚠️ Discount already applied";
    return;
  }

  total = originalTotal * 0.9;
  discountUsed = true;

  updatePriceUI();

  document.getElementById("status").innerText =
    source === "popup"
      ? "🎉 10% discount applied from reminder"
      : "✅ Discount code applied";
}

// MANUAL DISCOUNT
function applyDiscount() {
  const code = document.getElementById("discount").value;

  if (code === "SAVE10") {
    applyDiscountLogic("manual");
  } else {
    document.getElementById("status").innerText = "❌ Invalid code";
  }
}

// POPUP DISCOUNT
function applyPopupDiscount() {
  applyDiscountLogic("popup");
  closePopup();
}

// FORM
document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("success").style.display = "block";
});

// GUEST
function guestCheckout() {
  alert("🛒 Guest checkout activated!");
}

// CART ABANDONMENT
let timer;

function startTimer() {
  timer = setTimeout(() => {
    document.getElementById("popup").classList.remove("hidden");
  }, 8000);
}

function resetTimer() {
  clearTimeout(timer);
  startTimer();
}

window.onload = startTimer;
document.onmousemove = resetTimer;
document.onkeypress = resetTimer;

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}
"use strict";

const form = document.querySelector("#converter-form");
const input = document.querySelector("#temperature");
const unitSelect = document.querySelector("#unit");
const error = document.querySelector("#error");
const grid = document.querySelector("#result-grid");
const placeholder = document.querySelector("#placeholder");
const formula = document.querySelector("#formula");
const status = document.querySelector("#status");

function formatTemperature(value) {
  return Number(value.toFixed(4)).toLocaleString(undefined, { maximumFractionDigits: 4 });
}

function toCelsius(value, unit) {
  if (unit === "C") return value;
  if (unit === "F") return (value - 32) * 5 / 9;
  return value - 273.15;
}

function showError(message) {
  error.textContent = message;
  grid.hidden = true;
  formula.hidden = true;
  placeholder.hidden = false;
  placeholder.textContent = "Check the input above, then try again.";
  status.innerHTML = "<i></i> NEEDS ATTENTION";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  error.textContent = "";
  const raw = input.value.trim();
  const value = Number(raw);
  const unit = unitSelect.value;

  if (raw === "" || !Number.isFinite(value)) {
    showError("Please enter a valid numeric temperature.");
    input.focus();
    return;
  }

  const celsius = toCelsius(value, unit);
  if (celsius < -1e-10) {
    showError("This is below absolute zero. Enter a physically valid temperature (0 K or higher).");
    input.focus();
    return;
  }

  const c = Math.max(0, celsius);
  const f = c * 9 / 5 + 32;
  const k = c + 273.15;
  document.querySelector("#result-c").textContent = formatTemperature(c);
  document.querySelector("#result-f").textContent = formatTemperature(f);
  document.querySelector("#result-k").textContent = formatTemperature(k);
  grid.hidden = false;
  formula.hidden = false;
  placeholder.hidden = true;
  status.innerHTML = "<i></i> CONVERSION COMPLETE";
});

input.addEventListener("input", function () {
  if (error.textContent) error.textContent = "";
});

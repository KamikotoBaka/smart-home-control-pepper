var View = {
  updateButton: function(buttonId, state) {
    var btn = document.getElementById(buttonId);
    if(!btn) return;
    if(state === "ON") {
      btn.textContent = "EIN"; // Update button text to "EIN" when ON
      btn.classList.remove("btn-off");
      btn.classList.add("btn-on");
      btn.dataset.currentState = "ON";
    } else {
      btn.textContent = "AUS"; // Update button text to "AUS" when OFF
      btn.classList.remove("btn-on");
      btn.classList.add("btn-off");
      btn.dataset.currentState = "OFF";
    }
  }
};
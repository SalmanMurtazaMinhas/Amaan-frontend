// Create three buttons.
var happyButton = $("#happyButton");
var mehButton = $("#mehButton");
var sadButton = $("#sadButton");

// When a button is clicked, disable the other buttons.
function disableOtherButtons(button) {
  happyButton.prop("disabled", true);
  mehButton.prop("disabled", true);
  sadButton.prop("disabled", true);

  // Enable the button that was clicked.
  button.prop("disabled", false);
}

// Click event handler for the happy button.
happyButton.click(function() {
  disableOtherButtons(happyButton);
});

// Click event handler for the sad button.
mehButton.click(function() {
  disableOtherButtons(mehButton);
});

// Click event handler for the angry button.
sadButton.click(function() {
  disableOtherButtons(sadButton);
});
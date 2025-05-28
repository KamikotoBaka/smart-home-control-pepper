var buttonStates = {};
var IndexController = {
  init: function (buttonId, itemNames) {
    var btn = document.getElementById(buttonId);
    if (!btn) {
      console.warn("Button mit ID '" + buttonId + "' nicht gefunden.");
      return;
    }
    // Ensure itemNames is always an array
    if (!Array.isArray(itemNames)) {
      itemNames = [itemNames];
    }
    // Subscribe to all items for live updates
  itemNames.forEach(function(itemName) {
    OpenHAB.getState(itemName, function (state) {
      buttonStates[itemName] = state;
      updateGroupButtonState(buttonId, itemNames);
    });
    session.service("ALMemory").then(function (memory) {
      memory.subscriber(itemName + "_statusChanged").then(function (subscriber) {
        subscriber.signal.connect(function (newState) {
          buttonStates[itemName] = newState;
          updateGroupButtonState(buttonId, itemNames);
        });
      });
    });
  });
  
    btn.onclick = function () {
      var currentState = btn.dataset.currentState || "OFF";
      var newState = currentState === "ON" ? "OFF" : "ON";
      itemNames.forEach(function (itemName) {
        OpenHAB.sendCommand(itemName, newState);
      });
      btn.dataset.currentState = newState;
      View.updateButton(buttonId, newState); 
    };
  },
  
  initRolladen: function (buttonId, itemName, command, windowSensors) {
    var btn = document.getElementById(buttonId);
    if (!btn) {
      console.warn("Button mit ID '" + buttonId + "' nicht gefunden.");
      return;
    }
  
    // Set up the button to send the specific command
    btn.onclick = function () {
      if (command === "DOWN" && windowSensors && windowSensors.length > 0) {
        // Check the state of all window sensors
        var allClosed = true;
        for (var i = 0; i < windowSensors.length; i++) {
          OpenHAB.getState(windowSensors[i], function (state) {
            if (state === "OPEN") {
              allClosed = false;
            }
          });
        }
        // Delay to ensure all states are checked
        setTimeout(function () {
          if (allClosed) {
            // All windows are closed, send the DOWN command
            OpenHAB.sendCommand(itemName, command);
            console.log(`Command '${command}' sent to '${itemName}'`);
          } else {
            // At least one window is open, show a warning
            console.warn("Rolladen kann nicht herunterfahren, da ein Fenster geöffnet ist.");
            alert("Ein Fenster ist geöffnet. Bitte schließen Sie alle Fenster, bevor Sie den Rolladen herunterfahren.");
          }
        }, 1000); // Adjust delay if necessary
      } else {
        // For other commands (UP, STOP), or if no sensors are provided
        OpenHAB.sendCommand(itemName, command);
        console.log(`Command '${command}' sent to '${itemName}'`);
      }
    };
  },
  initHide: function (buttonId, lockItemName, rolladenItemName) {
    var btn = document.getElementById(buttonId);
    if (!btn) {
      console.warn("Button mit ID '" + buttonId + "' nicht gefunden.");
      return;
    }
    // Set up the button to toggle lock and roller shutters
    btn.onclick = function () {
      var currentState = btn.dataset.currentState || "OFF";
      var newState = currentState === "ON" ? "OFF" : "ON";

      if (newState === "ON") {
        // Lock the door and move the roller shutters down
        OpenHAB.sendCommand(lockItemName, "ON");
        OpenHAB.sendCommand(rolladenItemName, "DOWN");
        console.log(`Locking door (${lockItemName}) and moving roller shutters down (${rolladenItemName}).`);
      } else {
        // Unlock the door and move the roller shutters up
        OpenHAB.sendCommand(lockItemName, "OFF");
        OpenHAB.sendCommand(rolladenItemName, "UP");
        console.log(`Unlocking door (${lockItemName}) and moving roller shutters up (${rolladenItemName}).`);
      }
      // Update the button state
      btn.dataset.currentState = newState;
      View.updateButton(buttonId, newState);
    };
  },
  initMeeting: function (buttonId, rolladenItemName, lightItemName) {
    var btn = document.getElementById(buttonId);
    if (!btn) {
      console.warn("Button mit ID '" + buttonId + "' nicht gefunden.");
      return;
    }
    // Set up the button to toggle meeting mode
    btn.onclick = function () {
      var currentState = btn.dataset.currentState || "OFF";
      var newState = currentState === "ON" ? "OFF" : "ON";
      if (newState === "ON") {
        // Rolladen goes DOWN for 5 seconds and then STOP
        OpenHAB.sendCommand(rolladenItemName, "DOWN");
        console.log(`Rolladen (${rolladenItemName}) moving DOWN.`);
        setTimeout(function () {
          OpenHAB.sendCommand(rolladenItemName, "STOP");
          console.log(`Rolladen (${rolladenItemName}) stopped.`);
          //OpenHAB.sendCommand(lightItemName, "ON");
        }, 10000);
        // Turn the light ON
        OpenHAB.sendCommand(lightItemName, "ON");
        console.log(`Light (${lightItemName}) turned ON.`);
      } else if (newState === "OFF") {
        // Rolladen goes UP
        OpenHAB.sendCommand(rolladenItemName, "UP");
        console.log(`Rolladen (${rolladenItemName}) moving UP.`);
        // Turn the light OFF
        OpenHAB.sendCommand(lightItemName, "OFF");
        console.log(`Light (${lightItemName}) turned OFF.`);
      }
      // Update the button state
      btn.dataset.currentState = newState;
      View.updateButton(buttonId, newState);
    };
  },
   initReset: function (buttonId, rolladenItems, lightItems, coffeeItem, radioItem, hideItem, ventilationItem, LinkingParkItem, movieNightItem, speakerItems) {
    var btn = document.getElementById(buttonId);
    if (!btn) {
      console.warn("Button mit ID '" + buttonId + "' nicht gefunden.");
      return;
    }
    // Set up the button to reset everything
    btn.onclick = function () {
      console.log("Resetting all devices...");
      // Turn off all lights
      lightItems.forEach(function (lightItem) {
        OpenHAB.sendCommand(lightItem, "OFF");
        console.log(`Light (${lightItem}) turned OFF.`);
      });
      // Move all roller shutters up
      rolladenItems.forEach(function (rolladenItem) {
        OpenHAB.sendCommand(rolladenItem, "UP");
        console.log(`Rolladen (${rolladenItem}) moving UP.`);
      });
      // Turn off the coffee machine
      OpenHAB.sendCommand(coffeeItem, "OFF");
      console.log(`Coffee machine (${coffeeItem}) turned OFF.`);
      // Turn off the radio
      OpenHAB.sendCommand(radioItem, "OFF");
      console.log(`Radio (${radioItem}) turned OFF.`);
      // Unlock the smart lock
      OpenHAB.sendCommand(hideItem, "OFF");
      console.log(`Smart lock (${hideItem}) unlocked.`);
      // Turn off the fan
      OpenHAB.sendCommand(ventilationItem, "OFF");
      console.log(`Fan (${fanItem}) turned OFF.`);
      // Stop the music on all speakers
      LinkingParkItem.forEach(function (LinkingParkItem) {
      OpenHAB.sendCommand(LinkingParkItem, "OFF");
      console.log(`Music (${LinkingParkItem}) stopped.`);
      });
      // Turn off the TV
      OpenHAB.sendCommand(movieNightItem, "OFF");
      console.log(`TV (${movieNightItem}) turned OFF.`);
      // Stop the music on all speakers
      speakerItems.forEach(function (speakerItem) {
        OpenHAB.sendCommand(speakerItem, "STOP");
        console.log(`Speaker (${speakerItem}) stopped.`);
      });
      console.log("All devices reset.");
    };
  },
  initColorLight: function (buttonId, inputId, itemName) {
    var btn = document.getElementById(buttonId);
    var colorInput = document.getElementById(inputId);
    if (!btn || !colorInput) {
      console.warn(`Button with ID '${buttonId}' or input with ID '${inputId}' not found.`);
      return;
    }
    // Set up the button to change the light color
    btn.onclick = function () {
      // Get the selected color from the input
      var hexColor = colorInput.value; // e.g., "#ff0000"
      // Convert HEX to HSB
      var hsb = hexToHsb(hexColor);
      // Construct HSB value as a string
      var hsbValue = `${hsb.h},${hsb.s},${hsb.b}`;
      console.log(`Setting color for ${itemName} to HSB: ${hsbValue}`);
      // Send the HSB value to the light
      OpenHAB.sendCommand(itemName, hsbValue);
    };
  },
  initLaborColorLight: function (buttonId, inputId, itemNames) {
  var btn = document.getElementById(buttonId);
  var colorInput = document.getElementById(inputId);
  if (!btn || !colorInput) {
    console.warn(`Button with ID '${buttonId}' or input with ID '${inputId}' not found.`);
    return;
  }
  btn.onclick = function () {
    var hexColor = colorInput.value;
    var hsb = hexToHsb(hexColor);
    var hsbValue = `${hsb.h},${hsb.s},${hsb.b}`;
    itemNames.forEach(function (itemName) {
      OpenHAB.sendCommand(itemName, hsbValue);
      console.log(`Setting color for ${itemName} to HSB: ${hsbValue}`);
    });
  };
  },
  initLightBrightness: function (buttonId, inputId, itemName) {
    var btn = document.getElementById(buttonId);
    var brightnessInput = document.getElementById(inputId);
    if (!btn || !brightnessInput) {
      console.warn(`Button with ID '${buttonId}' or input with ID '${inputId}' not found.`);
      return;
    }
    // Set up the button to change the light brightness
    btn.onclick = function () {
      // Get the brightness value from the input
      var brightness = brightnessInput.value; // Value between 0 and 100
      // Validate the brightness value
      brightness = Math.max(0, Math.min(100, parseInt(brightness, 10)));
      console.log(`Setting brightness for ${itemName} to: ${brightness}`);
      // Send the brightness value to the light
      OpenHAB.sendCommand(itemName, brightness.toString());
    };
  },
  initLaborLightBrightness: function (buttonId, inputId, itemNames) {
  var btn = document.getElementById(buttonId);
  var brightnessInput = document.getElementById(inputId);
  if (!btn || !brightnessInput) {
    console.warn(`Button with ID '${buttonId}' or input with ID '${inputId}' not found.`);
    return;
  }
  btn.onclick = function () {
    var brightness = brightnessInput.value;
    brightness = Math.max(0, Math.min(100, parseInt(brightness, 10)));
    itemNames.forEach(function (itemName) {
      OpenHAB.sendCommand(itemName, brightness.toString());
      console.log(`Setting brightness for ${itemName} to: ${brightness}`);
    });
  };
  },
  
  initPartyMode: function (buttonId, speakerAPIs, mp3Sound) {
    var btn = document.getElementById(buttonId);
    if (!btn) {
      console.warn(`Button with ID '${buttonId}' not found.`);
      return;
    }
    // Set up the button to toggle party mode
    btn.onclick = function () {
      var currentState = btn.dataset.currentState || "OFF";
      var newState = currentState === "ON" ? "OFF" : "ON";
      if (newState === "ON") {
        // Play the MP3 sound on all speakers
        speakerAPIs.forEach(function (speakerAPI) {
          OpenHAB.sendCommand(speakerAPI, mp3Sound);
          console.log(`Playing sound on ${speakerAPI}: ${mp3Sound}`);
        });
      } else {
        // Stop the music on all speakers
        speakerAPIs.forEach(function (speakerAPI) {
          OpenHAB.sendCommand(speakerAPI, "STOP");
          console.log(`Stopping music on ${speakerAPI}`);
        });
      }
      // Update the button state
      btn.dataset.currentState = newState;
      View.updateButton(buttonId, newState);
    };
  }
};
function updateGroupButtonState(buttonId, itemNames) {
  // All ON logic:
  var allOn = itemNames.every(item => buttonStates[item] === "ON");
  View.updateButton(buttonId, allOn ? "ON" : "OFF");
}
function hexToHsb(hex) {
  // Remove the "#" if present
  hex = hex.replace("#", "");

  // Convert HEX to RGB
  var r = parseInt(hex.substring(0, 2), 16) / 255;
  var g = parseInt(hex.substring(2, 4), 16) / 255;
  var b = parseInt(hex.substring(4, 6), 16) / 255;

  // Calculate HSB
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var delta = max - min;

  var h = 0;
  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  var s = max === 0 ? 0 : Math.round((delta / max) * 100);
  var b = Math.round(max * 100);

  return { h, s, b };
}
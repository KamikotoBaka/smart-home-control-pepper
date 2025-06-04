function toggleDarkMode() {
  const body = document.body;
  const darkModeButton = document.getElementById("darkModeToggle");
  if(!darkModeButton) {
    console.warn("Dark Mode button not found.");
    return;
  }
  console.log("Toggling dark mode...");
  body.classList.toggle("dark-mode");
  if(body.classList.contains("dark-mode")) {
    darkModeButton.textContent = "Dark Mode AUS";
    console.log("Dark mode enabled.");
  } else {
    darkModeButton.textContent = "Dark Mode EIN";
    console.log("Dark mode disabled.");
  }
}

function bootstrap() {
   // Initialize Dark Mode button
   const darkModeButton = document.getElementById("darkModeToggle");
   if(darkModeButton) {
     darkModeButton.addEventListener("click", toggleDarkMode);
     console.log("Dark Mode button initialized.");
   } else {
     console.warn("Dark Mode button not found.");
   }
  var windowSensorsKonferenz2 =[
      "iKonferenz_Homematic_Fenster1_Position",
      "iKonferenz_Homematic_Fenster2_Position",
      "iKonferenz_Homematic_Fenster3_Position",
  ];
  var windowSensorsKonferenz1 =[
    "iKonferenz_Homematic_Fenster4_Position",
    "iKonferenz_Homematic_Fenster5_Position",
    "iKonferenz_Homematic_Fenster6_Position",
];
var windowSensorsMultimedia =[
  "iMultimedia_Homematic_Fenster1_Position",
  "iMultimedia_Homematic_Fenster2_Position",
  "iMultimedia_Homematic_Fenster3_Position",
];
  // ROLLADEN
  IndexController.initRolladen("rolladenRunter", "iKonferenz_Somfy_Rollladen2_Steuerung", "DOWN", windowSensorsKonferenz1);
  IndexController.initRolladen("rolladenStopp", "iKonferenz_Somfy_Rollladen2_Steuerung", "STOP");
  IndexController.initRolladen("rolladenHoch", "iKonferenz_Somfy_Rollladen2_Steuerung", "UP");
  IndexController.initRolladen("rolladenKonferenz2Runter", "iKonferenz_Somfy_Rollladen1_Steuerung", "DOWN", windowSensorsKonferenz2);
  IndexController.initRolladen("rolladenKonferenz2Stopp", "iKonferenz_Somfy_Rollladen1_Steuerung", "STOP");
  IndexController.initRolladen("rolladenKonferenz2Hoch", "iKonferenz_Somfy_Rollladen1_Steuerung", "UP");
  IndexController.initRolladen("rolladenMultimediaRunter", "iMultimedia_Somfy_Rollladen_Steuerung", "DOWN", windowSensorsMultimedia);
  IndexController.initRolladen("rolladenMultimediaStopp", "iMultimedia_Somfy_Rollladen_Steuerung", "STOP");
  IndexController.initRolladen("rolladenMultimediaHoch", "iMultimedia_Somfy_Rollladen_Steuerung", "UP");

  //HIDE
  IndexController.initHide("hideToggle", "iKonferenz_DanaLock_Tuerschloss_Schloss", "iKonferenz_Somfy_Rollladen2_Steuerung");

  //MEETING
  IndexController.initMeeting("startMeetingToggle", "iKonferenz_Somfy_Rollladen2_Steuerung", "iKueche_Hue_Lampen_Schalter");
  
  //LIGHTCOLOR
  
  var lightColorAPIs = {
    Multimedia: "iMultimedia_Hue_Lampen_Farbe",
    Kueche: "iKueche_Hue_Lampen_Farbe",
    Bad: "iBad_Hue_Lampen_Farbe",
    IoT: "iIoT_Hue_Lampen_Farbe"
  };
  IndexController.initColorLight("setBadLightColor", "badLightColor", lightColorAPIs.Bad);
  IndexController.initColorLight("setKuecheLightColor", "kuecheLightColor", lightColorAPIs.Kueche);
  IndexController.initColorLight("setIoTLightColor", "iotLightColor", lightColorAPIs.IoT);
  IndexController.initColorLight("multimediaLichtFarbe", "multimediaLightColor", lightColorAPIs.Multimedia);

  //LIGHT BRIGHTNESS
    var lightBrightnessAPIs = {
    Kueche: "iKueche_Hue_Lampen_Helligkeit",
    Bad: "iBad_Hue_Lampen_Helligkeit",
    IoT: "iIoT_Hue_Lampen_Helligkeit",
    Multimedia: "iMultimedia_Hue_Lampen_Helligkeit"
  };
  //LIGHT BRIGHTNESS LABOR
  var laborBrightnessAPIs = [
  "iKueche_Hue_Lampen_Helligkeit",
  "iBad_Hue_Lampen_Helligkeit",
  "iIoT_Hue_Lampen_Helligkeit",
  "iMultimedia_Hue_Lampen_Helligkeit"
  ];
  IndexController.initLaborLightBrightness("setLaborLightBrightness", "laborLightBrightness", laborBrightnessAPIs);

  //Party Mode
  var speakerAPIs = [
    "iKueche_Sonos_Lautsprecher_URIspielen",
    "iBad_Sonos_Lautsprecher_URIspielen",
    "iIoT_Sonos_Lautsprecher_URIspielen",
    "iMultimedia_Sonos_Lautsprecher_URIspielen"
  ];
  var mp3Sound = "//192.168.0.10/medialib/Audio/Queen/DontStopMeNow.mp3";
  IndexController.initPartyMode("partyToggle", speakerAPIs, mp3Sound);

  // Initialize brightness change buttons for each light
  IndexController.initLightBrightness("setKuecheLightBrightness", "kuecheLightBrightness", lightBrightnessAPIs.Kueche);
  IndexController.initLightBrightness("setBadLightBrightness", "badLightBrightness", lightBrightnessAPIs.Bad);
  IndexController.initLightBrightness("setIoTLightBrightness", "iotLightBrightness", lightBrightnessAPIs.IoT);
  IndexController.initLightBrightness("setMultimediaLightBrightness", "multimediaLightBrightness", lightBrightnessAPIs.Multimedia);
  //LIGHT COLOR LABOR
  var laborColorAPIs = [
  "iKueche_Hue_Lampen_Farbe",
  "iBad_Hue_Lampen_Farbe",
  "iIoT_Hue_Lampen_Farbe",
  "iMultimedia_Hue_Lampen_Farbe"
  ];
  IndexController.initLaborColorLight("setLaborLightColor", "laborLightColor", laborColorAPIs);
  //ALL Items
  var items = {
    lichtToggleKueche: ["iKueche_Hue_Lampen_Schalter","iKueche_Osram_LEDStreifen_Schalter"],
    lichtToggleBad: ["iBad_Hue_Lampen_Schalter","iBad_Osram_LEDStreifen_Schalter", "iBad_Hue_BloomLampen_Schalter"],
    lichtToggleIoT: ["iIoT_Hue_Lampen_Schalter","iIoT_Hue_IrisLampen_Schalter", "iIoT_Hue_LEDStreifen_Schalter"],
    lichtToggleMultimedia: ["iMultimedia_Hue_Lampen_Schalter","iMultimedia_Hue_LEDStreifen_Schalter", "iMultimedia_Hue_GOLampen_Schalter"],
    lichtToggleLabor: ["iKueche_Hue_Lampen_Schalter", "iKueche_Osram_LEDStreifen_Schalter",
    "iBad_Hue_Lampen_Schalter", "iBad_Osram_LEDStreifen_Schalter", "iBad_Hue_BloomLampen_Schalter", 
    "iIoT_Hue_Lampen_Schalter", "iIoT_Hue_IrisLampen_Schalter", "iIoT_Hue_LEDStreifen_Schalter",
    "iMultimedia_Hue_Lampen_Schalter", "iMultimedia_Hue_LEDStreifen_Schalter", "iMultimedia_Hue_GOLampen_Schalter"],
    LinkingParkToggle: ["iKueche_Audio_Medialib_Morgenroutine_WhatIveDoneLinkinPark", "iBad_Audio_Medialib_Morgenroutine_WhatIveDoneLinkinPark", 
    "iIoT_Audio_Medialib_Morgenroutine_WhatIveDoneLinkinPark", "iMultimedia_Audio_Medialib_Morgenroutine_WhatIveDoneLinkinPark", "iKonferenz_Audio_Medialib_Morgenroutine_WhatIveDoneLinkinPark"],
    coffeeToggle: "iKueche_Miele_Kaffeemaschine_Start",
    ventilationToggle : "iKonferenz_RaumluftreinigerMQTT2_Schalten",
    radioToggle: "iKonferenz_Audio_Medialib_BuenaVistaSocialClub_BuenaVistaSocialClubDosGardenias",
    morningroutinToggle: ["iKueche_Miele_Kaffeemaschine_Start", "iKonferenz_RaumluftreinigerMQTT2_Schalten"],
    movieNightToggle: "iMultimedia_SmartTV_Power",
    energySaveToggle: ["iKonferenz_Homematic_Luefter_Schalten", "iIoT_Homematic_Multitouchtisch_Schalten"]
  };

  //RESET
  var rolladenItems = [
    "iKonferenz_Somfy_Rollladen2_Steuerung",
    "iKonferenz_Somfy_Rollladen1_Steuerung",
    "iMultimedia_Somfy_Rollladen_Steuerung"
  ];
  var lightItems = [
    "iKueche_Hue_Lampen_Schalter",
    "iBad_Hue_Lampen_Schalter",
    "iBad_Hue_BloomLampen_Schalter",
    "iIoT_Hue_Lampen_Schalter",
    "iIoT_Hue_IrisLampen_Schalter",
    "iMultimedia_Hue_Lampen_Schalter",
    "iMultimedia_Hue_GOLampen_Schalter"
  ];
  var coffeeItem = "iKueche_Miele_Kaffeemaschine_Start";
  var radioItem = "iKonferenz_Audio_Medialib_BuenaVistaSocialClub_BuenaVistaSocialClubDosGardenias";
  var hideItem = "iKonferenz_DanaLock_Tuerschloss_Schloss";
  var ventilationItem = "iKonferenz_RaumluftreinigerMQTT2_Schalten";
  var LinkingParkItem = [
    "iKueche_Audio_Medialib_Morgenroutine_WhatIveDoneLinkinPark",
    "iBad_Audio_Medialib_Morgenroutine_WhatIveDoneLinkinPark",
    "iIoT_Audio_Medialib_Morgenroutine_WhatIveDoneLinkinPark",
    "iMultimedia_Audio_Medialib_Morgenroutine_WhatIveDoneLinkinPark",
    "iKonferenz_Audio_Medialib_Morgenroutine_WhatIveDoneLinkinPark"
  ];
  var speakerItems = [
    "iKueche_Sonos_Lautsprecher_URIspielen",
    "iBad_Sonos_Lautsprecher_URIspielen",
    "iIoT_Sonos_Lautsprecher_URIspielen",
    "iMultimedia_Sonos_Lautsprecher_URIspielen"
  ];
  var movieNightItem = "iMultimedia_SmartTV_Power";
   // Initialize the reset button
  IndexController.initReset("resetToggle", rolladenItems, lightItems, coffeeItem, radioItem, hideItem, ventilationItem, LinkingParkItem, movieNightItem, speakerItems);


  Object.keys(items).forEach(function(buttonId) {
    IndexController.init(buttonId, items[buttonId]);
  });
}

  window.session = new QiSession();

  window.onload = bootstrap;


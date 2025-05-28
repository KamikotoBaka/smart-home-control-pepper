# Pepper Tablet Smart Home UI

This is the **frontend web interface** designed to run in the **WebView** of the **Pepper robot's tablet**.  
It enables **manual control** of a smart home environment through an intuitive and responsive UI.

The UI works in parallel with voice control and communicates with the OpenHAB server using a REST API.

---

## 🖥️ Overview

- 🌐 Runs in Pepper’s built-in Android WebView (Android 5.1 / WebView 46–48)
- 🏠 Sends control commands to OpenHAB (e.g., lights, blinds, plugs)
- 🔄 Receives real-time status updates

---

## 📋 Features

- 📱 **Touch-based Smart Home Control**  
  Toggle lights, control blinds, start predefined scenarios like "Start Meeting", etc.


- ⚙️ **Modular MVC Structure**  
  Clean separation between UI (HTML/CSS), controller logic (JavaScript), and OpenHAB communication (REST API model).

---

### Upload the UI to Pepper

Use **SSH** to connect to your Pepper robot and upload the UI directory:

```bash
scp -r ./smart-home-ui nao@<pepper-ip>:/home/nao/

Replace <pepper-ip> with your robot's IP address.

You should now have the UI at:
/home/nao/smart-home-ui/


Launch the UI with PepperControl.py
Use your Python control script to open the WebView with the correct file path:

ALTabletService.showWebView("file:///home/nao/smart-home-ui/views/index.html")

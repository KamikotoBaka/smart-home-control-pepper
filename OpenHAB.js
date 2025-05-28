var OpenHAB = {
  baseUrl: "http://192.168.0.5:8080/rest",

  sendCommand: function (itemName, command) {
    var url = this.baseUrl + "/items/" + itemName;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.send(command);
  },

  getState: function (itemName, callback) {
    var url = this.baseUrl + "/items/" + itemName;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data.state);
      }
    };
    xhr.send();
  }
};
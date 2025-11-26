const express = require("express");
const path = require("path");
const app = express();

// renderer klasörünü servis et
app.use(express.static(path.join(__dirname, "renderer")));

app.listen(3000, "0.0.0.0", () => {
  console.log("Web arayüzü http://0.0.0.0:3000 adresinde çalışıyor");
});

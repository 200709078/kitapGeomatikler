const express = require("express");
const app = express();
const PORT = 3000;

// public klasörünü statik olarak aç
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(`Uygulama çalışıyor → http://localhost:${PORT}`);
});

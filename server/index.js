const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;
const TRACKS_DIR = path.join(__dirname, "tracks");

app.use(cors());

app.get("/tracks", (req, res) => {
  const files = fs.readdirSync(TRACKS_DIR).filter(file => file.endsWith(".mp3"));
  const tracks = files.map(file => ({
    name: path.basename(file, ".mp3"),
    url: `http://localhost:${PORT}/stream/${file}`,
  }));
  res.json(tracks);
});

app.get("/stream/:filename", (req, res) => {
  const filePath = path.join(TRACKS_DIR, req.params.filename);
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
    "Content-Type": "audio/mpeg",
    "Content-Length": stat.size,
  });

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

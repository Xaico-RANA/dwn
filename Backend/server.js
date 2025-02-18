const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/download", (req, res) => {
    const videoUrl = req.body.url;
    if (!videoUrl) return res.status(400).json({ error: "URL is required" });

    exec(`yt-dlp -f best -g "${videoUrl}"`, (error, stdout, stderr) => {
        if (error) return res.status(500).json({ error: stderr });
        res.json({ downloadUrl: stdout.trim() });
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));

const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

const PORT = 5000;
// const RTSP_URL = "rtsp://localhost:8554/live";
const RTSP_URL = "rtsp://13.60.76.79:8554/live3";
const STREAMS_DIR = path.join(__dirname, "streams");


for (let i = 1; i <= 6; i++) {
  const dir = path.join(STREAMS_DIR, `stream${i}`);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}


for (let i = 1; i <= 6; i++) {
  const output = path.join(STREAMS_DIR, `stream${i}`, "stream.m3u8");

  const ffmpegArgs = [
    "-rtsp_transport", "tcp",
    "-i", RTSP_URL,
    "-c:v", "copy",
    "-c:a", "copy",
    "-f", "hls",
    "-hls_time", "2",
    "-hls_list_size", "6",
    "-hls_flags", "delete_segments",
    output
  ];

  const ffmpegProcess = spawn("ffmpeg", ffmpegArgs);

  ffmpegProcess.stderr.on("data", (data) => {
    console.log(`Stream${i}: ${data.toString()}`);
  });

  ffmpegProcess.on("close", (code) => {
    console.log(`Stream${i} exited with code ${code}`);
  });
}

app.use("/streams", express.static(STREAMS_DIR));

app.get("/", (req, res) => {
  res.send("RTSP → HLS Backend running. Streams available at /streams/stream1/stream.m3u8");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

# 🎥 Multi-View Video Streaming Dashboard
RTSP → HLS Conversion | 6-Stream Simulation | Synchronized React Player | FFmpeg + MediaMTX + Node.js Backend

This project is a multi-view monitoring dashboard that converts a single RTSP source into multiple HLS streams, then displays them in a synchronized 6-player grid built using React.

The dashboard layout is inspired by:

👉 [https://monitor.theun1t.com/](https://monitor.theun1t.com/)
🚀 Features
### 🔁 RTSP → HLS Conversion

Converts an RTSP live feed into HLS (*.m3u8) playlists.

Streams are continuously updated and segmented.

Supports low-latency configuration and auto-cleanup.

### 🔀 6 Simulated HLS Streams

From one RTSP source, 6 independent HLS streams are created:
```bash
stream1/stream.m3u8  
stream2/stream.m3u8  
stream3/stream.m3u8  
stream4/stream.m3u8  
stream5/stream.m3u8  
stream6/stream.m3u8
```


Each stream is generated using FFmpeg in parallel.

### 🎛 React Multi-View Dashboard

Displays all 6 streams in a responsive grid (2×3 layout).

Uses hls.js for smooth HLS playback in browsers.

Automatically attempts playback synchronization.

### ⚙️ Synchronization Logic

Ensures each player:

Waits until metadata is loaded.

Seeks all players to the same timestamp.

Plays simultaneously with near-zero drift.

### 🌐 Backend Streaming Server

Built with Node.js + Express

Runs 6 FFmpeg processes to continuously generate HLS.

Exposes /streams/* for public access.

## 🧩 Architecture Overview
```
        ┌──────────────────────────┐
        │        RTSP Source       │
        │  (camera / MediaMTX)     │
        └─────────────┬────────────┘
                      │
               FFmpeg (×6)
                      │
       ┌──────────────┼─────────────────┐
       │     HLS Streams (6x)           │
       │ stream1/stream.m3u8            │
       │ stream2/stream.m3u8            │
       │ ...                            │
       └──────────────┬─────────────────┘
                      │
               React Dashboard
                      │
               hls.js Video Players
```

## 🛠 Tools Used
FFmpeg

Used to convert RTSP into multiple HLS stream outputs.

MediaMTX (optional)

Used as RTSP server to feed RTSP → HLS conversion.

Node.js Backend

Spawns FFmpeg processes

Serves HLS files via static hosting

React + hls.js

Frontend UI

HLS playback support

Synchronization logic

## 🔁 RTSP → HLS Conversion Process
1. RTSP Input

A single RTSP URL is used:
```bash
rtsp://13.60.76.79:8554/live3
```

2. FFmpeg Processing

Each FFmpeg instance generates one HLS playlist with:

Segment length: 2 sec

Playlist size: 6 segments

Auto-delete old segments using hls_flags=delete_segments

```bash
Example FFmpeg command:
ffmpeg -rtsp_transport tcp -i rtsp://localhost:8554/live \
 -c:v copy -c:a copy \
 -f hls -hls_time 2 -hls_list_size 6 -hls_flags delete_segments \
 Backend/streams/stream1/stream.m3u8
```


This runs 6 times to create 6 separate HLS streams.
```bash
📦 Backend Directory Structure
Backend/
│ server.js
│ package.json
│ sample.mp4 (optional local input)
│
└── streams/
    ├── stream1/stream.m3u8
    ├── stream2/stream.m3u8
    ├── stream3/stream.m3u8
    ├── stream4/stream.m3u8
    ├── stream5/stream.m3u8
    └── stream6/stream.m3u8
```

## 🧠 How Synchronization Works

Each video player:

1. Loads but does NOT auto-play
2. Once all 6 players fire loadedmetadata

We fetch the latest timestamp among all players.

3. Seek all players to that timestamp

Ensures equal start point.

4. Call play() on all players simultaneously.

This results in near-perfect alignment across 6 video players.

## 🖥 React Frontend
Technologies:

React (functional components)

hls.js

Tailwind CSS

Layout:

Responsive CSS grid (2×3 or 3×2)

Auto resizes on different screen sizes

Real-time synchronization

## 🚀 Setup & Installation
### 🔧 1. Clone Repository
```bash
git clone https://github.com/yourusername/VideoStreamingDashboard
cd VideoStreamingDashboard
```

### 🖥 Backend Setup

Go to backend folder:

cd Backend
```bash
npm install
```


Start backend:
```bash
npm start
```


Your backend will run at:
```bash
http://localhost:5000
```


HLS streams will be available at:
```bash
http://localhost:5000/streams/stream1/stream.m3u8
...
http://localhost:5000/streams/stream6/stream.m3u8
```

## 🎨 Frontend Setup

Go to frontend folder:

cd Frontend
```bash
npm install
```


Start app:
```bash 
npm start 
```

Frontend runs at: 
```bash 
http://localhost:3000
```


## 🌍 Deployment Guide
Backend Deployment (Render)

Choose Web Service

Root Directory: `Backend`

Build Command: `npm install`

Start Command: `npm start`

Set environment variables if using .env

Frontend Deployment (Vercel)

Import GitHub repo

Root Directory: `Frontend`

Build Command: `npm run build`

Output Directory: `build`

# 📸 Screenshot

![App Screenshot](https://github.com/nitish052002/VideoStreamingDashboard/blob/main/Capture.PNG)

# 🎥 Multi-View Video Streaming Dashboard
RTSP → HLS Conversion | 6-Stream Simulation | Synchronized React Player | FFmpeg + MediaMTX + Node.js Backend

This project is a multi-view monitoring dashboard that converts a single RTSP source into multiple HLS streams, then displays them in a synchronized 6-player grid built using React.

The dashboard layout is inspired by:

👉 [https://monitor.theun1t.com/](https://monitor.theun1t.com/)

## 🎥 RTSP → HLS Conversion Flow

```bash
RTSP Camera
     ↓
MediaMTX (RTSP Server)
     ↓
Node.js Backend (FFmpeg Workers)
     ↓
6× HLS Streams (.m3u8)
     ↓
React Video Player Grid
```


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

## 🖥 Backend Setup

### Install dependencies

```bash
cd Backend
npm install
```

### Create .env

```bash
RTSP_URL=rtsp://your-camera-url
PORT=5000
```

### Run backend

## Development:

```bash
npm start
```


### Production:

```bash
node server.js
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

### Backend Deployment (Render)

Choose Web Service

- Root Directory: `Backend`

- Build Command: `npm install`

- Start Command: `npm start`

- Set environment variables if using .env

### Frontend Deployment (Vercel)

- Import GitHub repo

- Root Directory: `Frontend`

- Build Command: `npm run build`

- Output Directory: `build`



## 👉 (Render + Netlify)
### ✓ Backend (Node.js) – Render

Live URL:
- 👉 [https://videostreamingdashboard.onrender.com](https://videostreamingdashboard.onrender.com)

### ✓ Frontend (React) – Netlify

Live URL:
- 👉 [https://strdashboardnitish.netlify.app/](https://strdashboardnitish.netlify.app/)

<br /><br />

# 🛠️ Tech Stack

## 🎨 Frontend
<!-- React --> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <!-- TypeScript --> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /> <!-- HTML --> <img src="https://img.shields.io/badge/HTML5-e34c26?style=for-the-badge&logo=html5&logoColor=white" /> <!-- CSS --> <img src="https://img.shields.io/badge/CSS3-1572b6?style=for-the-badge&logo=css3&logoColor=white" /> <!-- Tailwind --> <img src="https://img.shields.io/badge/Tailwind_CSS-0ea5e9?style=for-the-badge&logo=tailwindcss&logoColor=white" /> <!-- React Icons --> <img src="https://img.shields.io/badge/React_Icons-E91E63?style=for-the-badge&logo=react&logoColor=white" />

<br /><br />

## ⚙️ Backend
<!-- Node --> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" /> <!-- Express --> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> <!-- CORS --> <img src="https://img.shields.io/badge/CORS-7D4698?style=for-the-badge&logo=cors&logoColor=white" /> <!-- Dotenv --> <img src="https://img.shields.io/badge/Dotenv-ecd53f?style=for-the-badge&logo=dotenv&logoColor=black" /> <!-- FFmpeg --> <img src="https://img.shields.io/badge/FFmpeg-007808?style=for-the-badge&logo=ffmpeg&logoColor=white" /> <!-- MediaMTX --> <img src="https://img.shields.io/badge/MediaMTX-4A90E2?style=for-the-badge&logo=streamlabs&logoColor=white" />

<br /><br />
 



# 📸 Screenshot

![App Screenshot](https://github.com/nitish052002/VideoStreamingDashboard/blob/main/Capture.PNG)



## 🎯 Features Overview

### - 🔴 Real live RTSP camera streaming

### - 🎬 Automatic RTSP → HLS conversion

### - 🎞️ Six synchronized video players

### - ⚡ Low-latency 2-second HLS

### - 📦 Easy deployment on Render

### - 💻 Fully responsive grid layout

<br /><br />
# 🎖️ Author

### 👨‍💻 Nitish Sharma
Full-Stack & Frontend Developer

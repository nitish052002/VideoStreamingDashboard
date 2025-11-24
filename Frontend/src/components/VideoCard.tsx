import {
  IoPlayOutline,
  IoPauseOutline,
  IoVolumeMuteOutline,
  IoVolumeHighOutline,
} from "react-icons/io5";
import { GoScreenFull } from "react-icons/go";
import { GoBroadcast } from "react-icons/go";
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  src: string;
}




const VideoCard: React.FC<VideoPlayerProps> = ({ src }) => {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      return () => {
        hls.destroy();
      };
    } else {
      videoRef.current.src = src;
    }
  }, [src]);






  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: number;

    const checkFile = async () => {
      try {
        const response = await fetch(src, { method: "HEAD" });
        console.log(response);

        if (!response.ok) {
          console.log("File does not exist");
          setLoading(true);
        } else {
          console.log("File exists");
          setLoading(false);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error checking file:", error);
        setLoading(true);
      }
    };

    const timer = setTimeout(() => {
      checkFile();

      intervalId = setInterval(checkFile, 3000);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, [src]);







  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => setDuration(video.duration);
    const onTimeUpdate = () => setProgress(video.currentTime);

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);








  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handleLoaded = () => {
      if (!video.paused) {
        setIsPlaying(true);
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("loadeddata", handleLoaded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("loadeddata", handleLoaded);
    };
  }, []);






  const [isMuted, setIsMuted] = useState(true);
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };





  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setProgress(newTime);

    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };






  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if ((video as any).webkitRequestFullscreen) {
      (video as any).webkitRequestFullscreen();
    } else if ((video as any).msRequestFullscreen) {
      (video as any).msRequestFullscreen();
    }
  };




  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };





  return (
    <div className="video-container camera-feed bg-slate-800 rounded-2xl p-4 border border-slate-700 hover:border-slate-600 transition-all duration-200 relative group">
      {/* Row  1 - Video */}
      <div className="video-box aspect-video bg-slate-900 rounded-xl mb-3 overflow-hidden relative">
        <div className="w-full h-full relative">
          <div className="relative bg-black rounded-lg overflow-hidden w-full h-full">
            <video
              src={src}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              ref={videoRef}
              muted
            ></video>

            {/* LOADER */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                <div className="text-center text-white">
                  <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-sm">Loading</p>
                </div>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 opacity-100">
              <div className="flex items-center  gap-2">
                <button
                  onClick={handlePlayPause}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {isPlaying ? <IoPauseOutline /> : <IoPlayOutline />}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    {isMuted ? (
                      <IoVolumeMuteOutline />
                    ) : (
                      <IoVolumeHighOutline />
                    )}
                  </button>

                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={progress}
                    step={0.1}
                    onChange={handleSeek}
                    className="w-full h-1 bg-gray-600 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex-1"></div>

                <button
                  onClick={handleFullscreen}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <GoScreenFull />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap2">
          <button className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-3 py-1.5 rounded transition-colors flex items-center gap-1.5">
            <GoBroadcast className="text-sm" />
            {`Stream 1`}
          </button>
        </div>
        <div className="text-xs">
          <span className="text-green-400 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse">
              {" "}
            </div>{" "}
            <span>WebRTC</span>
          </span>
        </div>
      </div>

      {/* Row 3 */}
    </div>
  );
};

export default VideoCard;

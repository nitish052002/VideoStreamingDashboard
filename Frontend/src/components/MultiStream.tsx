import VideoCard from "./VideoCard";

const MultiStream = () => {

  
  const hlsUrls = [
    "http://localhost:5000/streams/stream1/stream.m3u8",
    "http://localhost:5000/streams/stream2/stream.m3u8",
    "http://localhost:5000/streams/stream3/stream.m3u8",
    "http://localhost:5000/streams/stream4/stream.m3u8",
    "http://localhost:5000/streams/stream5/stream.m3u8",
    "http://localhost:5000/streams/stream6/stream.m3u8",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {hlsUrls.map((url, i) => (
        <VideoCard key={i} src={url} />
      ))}
    </div>
  );
};

export default MultiStream;

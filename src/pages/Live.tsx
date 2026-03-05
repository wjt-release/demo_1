import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { Layout } from '@/components/layout';
import { LiveComments, LiveProducts, LiveInteraction } from '@/components/live';
import { useLiveStore } from '@/store/liveStore';
import { getCurrentStream, getLiveProducts, mockComments } from '@/data/liveStreams';

export function Live() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const {
    currentStream,
    liveProducts,
    comments,
    viewerCount,
    setCurrentStream,
    setLiveProducts,
    setComments,
    setViewerCount,
  } = useLiveStore();

  useEffect(() => {
    const stream = getCurrentStream();
    if (stream) {
      setCurrentStream(stream);
      setLiveProducts(getLiveProducts(stream.id));
      setComments(mockComments);
      setViewerCount(stream.viewerCount);
    }

    return () => {
      setCurrentStream(null);
      setLiveProducts([]);
      setComments([]);
    };
  }, [setCurrentStream, setLiveProducts, setComments, setViewerCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(viewerCount + Math.floor(Math.random() * 10) - 3);
    }, 5000);

    return () => clearInterval(interval);
  }, [viewerCount, setViewerCount]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!currentStream) {
    return (
      <Layout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-xl mb-4">暂无直播</p>
            <Link to="/" className="text-gray-400 hover:text-white">
              返回首页
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <img
                src={currentStream.streamerAvatar}
                alt={currentStream.streamerName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-white text-sm font-medium">
                  {currentStream.streamerName}
                </p>
                <p className="text-gray-400 text-xs">{currentStream.title}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-[#FF2D55] rounded-full">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white text-xs">直播中</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <motion.img
          key={currentStream.coverImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={currentStream.coverImage}
          alt={currentStream.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="absolute top-20 right-4 w-80 h-[calc(100vh-20rem)] flex flex-col bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden">
          <LiveComments comments={comments} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 md:right-80">
          <LiveProducts products={liveProducts} />
          <LiveInteraction streamId={currentStream.id} viewerCount={viewerCount} />
        </div>

        <div className="absolute bottom-4 left-4 flex gap-2 md:bottom-auto md:top-20 md:left-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

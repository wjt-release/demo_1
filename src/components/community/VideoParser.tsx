import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Loader2, CheckCircle, AlertCircle, Play } from 'lucide-react';
import { VideoParseResult } from '@/types';

interface VideoParserProps {
  onVideoParsed: (result: VideoParseResult) => void;
}

export function VideoParser({ onVideoParsed }: VideoParserProps) {
  const [url, setUrl] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [result, setResult] = useState<VideoParseResult | null>(null);

  const supportedPlatforms = [
    { name: '抖音', icon: '🎵' },
    { name: '快手', icon: '⚡' },
    { name: '小红书', icon: '📕' },
    { name: 'B站', icon: '📺' },
    { name: '微博', icon: '📱' },
  ];

  const parseVideoUrl = async () => {
    if (!url.trim()) return;

    setIsParsing(true);
    setResult(null);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResult: VideoParseResult = {
      success: true,
      videoUrl: 'https://example.com/video.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      title: '解析成功 - 视频标题',
    };

    setResult(mockResult);
    setIsParsing(false);
    onVideoParsed(mockResult);
  };

  const clearResult = () => {
    setResult(null);
    setUrl('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-gray-500">支持平台：</span>
        <div className="flex gap-2">
          {supportedPlatforms.map((platform) => (
            <span
              key={platform.name}
              className="text-xs px-2 py-1 bg-gray-100 rounded-full"
            >
              {platform.icon} {platform.name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="粘贴视频链接，自动解析"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF6B35]"
          />
        </div>
        <button
          onClick={parseVideoUrl}
          disabled={!url.trim() || isParsing}
          className="px-4 py-2.5 bg-[#FF6B35] text-white text-sm rounded-lg hover:bg-[#FF6B35]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isParsing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              解析中
            </>
          ) : (
            '解析'
          )}
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="relative rounded-lg overflow-hidden border border-gray-200"
          >
            {result.success ? (
              <>
                <div className="relative aspect-video">
                  <img
                    src={result.thumbnail}
                    alt={result.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <button
                    onClick={clearResult}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
                  >
                    <span className="sr-only">清除</span>
                    ×
                  </button>
                </div>
                <div className="p-3 flex items-center gap-2 bg-green-50">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-700">{result.title}</span>
                </div>
              </>
            ) : (
              <div className="p-4 flex items-center gap-2 bg-red-50">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-700">{result.error || '解析失败，请检查链接'}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-gray-400">
        * 视频解析功能为模拟演示，实际需要后端服务支持
      </p>
    </div>
  );
}

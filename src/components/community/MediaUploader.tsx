import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image, Video, Plus, GripVertical } from 'lucide-react';

interface MediaFile {
  id: string;
  file: File | null;
  url: string;
  type: 'image' | 'video';
  isUploading: boolean;
  uploadProgress: number;
}

interface MediaUploaderProps {
  maxCount?: number;
  onMediaChange: (media: { url: string; type: 'image' | 'video' }[]) => void;
}

export function MediaUploader({ maxCount = 9, onMediaChange }: MediaUploaderProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null, type: 'image' | 'video') => {
    if (!files) return;

    const newFiles: MediaFile[] = [];
    const remainingSlots = maxCount - mediaFiles.length;

    Array.from(files)
      .slice(0, remainingSlots)
      .forEach((file) => {
        const url = URL.createObjectURL(file);
        newFiles.push({
          id: Date.now().toString() + Math.random(),
          file,
          url,
          type,
          isUploading: false,
          uploadProgress: 100,
        });
      });

    if (newFiles.length > 0) {
      const updatedFiles = [...mediaFiles, ...newFiles];
      setMediaFiles(updatedFiles);
      onMediaChange(updatedFiles.map(f => ({ url: f.url, type: f.type })));
    }
  }, [mediaFiles, maxCount, onMediaChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const hasVideo = Array.from(files).some(f => f.type.startsWith('video/'));
    handleFiles(files, hasVideo ? 'video' : 'image');
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const removeMedia = (id: string) => {
    const updatedFiles = mediaFiles.filter(f => f.id !== id);
    setMediaFiles(updatedFiles);
    onMediaChange(updatedFiles.map(f => ({ url: f.url, type: f.type })));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDragEnter = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newFiles = [...mediaFiles];
    const draggedFile = newFiles[draggedIndex];
    newFiles.splice(draggedIndex, 1);
    newFiles.splice(targetIndex, 0, draggedFile);

    setMediaFiles(newFiles);
    setDraggedIndex(targetIndex);
    onMediaChange(newFiles.map(f => ({ url: f.url, type: f.type })));
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-[#FF6B35] transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
        <p className="text-sm text-gray-600 mb-2">拖拽图片或视频到这里上传</p>
        <p className="text-xs text-gray-400">最多上传 {maxCount} 张图片或视频</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
        >
          <Image className="w-4 h-4" />
          <span className="text-sm">选择图片</span>
        </button>
        <button
          onClick={() => videoInputRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
        >
          <Video className="w-4 h-4" />
          <span className="text-sm">选择视频</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files, 'image')}
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files, 'video')}
      />

      <AnimatePresence>
        {mediaFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-3 gap-2"
          >
            {mediaFiles.map((media, index) => (
              <motion.div
                key={media.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => handleDragEnter(index)}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-move ${
                  draggedIndex === index ? 'ring-2 ring-[#FF6B35] ring-offset-2' : ''
                }`}
              >
                {media.type === 'image' ? (
                  <img
                    src={media.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={media.url}
                    className="w-full h-full object-cover"
                  />
                )}
                
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <GripVertical className="w-5 h-5 text-white" />
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMedia(media.id);
                  }}
                  className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>

                {index === 0 && (
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-[#FF6B35] text-white text-xs rounded">
                    封面
                  </span>
                )}
              </motion.div>
            ))}

            {mediaFiles.length < maxCount && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-[#FF6B35] transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus className="w-6 h-6 text-gray-400" />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

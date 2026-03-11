import { create } from 'zustand';
import { LiveStream, LiveProduct, LiveComment } from '@/types';

interface LiveState {
  currentStream: LiveStream | null;
  liveProducts: LiveProduct[];
  comments: LiveComment[];
  viewerCount: number;
  likes: number;
  setCurrentStream: (stream: LiveStream | null) => void;
  setLiveProducts: (products: LiveProduct[]) => void;
  addComment: (comment: LiveComment) => void;
  setComments: (comments: LiveComment[]) => void;
  setViewerCount: (count: number) => void;
  addLike: () => void;
  resetLikes: () => void;
}

export const useLiveStore = create<LiveState>((set) => ({
  currentStream: null,
  liveProducts: [],
  comments: [],
  viewerCount: 0,
  likes: 0,

  setCurrentStream: (stream) => set({ currentStream: stream }),
  
  setLiveProducts: (products) => set({ liveProducts: products }),
  
  addComment: (comment) => set((state) => ({
    comments: [...state.comments.slice(-50), comment],
  })),
  
  setComments: (comments) => set({ comments }),
  
  setViewerCount: (count) => set({ viewerCount: count }),
  
  addLike: () => set((state) => ({ likes: state.likes + 1 })),
  
  resetLikes: () => set({ likes: 0 }),
}));

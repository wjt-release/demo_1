import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Post, Comment, PostFilters } from '@/types';

interface PostInteraction {
  likedPosts: string[];
  favoritedPosts: string[];
}

interface CommunityState {
  posts: Post[];
  currentPost: Post | null;
  comments: Comment[];
  filters: PostFilters;
  interaction: PostInteraction;
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  setCurrentPost: (post: Post | null) => void;
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  setFilters: (filters: Partial<PostFilters>) => void;
  resetFilters: () => void;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  favoritePost: (postId: string) => void;
  unfavoritePost: (postId: string) => void;
  isLiked: (postId: string) => boolean;
  isFavorited: (postId: string) => boolean;
}

const defaultFilters: PostFilters = {
  tag: null,
  postType: 'all',
  sortBy: 'latest',
};

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set, get) => ({
      posts: [],
      currentPost: null,
      comments: [],
      filters: defaultFilters,
      interaction: {
        likedPosts: [],
        favoritedPosts: [],
      },

      setPosts: (posts) => set({ posts }),

      addPost: (post) => set((state) => ({
        posts: [post, ...state.posts],
      })),

      setCurrentPost: (post) => set({ currentPost: post }),

      setComments: (comments) => set({ comments }),

      addComment: (comment) => set((state) => ({
        comments: [...state.comments, comment],
      })),

      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters },
      })),

      resetFilters: () => set({ filters: defaultFilters }),

      likePost: (postId) => set((state) => {
        const { likedPosts, favoritedPosts } = state.interaction;
        if (likedPosts.includes(postId)) return state;
        
        const updatedPosts = state.posts.map(p => 
          p.id === postId ? { ...p, likesCount: p.likesCount + 1, isLiked: true } : p
        );
        
        const updatedCurrentPost = state.currentPost?.id === postId
          ? { ...state.currentPost, likesCount: state.currentPost.likesCount + 1, isLiked: true }
          : state.currentPost;

        return {
          posts: updatedPosts,
          currentPost: updatedCurrentPost,
          interaction: { likedPosts: [...likedPosts, postId], favoritedPosts },
        };
      }),

      unlikePost: (postId) => set((state) => {
        const { likedPosts, favoritedPosts } = state.interaction;
        if (!likedPosts.includes(postId)) return state;

        const updatedPosts = state.posts.map(p =>
          p.id === postId ? { ...p, likesCount: Math.max(0, p.likesCount - 1), isLiked: false } : p
        );

        const updatedCurrentPost = state.currentPost?.id === postId
          ? { ...state.currentPost, likesCount: Math.max(0, state.currentPost.likesCount - 1), isLiked: false }
          : state.currentPost;

        return {
          posts: updatedPosts,
          currentPost: updatedCurrentPost,
          interaction: { likedPosts: likedPosts.filter(id => id !== postId), favoritedPosts },
        };
      }),

      favoritePost: (postId) => set((state) => {
        const { likedPosts, favoritedPosts } = state.interaction;
        if (favoritedPosts.includes(postId)) return state;

        const updatedPosts = state.posts.map(p =>
          p.id === postId ? { ...p, favoritesCount: p.favoritesCount + 1, isFavorited: true } : p
        );

        const updatedCurrentPost = state.currentPost?.id === postId
          ? { ...state.currentPost, favoritesCount: state.currentPost.favoritesCount + 1, isFavorited: true }
          : state.currentPost;

        return {
          posts: updatedPosts,
          currentPost: updatedCurrentPost,
          interaction: { likedPosts, favoritedPosts: [...favoritedPosts, postId] },
        };
      }),

      unfavoritePost: (postId) => set((state) => {
        const { likedPosts, favoritedPosts } = state.interaction;
        if (!favoritedPosts.includes(postId)) return state;

        const updatedPosts = state.posts.map(p =>
          p.id === postId ? { ...p, favoritesCount: Math.max(0, p.favoritesCount - 1), isFavorited: false } : p
        );

        const updatedCurrentPost = state.currentPost?.id === postId
          ? { ...state.currentPost, favoritesCount: Math.max(0, state.currentPost.favoritesCount - 1), isFavorited: false }
          : state.currentPost;

        return {
          posts: updatedPosts,
          currentPost: updatedCurrentPost,
          interaction: { likedPosts, favoritedPosts: favoritedPosts.filter(id => id !== postId) },
        };
      }),

      isLiked: (postId) => get().interaction.likedPosts.includes(postId),

      isFavorited: (postId) => get().interaction.favoritedPosts.includes(postId),
    }),
    {
      name: 'elegance-community',
      partialize: (state) => ({
        interaction: state.interaction,
      }),
    }
  )
);

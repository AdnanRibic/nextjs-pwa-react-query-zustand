import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Define your store
export const useStore = create(
  devtools(
  set => ({
  characters: [],
  setCharacters: (characters) => set({ characters }),
})));

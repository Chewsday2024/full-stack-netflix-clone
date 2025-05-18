import { create } from "zustand";




type contentStoreType = {
  contentType: string
  setContentType: ( type: string ) => void
}





export const useContentStore = create<contentStoreType>( set => ({
  contentType: 'movie',
  setContentType: ( type ) => set({ contentType: type })
}))
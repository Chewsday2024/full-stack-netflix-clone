import type{ contentType } from './../../types/contentType.d';
import { useEffect, useState } from "react"
import { useContentStore } from "../store/content"
import axios from "axios"




function useGetTrendingContent() {
  const [trendingContent, setTrendingContent] = useState<contentType | null>(null)
  const { contentType } = useContentStore()


  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`)

      setTrendingContent(res.data.content)
    }

    getTrendingContent()
  }, [contentType])

  return { trendingContent }
}
export default useGetTrendingContent
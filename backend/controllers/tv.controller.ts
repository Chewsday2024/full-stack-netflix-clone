import { Request, Response } from "express"
import { fetchFromTMDB } from "../services/tmdb.service.js"
import { similarTvType, tvDetailType, tvTrailerType, tvType } from "../types/tv.js"



export async function getTrendingTv(req: Request, res: Response) {
  try {
    const data: tvType = await fetchFromTMDB('https://api.themoviedb.org/3/trending/tv/day?language=zh-TW')

    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]

    res.json({ success: true, content: randomMovie })
  } catch (error: any) {
    console.log('Error in movie controller', error.message)

    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


export async function getTvTrailers(req: Request, res: Response) {
  const { id } = req.params

  try {
    const data: tvTrailerType = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)

    res.json({ success: true, trailers: data.results })
  } catch (error: any) {
    if (error.message.includes('404')) {
      res.status(404).send(null)
      return
    }
    console.log('Error in movie controller', error.message)

    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


export async function getTvDetails(req: Request, res: Response) {
  const { id } = req.params

  try {
    const data: tvDetailType = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)

    res.status(200).json({ success: true, content: data })
  } catch (error: any) {
    if (error.message.includes('404')) {
      res.status(404).send(null)
      return
    }
    console.log('Error in movie controller', error.message)

    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


export async function getSimilarTv(req: Request, res: Response) {
  const { id } = req.params

  try {
    const data: similarTvType = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=zh-TW&page=1`)

    res.status(200).json({ success: true, similar: data.results })
  } catch (error: any) {
    console.log('Error in movie controller', error.message)

    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


export async function getTvByCategory(req: Request, res: Response) {
  const { category } = req.params

  try {
    const data: tvType = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=zh-TW&page=1`)

    res.status(200).json({ success: true, content: data.results })
  } catch (error: any) {
    console.log('Error in movie controller', error.message)

    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}
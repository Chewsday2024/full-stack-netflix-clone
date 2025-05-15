import { Request, Response } from "express";
import { fetchFromTMDB } from "../services/tmdb.service.js";
import { movieDetailType, movieTypeNoDate, movieTypeWithDate, similarMovieType, trailerType } from "../types/movie.js";





export async function getTrendingMovie(req: Request, res: Response) {
  try {
    const data: movieTypeNoDate = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=zh-TW')

    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]

    res.json({ success: true, content: randomMovie })
  } catch (error: any) {
    console.log('Error in movie controller', error.message)

    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


export async function getMovieTrailers(req: Request, res: Response) {
  const { id } = req.params

  try {
    const data: trailerType = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)

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


export async function getMovieDetails(req: Request, res: Response) {
  const { id } = req.params

  try {
    const data: movieDetailType = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)

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


export async function getSimilarMovie(req: Request, res: Response) {
  const { id } = req.params

  try {
    const data: similarMovieType = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=zh-TW&page=1`)

    res.status(200).json({ success: true, similar: data.results })
  } catch (error: any) {
    console.log('Error in movie controller', error.message)

    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


export async function getMoviesByCategory(req: Request, res: Response) {
  const { category } = req.params

  try {
    const data: movieTypeNoDate | movieTypeWithDate = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=zh-TW&page=1`)

    res.status(200).json({ success: true, content: data.results })
  } catch (error: any) {
    console.log('Error in movie controller', error.message)

    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

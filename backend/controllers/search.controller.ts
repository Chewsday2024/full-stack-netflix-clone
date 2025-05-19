import { Request, Response } from "express"
import { fetchFromTMDB } from "../services/tmdb.service.js"
import { searchMovieType, searchPersonType, searchTvType } from "../types/search.js"
import { User } from "../models/user.model.js"





export async function searchPerson(req: Request, res: Response) {
  const { query } = req.params

  try {
    const response: searchPersonType = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=zh-TW&page=1`)

    if (response.results.length === 0) {
      res.status(404).send(null)
      return
    }

    await User.findByIdAndUpdate(req.user?._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: 'person',
          createdAt: new Date()
        }
      }
    })

    res.status(200).json({ success: true, content: response.results })
  } catch (error: any) {
    console.log('Error in searchPerson controller: ', error.message)

    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}


export async function searchMovie(req: Request, res: Response) {
  const { query } = req.params

  try {
    const response: searchMovieType = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=zh-TW&page=1`)

    if (response.results.length === 0) {
      res.status(404).send(null)
      return
    }

    await User.findByIdAndUpdate(req.user?._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: 'movie',
          createdAt: new Date()
        }
      }
    })

    res.status(200).json({ success: true, content: response.results })
  } catch (error: any) {
    console.log('Error in searchMovie controller: ', error.message)

    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}


export async function searchTv(req: Request, res: Response) {
  const { query } = req.params

  try {
    const response: searchTvType = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=zh-TW&page=1`)

    if (response.results.length === 0) {
      res.status(404).send(null)
      return
    }

    await User.findByIdAndUpdate(req.user?._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: 'tv',
          createdAt: new Date()
        }
      }
    })

    res.status(200).json({ success: true, content: response.results })
  } catch (error: any) {
    console.log('Error in searchTv controller: ', error.message)

    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}


export async function getSearchHistory(req: Request, res: Response) {
  try {
    res.status(200).json({ success: true, content: req.user?.searchHistory })
  } catch (error: any) {
    console.log('Error in getSearchHistory controller: ', error.message)

    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}


export async function deleteItemFromSearchHistory(req: Request, res: Response) {
  const { id } = req.params

  try {
    await User.findByIdAndUpdate(req.user?._id, {
      $pull: {
        searchHistory: { createdAt: new Date(id)}
      }
    })

    res.status(200).json({ success: true, message: 'Item removed from search history' })
  } catch (error: any) {
    console.log('Error in deleteItemFromSearchHistory controller: ', error.message)

    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}
export type tvType = {
  page: number
  results: {
    backdrop_path: string
    id: number
    name: string
    original_name: string
    overview: string
    poster_path: string
    media_type: string
    adult: boolean
    original_language: string
    genre_ids: number[]
    popularity: number
    first_air_date: string
    vote_average: number
    vote_count: number
    origin_country: string[]
  }[]
  total_pages: number
  total_results: number
}


export type tvTrailerType = {
  id: number
  results: 
  {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: Date
    id: string
  }[]
}


export type tvDetailType = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  } | null
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}


export type similarTvType = {
  page: number
  results: {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }[]
  total_pages: number
  total_results: number
}
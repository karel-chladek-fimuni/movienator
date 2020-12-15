import { Genre } from "./Genre"
import { Torrent } from "./Torrent"

export interface Movie {
    id: number,
    url: string,
    imdb_code: string,
    title: string,
    title_long: string
    slug: string,
    year: number,
    rating: number,
    runtime: number,
    genres: Genre[],
    summary: string,
    yt_trailer_code: string,
    language: string,
    mpa_rating: string,
    background_image: string,
    background_image_original: string,
    small_cover_image: string,
    medium_cover_image: string,
    large_cover_image: string,
    torrents: Torrent[],
    date_uploaded: string,
    date_uploaded_unix: number

}
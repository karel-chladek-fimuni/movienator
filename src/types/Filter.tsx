import { Genre } from "./Genre"

type Range = {
    min: number,
    max: number
};
type Language =
    "aa" | "ab" | "af" | "ak" | "am" | "ar" |
    "bn" | "bo" | "bs" | "ca" | "cn" | "cs" |
    "da" | "de" | "el" | "en" | "es" | "et" |
    "eu" | "fa" | "fi" | "fr" | "ga" | "gl" |
    "he" | "hi" | "ht" | "hu" | "id" | "is" |
    "it" | "ja" | "ka" | "km" | "kn" | "ko" |
    "ky" | "la" | "lv" | "ml" | "mn" | "mr" |
    "ms" | "nb" | "nl" | "no" | "os" | "pa" |
    "pl" | "ps" | "pt" | "ro" | "ru" | "sh" |
    "sk" | "so" | "sr" | "sv" | "sw" | "ta" |
    "te" | "th" | "tl" | "tr" | "uk" | "ur" |
    "vi" | "wo" | "xx" | "yi" | "zh";


export type Filter = {
    genre_filter?: {
        needed?: Genre[],
        forbiden?: Genre[]
    },
    rating_filter?: Range,
    year_filter?: Range,
    language_filter?: {
        possible: Language[]
    }

}
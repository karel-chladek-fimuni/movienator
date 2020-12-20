export type Range = {
    min: number,
    max: number
};

export const years: Range = {min:1940,max:2020} as const
export const ratings: Range = {min:0,max:10} as const 

export const genre_list = [
    "Fantasy" , "Adventure" , "Sci-Fi"
    , "Family" , "War" , "Horror"
    , "Musical" , "Animation" , "Music"
    , "Mystery" , "History" , "Comedy"
    , "Drama" , "Thriller" , "Action"
    , "Crime" , "Romance"] as const;

export type Genre = typeof genre_list[number];

export const language_list =[
    "aa" , "ab" , "af" , "ak" , "am" , "ar" ,
    "bn" , "bo" , "bs" , "ca" , "cn" , "cs" ,
    "da" , "de" , "el" , "en" , "es" , "et" ,
    "eu" , "fa" , "fi" , "fr" , "ga" , "gl" ,
    "he" , "hi" , "ht" , "hu" , "id" , "is" ,
    "it" , "ja" , "ka" , "km" , "kn" , "ko" ,
    "ky" , "la" , "lv" , "ml" , "mn" , "mr" ,
    "ms" , "nb" , "nl" , "no" , "os" , "pa" ,
    "pl" , "ps" , "pt" , "ro" , "ru" , "sh" ,
    "sk" , "so" , "sr" , "sv" , "sw" , "ta" ,
    "te" , "th" , "tl" , "tr" , "uk" , "ur" ,
    "vi" , "wo" , "xx" , "yi" , "zh" ] as const;


export type Language = typeof language_list[number];

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
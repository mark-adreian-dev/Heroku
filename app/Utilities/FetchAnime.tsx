enum Filter {
  AIRING = "airing",
  UPCOMING = "upcoming",
  BY_POPULARITY = "bypopularity",
  FAVORITE = "favorite",
}

export enum Rating {
  NO_RATING = "",
  ALL_AGES = "g",
  CHIDLREN = "pg",
  TEENS = "pg13",
  VIOLENCE_PROFANITY = "r17",
  NUDITY = "r",
  HENTAI = "rx",
}

export enum SearchType { 
  TV ="tv",
  MOVIE = "movie",
  OVA = "ova",
  SPECIAL = "special",
  ONA = "ona",
  MUSIC = "music",
  CM = "cm",
  PV = "pv",
  TV_SPECIAL = "tv_special"
}

enum Status {
  AIRING = "airing",
  COMPELETE = "complete",
  UPCOMING = "upcoming"
}

enum Order {
  DESC = "desc",
  ASC = "asc"
}
export interface Params {
  type?: string;
  filter?: Filter;
  rating?: Rating;
  sfw?: boolean;
  page?: number;
  limit?: number;
  unapproved?: boolean,
  q?: string,
  searchType?: SearchType,
  score?: number,
  min_score?: number,
  max_score?: number,
  status?: Status,
  genre?: string,
  genres_exclude?: string,
  sort?: Order,
  letter?: string,
  producers?: string,
  start_date?: string,
  end_date?: string
}

enum ResponseStatus {
  BadRequest = 400,
  NotFound = 404,
  MethodNotAllowed = 405,
  TooManyRequest = 429,
  InternalServerError = 500,
  ServiceUnavailable = 503,
}

const BASE_URL = "https://api.jikan.moe/v4";

export const extractParams = (params: Params | undefined): string => {
  if (params === undefined) return "";
  else {
    let result: string = "?";
    Object.entries(params).map(([key, value], index) => {
      result += `${key}=${value}${
        index !== Object.entries(params).length - 1 ? "&" : ""
      }`;
    });
    return result;
  }
};

export async function FetchAnime<T>(
  endpoint: string,
  index?: number,
  params?: Params
): Promise<T> {
  //This is to ensure that the request sent to JikanAPI does not reach or exceeds the rate limit
  //This may cause slow performance since I'm limiting request sent to the API and prevent any runtime error at most
  const delay = 336;
  const delayInMilis = index ? delay * index : 0;
  return new Promise((resolve) => setTimeout(resolve, delayInMilis)).then(
    async () => {

      const parameters = extractParams(params ? params : undefined);
      const url = `${BASE_URL}${endpoint}${parameters ? parameters : ""}`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (response.status === ResponseStatus.TooManyRequest)
        throw Error("Too many request! rate limit exceed");

      // console.log(
      //   `\nEndpoint : ${endpoint}\nResponse Status: ${response.status}\nDelay: ${delayInMilis}`
      // );
      const result: T = await response.json();
      return result;
    }
  );
}

export interface ToServerShortenUrl {
  original_url: string;
}

export interface FromServerShortenUrl {
  id: string;
  shortened_url: string;
  original_url: string;
}

export interface ToServerLengthenUrl {
  shortened_url: string;
}

export interface FromServerLengthenUrl {
  original_url: string;
}

export interface FromServerError {
  error: string;
}

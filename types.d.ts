export type LoggedUser = {
  name: string;
  image: string;
};

export type Media = {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
  vote_average: number;
  name?: string;
};

export type FavoriteMedia = {
  media_id: string;
  type: string;
  poster: string;
  title: string;
  id: string;
};

export type Results = {
  results: Media[];
};

export type MediaDetails = Media & {
  overview: string;
  homepage: string;
  release_date: string;
  runtime: number;
  vote_count: number;
  genres: { name: string }[];
  images: {
    backdrops: { file_path: string }[];
    posters: { file_path: string }[];
  };
  recommendations: { results: Media[] };
  credits: { cast: Person[] };
  seasons?: Season[];
  networks?: Network[];
  status?: string;
};

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
};

export type Network = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type Person = {
  cast_id: number;
  name: string;
  character: string;
  known_for_department: string;
  profile_path: string | null;
};

export type Video = {
  id: string;
  key: string;
  name?: string;
  site?: string;
  type?: string;
};

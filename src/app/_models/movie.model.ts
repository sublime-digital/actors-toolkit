export interface MovieReview {
  author: string;
  rating: number;
  comment: string;
  reviewer: string;
}

export interface Movie {
  id: string;
  title: string;
  releaseDate: string;
  posterUrl: string;
  reviews: MovieReview[];
}

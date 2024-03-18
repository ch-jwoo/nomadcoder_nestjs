export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];

  constructor({
    id,
    title,
    year,
    genres,
  }: {
    id: number;
    title: string;
    year: number;
    genres: string[];
  }) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.genres = genres;
  }
}

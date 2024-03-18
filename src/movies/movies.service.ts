import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movies.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  create(movieData: CreateMovieDTO) {
    // const newMovie: Movie = {
    //   id: this.movies.length + 1,
    //   ...movieData,
    // };
    const newMovie = new Movie({ id: this.movies.length + 1, ...movieData });

    this.movies.push(newMovie);
    return this.movies.at(-1);
  }

  update(id: number, updateData: UpdateMovieDTO) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    const newMovie = new Movie({ ...movie, ...updateData });
    this.movies.push(newMovie);
    return this.movies.at(-1);
  }
}

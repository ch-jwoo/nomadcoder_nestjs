import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './entities/movies.entity';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });
  // beforeAll
  // afterEach
  // afterAll

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should be array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('shoud be instance of Movie', () => {
      const movieData: CreateMovieDTO = {
        title: 'test-title',
        year: 2022,
        genres: ['test'],
      };
      const createdMovie = service.create(movieData);

      const result = service.getOne(createdMovie.id);
      expect(result).toBeInstanceOf(Movie);
    });

    it('shoud happen NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne()', () => {
    it('should delete one movie', () => {
      const movieData: CreateMovieDTO = {
        title: 'test-title',
        year: 2022,
        genres: ['test'],
      };
      const createdMovie = service.create(movieData);
      const beforeDelete = service.getAll();
      service.deleteOne(createdMovie.id);
      const afterDelete = service.getAll();
      expect(beforeDelete.length - afterDelete.length).toEqual(1);
    });

    it('shoud make a 404 error', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create()', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      const movieData: CreateMovieDTO = {
        title: 'test-title',
        year: 2022,
        genres: ['test'],
      };
      service.create(movieData);
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update()', () => {
    it('should update a movie', () => {
      const movieData: CreateMovieDTO = {
        title: 'test-title',
        year: 2022,
        genres: ['test'],
      };
      const newMovie = service.create(movieData);
      const updatedMovie = service.update(newMovie.id, {
        title: 'updated-title',
      });
      expect(updatedMovie.title).toEqual('updated-title');
    });
    it('should make 404 error', () => {
      try {
        service.update(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

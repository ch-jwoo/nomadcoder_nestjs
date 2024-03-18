import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber } from 'class-validator';
import { CreateMovieDTO } from './create-movie.dto';

export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {
  // @IsString()
  // readonly title?: string;
  // @IsNumber()
  // readonly year?: number;
  // @IsString({ each: true })
  // readonly genres?: string[];
}

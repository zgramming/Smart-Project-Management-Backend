import { IsString } from 'class-validator';

export class CreateProjectClientDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  description?: string;
}

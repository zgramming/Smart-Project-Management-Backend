import { UserStatusEnum } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsInt()
  roleId: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  email?: string;

  @IsNotEmpty()
  password: string;

  status?: UserStatusEnum;
}

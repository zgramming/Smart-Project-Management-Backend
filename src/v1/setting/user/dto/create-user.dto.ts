import { UserStatusEnum } from '@prisma/client';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
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

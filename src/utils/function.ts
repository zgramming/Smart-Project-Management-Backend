import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePassword = async (password: string, hash: string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

export const handlingCustomError = (error: any) => {
  const baseError = {
    error: true,
    message: error.message ?? 'Internal server error',
  };

  if (error instanceof PrismaClientKnownRequestError) {
    throw new InternalServerErrorException({
      ...baseError,
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
  }

  if (error instanceof PrismaClientUnknownRequestError) {
    throw new InternalServerErrorException({
      ...baseError,
      message: error.message,
      stack: error.stack,
    });
  }

  if (error instanceof PrismaClientRustPanicError) {
    throw new InternalServerErrorException({
      ...baseError,
      message: error.message,
      stack: error.stack,
    });
  }

  if (error instanceof PrismaClientInitializationError) {
    throw new InternalServerErrorException({
      ...baseError,
      message: error.message,
      code: error.errorCode,
      stack: error.stack,
    });
  }

  if (error instanceof PrismaClientValidationError) {
    throw new BadRequestException({
      ...baseError,
      message: error.message,
      stack: error.stack,
    });
  }

  throw error;
};

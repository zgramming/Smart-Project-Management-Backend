import {
  BadRequestException,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

type UploadFileOptions = {
  name?: string;
};

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

export const generateRandomNameFile = (file: Express.Multer.File) => {
  const ext = file.originalname.split('.').pop();
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  return `${randomName}.${ext}`;
};

export const uploadFile = (
  file: Express.Multer.File,
  directory: string,
  options?: UploadFileOptions,
) => {
  const { name: existingName } = options ?? {};

  let filename = generateRandomNameFile(file);

  if (existingName) {
    filename = existingName;
  }

  const fullPath = `${directory}/${filename}`;
  const buffer = file.buffer;

  fs.writeFile(fullPath, buffer, (err) => {
    if (err) {
      throw new NotAcceptableException({
        error: true,
        message: 'File upload failed',
      });
    }
  });

  return filename;
};

export const removeFileUpload = (path: string) => {
  if (path.length === 0 || path === '') return true;

  const isExists = fs.existsSync(path);

  if (!isExists) {
    return true;
  }

  fs.unlink(path, (err) => {
    if (err) {
      throw new NotAcceptableException({
        error: true,
        message: 'Remove file failed',
      });
    }
  });

  return true;
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

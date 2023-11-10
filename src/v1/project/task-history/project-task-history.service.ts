import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectTaskHistoryService {
  findAll() {
    return `This action returns all projectTaskHistory`;
  }
}

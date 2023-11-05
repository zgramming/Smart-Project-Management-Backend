import { Injectable } from '@nestjs/common';
import { CreateProjectDocumentDto } from './dto/create-project-document.dto';
import { UpdateProjectDocumentDto } from './dto/update-project-document.dto';

@Injectable()
export class ProjectDocumentService {
  create(createProjectDocumentDto: CreateProjectDocumentDto) {
    return 'This action adds a new projectDocument';
  }

  findAll() {
    return `This action returns all projectDocument`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectDocument`;
  }

  update(id: number, updateProjectDocumentDto: UpdateProjectDocumentDto) {
    return `This action updates a #${id} projectDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectDocument`;
  }
}

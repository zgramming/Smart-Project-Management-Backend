import {
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProjectReportService } from './project-report.service';
import { prefixProjectReportUrl } from 'src/utils/constant';
import { ValidateJWTGuard } from 'src/guards/validate_jwt.guard';
import { UserPayloadJWT } from 'src/interface/user_payload_jwt.interface';

@UseGuards(ValidateJWTGuard)
@Controller(`${prefixProjectReportUrl}`)
export class ProjectReportController {
  constructor(private readonly projectReportService: ProjectReportService) {}

  @Get()
  findAll() {
    return this.projectReportService.findAll();
  }

  @Post('project-manager')
  @HttpCode(200)
  async findAllProjectManager(@Query() query: any, @Req() req: any) {
    const { year } = query;
    const {
      userPayloadJWT,
    }: {
      userPayloadJWT: UserPayloadJWT;
    } = req;

    const result = await this.projectReportService.generateReportProjectManager(
      userPayloadJWT.sub,
      year,
    );

    return result;
  }

  @Post('developer')
  @HttpCode(200)
  async findAllDeveloper(@Query() query: any, @Req() req: any) {
    const { year } = query;
    const {
      userPayloadJWT,
    }: {
      userPayloadJWT: UserPayloadJWT;
    } = req;

    const result = await this.projectReportService.generateReportDeveloper(
      userPayloadJWT.sub,
      year,
    );

    return result;
  }
}

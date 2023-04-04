import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedGuard } from '@/auth/authenticated.guard';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async show(
    @Req() request,
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<void> {
    const file = await this.filesService.findById(id);

    if (file.author_id !== request.user.id) {
      throw new ForbiddenException();
    }

    response.setHeader('Content-Type', file.mime);
    response.send(file.content);
  }
}

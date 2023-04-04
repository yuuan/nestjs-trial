import {
  ClassSerializerInterceptor,
  Controller,
  FileTypeValidator,
  ForbiddenException,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AuthenticatedGuard } from '@/auth/authenticated.guard';
import { FilesService } from './files.service';
import { FileResponse } from '@/responses/file.response';

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

  @Post()
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    @Req() request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 20 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    uploadedFile: Express.Multer.File,
  ) {
    const file = await this.filesService.create(uploadedFile, request.user);

    return new FileResponse(file);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateRoomDto, UpdateRoomDto } from './room.dto';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  public async getAllRoom() {
    return this.roomService.getAllRoom();
  }

  @Get('/available')
  public async getAvailableRoom() {
    return this.roomService.getAvailableRoom();
  }

  @Get(':id')
  public async getRoomById(@Param('id') roomId: string) {
    return this.roomService.getRoomByID(roomId);
  }

  @Post('')
  @UseInterceptors(FilesInterceptor('images'))
  public async createRoom(
    @Body() payload: CreateRoomDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    return this.roomService.createRoom(payload, images);
  }

  @Put('/:id')
  @UseInterceptors(FilesInterceptor('images'))
  public async updateRoom(
    @Param('id') roomId: string,
    @Body() payload: UpdateRoomDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.roomService.updateRoom(roomId, payload, files);
  }

  @Delete('/:id')
  public async deleteRoom(@Param('id') roomId: string) {
    return this.roomService.deleteRoom(roomId);
  }
}

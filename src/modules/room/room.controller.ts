import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../core/decorators';
import { Room } from '../../database/entities';
import { PermissionEnum } from './../../common/enums/permission.enum';
import { CreateRoomDto, FindRoomDto, UpdateRoomDto } from './room.dto';
import { RoomService } from './room.service';

@Controller('rooms')
@ApiTags('rooms')
@ApiBearerAuth('jwt')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Auth(PermissionEnum.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    type: Room,
  })
  @Get()
  public async getAllRoom() {
    return this.roomService.getAllRoom();
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    type: Room,
  })
  @Get('/available')
  public async getAvailableRoom(@Query() payload: FindRoomDto) {
    return this.roomService.getAvailableRoom(payload);
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    type: Room,
  })
  @Get(':id')
  public async getRoomById(@Param('id') roomId: string) {
    return this.roomService.getRoomByID(roomId);
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 201,
    type: Room,
  })
  @Post('')
  @UseInterceptors(FilesInterceptor('images'))
  public async createRoom(
    @Body() payload: CreateRoomDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    return this.roomService.createRoom(payload, images);
  }

  @Auth(PermissionEnum.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    type: Room,
  })
  @Put('/:id')
  @UseInterceptors(FilesInterceptor('images'))
  public async updateRoom(
    @Param('id') roomId: string,
    @Body() payload: UpdateRoomDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.roomService.updateRoom(roomId, payload, files);
  }

  @Auth(PermissionEnum.SUPER_ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    type: Room,
  })
  @Delete('/:id')
  public async deleteRoom(@Param('id') roomId: string) {
    return this.roomService.deleteRoom(roomId);
  }
}

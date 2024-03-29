import { Body, Controller, Post, Get } from "@nestjs/common";
import { BlockedService } from "./blocked.service";
import { CurrentUser } from "src/common/decorators";
import { User } from "@prisma/client";
import { BlockedUserDto } from "./dto/blocked-user.dto";

@Controller("blocked")
export class BlockedController {
  constructor(private readonly blockedService: BlockedService) {}

  @Get()
  async get(@CurrentUser() user: User) {
    return await this.blockedService.find(user.id);
  }

  @Post()
  async create(@CurrentUser() user: User, @Body() data: BlockedUserDto) {
    if (data.toBlock) await this.blockedService.create({ blockedUserId: data.blockedUserId, userId: user.id });
    else await this.blockedService.delete({ blockedUserId: data.blockedUserId, userId: user.id });
  }
}

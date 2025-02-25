import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthGuard } from "../auth/guards/auth.guard";
import { SitesService } from "./sites.service";
import { CreateSiteDto } from "./dto/create-site.dto";
import { UpdateSiteDto } from "./dto/update-site.dto";
import { Site } from "./models/site.model";

@Controller("sites")
@UseGuards(AuthGuard)
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get()
  findAll(): Promise<Site[]> {
    console.log("GET /api/sites request received");
    return this.sitesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string): Promise<Site> {
    return this.sitesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Request() req, @Body() createSiteDto: CreateSiteDto): Promise<Site> {
    console.log("User ID:", req.user.sub);
    console.log("User Email:", req.user.email);
    return this.sitesService.create(createSiteDto);
  }

  @UseGuards(AuthGuard)
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateSiteDto: UpdateSiteDto,
  ): Promise<Site> {
    return this.sitesService.update(id, updateSiteDto);
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string): Promise<void> {
    return this.sitesService.remove(id);
  }
}

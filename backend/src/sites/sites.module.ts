import { Module } from "@nestjs/common";
import { SitesController } from "./sites.controller";
import { SitesService } from "./sites.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule, JwtModule],
  controllers: [SitesController],
  providers: [SitesService],
})
export class SitesModule {}

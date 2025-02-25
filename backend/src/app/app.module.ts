import { Module } from "@nestjs/common";
import { SitesModule } from "../sites/sites.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [SitesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

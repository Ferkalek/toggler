import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { SitesModule } from "./sites/sites.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "backend/.env",
    }),
    AuthModule,
    SitesModule,
  ],
})
export class AppModule {}

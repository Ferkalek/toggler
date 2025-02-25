import { PartialType } from "@nestjs/mapped-types";
import { CreateSiteDto } from "./create-site.dto";
// ... rest of the file

export class UpdateSiteDto extends PartialType(CreateSiteDto) {}

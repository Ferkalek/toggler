import { FeatureFlag } from "../models/feature-flag.model";
// ... rest of the file

export class CreateSiteDto {
  name: string;
  description: string;
  featureFlags: FeatureFlag[];
}

import { FeatureFlag } from "./feature-flag.model";

export interface Site {
  id: string;
  name: string;
  description: string;
  featureFlags: FeatureFlag[];
  createdAt: Date;
  updatedAt: Date;
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { Site } from "./models/site.model";
import { CreateSiteDto } from "./dto/create-site.dto";
import { UpdateSiteDto } from "./dto/update-site.dto";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs/promises";
import * as path from "path";

@Injectable()
export class SitesService {
  private readonly dataPath = path.join(
    process.cwd(),
    "backend",
    "src",
    "assets",
    "sites.json",
  );

  private async readData(): Promise<Site[]> {
    try {
      const data = await fs.readFile(this.dataPath, "utf8");
      return JSON.parse(data).sites;
    } catch (error) {
      console.error("Error reading sites:", error);
      return [];
    }
  }

  private async writeData(sites: Site[]): Promise<void> {
    await fs.writeFile(
      this.dataPath,
      JSON.stringify({ sites }, null, 2),
      "utf8",
    );
  }

  async findAll(): Promise<Site[]> {
    return this.readData();
  }

  async findOne(id: string): Promise<Site> {
    const sites = await this.readData();
    const site = sites.find((site) => site.id === id);
    if (!site) {
      throw new NotFoundException(`Site with ID ${id} not found`);
    }
    return site;
  }

  async create(createSiteDto: CreateSiteDto): Promise<Site> {
    const sites = await this.readData();
    const site: Site = {
      id: uuidv4(),
      ...createSiteDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    sites.push(site);
    await this.writeData(sites);
    return site;
  }

  async update(id: string, updateSiteDto: UpdateSiteDto): Promise<Site> {
    const sites = await this.readData();
    const index = sites.findIndex((site) => site.id === id);
    if (index === -1) {
      throw new NotFoundException(`Site with ID ${id} not found`);
    }

    sites[index] = {
      ...sites[index],
      ...updateSiteDto,
      updatedAt: new Date(),
    };

    await this.writeData(sites);
    return sites[index];
  }

  async remove(id: string): Promise<void> {
    const sites = await this.readData();
    const index = sites.findIndex((site) => site.id === id);
    if (index === -1) {
      throw new NotFoundException(`Site with ID ${id} not found`);
    }
    sites.splice(index, 1);
    await this.writeData(sites);
  }
}

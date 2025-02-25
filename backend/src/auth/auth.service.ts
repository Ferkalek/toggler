import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { User } from "./models/user.model";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import * as fs from "fs/promises";
import * as path from "path";

@Injectable()
export class AuthService {
  private readonly dataPath = path.join(
    process.cwd(),
    "backend",
    "src",
    "assets",
    "users.json",
  );

  constructor(private jwtService: JwtService) {}

  private async readUsers(): Promise<User[]> {
    try {
      const data = await fs.readFile(this.dataPath, "utf8");
      return JSON.parse(data).users;
    } catch (error) {
      console.error("Error reading users:", error);
      return [];
    }
  }

  private async writeUsers(users: User[]): Promise<void> {
    await fs.writeFile(
      this.dataPath,
      JSON.stringify({ users }, null, 2),
      "utf8",
    );
  }

  async validateUser(email: string, password: string): Promise<User> {
    const users = await this.readUsers();
    const user = users.find((u) => u.email === email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const users = await this.readUsers();

    if (users.some((user) => user.email === registerDto.email)) {
      throw new ConflictException("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser: User = {
      id: uuidv4(),
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);
    await this.writeUsers(users);

    const payload = { sub: newUser.id, email: newUser.email };

    return {
      token: await this.jwtService.signAsync(payload),
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  }
}

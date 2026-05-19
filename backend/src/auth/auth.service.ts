import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<void> {
    if (dto.password !== dto.passwordAgain) {
      throw new BadRequestException("Mật khẩu nhập lại không khớp");
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (existingUser) {
      throw new BadRequestException("Username đã tồn tại");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    await this.prisma.user.create({
      data: {
        username: dto.username,
        password: passwordHash,
        sex: dto.sex,
        email: dto.email,
      },
    });
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (!user) {
      throw new UnauthorizedException("Sai username hoặc password");
    }

    const isPasswordCorrect = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException("Sai username hoặc password");
    }

    const accessToken = await this.signAccessToken(user.id, user.username);
    return { accessToken };
  }

  private async signAccessToken(
    userId: number,
    username: string,
  ): Promise<string> {
    return this.jwtService.signAsync({
      sub: userId,
      username,
    });
  }
}

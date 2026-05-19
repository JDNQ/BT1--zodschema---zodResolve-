"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(dto) {
        if (dto.password !== dto.passwordAgain) {
            throw new common_1.BadRequestException("Mật khẩu nhập lại không khớp");
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });
        if (existingUser) {
            throw new common_1.BadRequestException("Username đã tồn tại");
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
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });
        if (!user) {
            throw new common_1.UnauthorizedException("Sai username hoặc password");
        }
        const isPasswordCorrect = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordCorrect) {
            throw new common_1.UnauthorizedException("Sai username hoặc password");
        }
        const accessToken = await this.signAccessToken(user.id, user.username);
        return { accessToken };
    }
    async signAccessToken(userId, username) {
        return this.jwtService.signAsync({
            sub: userId,
            username,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
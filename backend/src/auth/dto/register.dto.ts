import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class RegisterDto {
  @ApiProperty({ example: "tai123" })
  @IsString()
  username!: string;

  @ApiProperty({ minLength: 6, example: "secret123" })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ minLength: 1, example: "secret123" })
  @IsString()
  passwordAgain!: string;

  @ApiProperty({
    enum: ["Nam", "Nữ", "Khác"],
    example: "Nam",
  })
  @IsString()
  @IsIn(["Nam", "Nữ", "Khác"])
  sex!: string;

  @ApiPropertyOptional({ example: "tai@example.com" })
  @IsOptional()
  @IsEmail()
  email?: string;
}

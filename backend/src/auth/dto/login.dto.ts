import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "tai123" })
  @IsString()
  username!: string;

  @ApiProperty({ minLength: 6, example: "secret123" })
  @IsString()
  @MinLength(6)
  password!: string;
}

import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(
    username: string,
    password: string,
  ): Promise<{ message: string }> {
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password.toString(), saltRounds);
    console.log(`Hashed Password when registered: ${hashedPassword}`);

    const newUser = new this.userModel({ username, password: hashedPassword });
    await newUser.save();
    return { message: 'User registered successfully' };
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ message: string; accessToken: string }> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password.toString(),
      user.password,
    );
    console.log(`Plain Password: ${password}`);
    console.log(`Hashed Password when login: ${user.password}`);
    console.log(`Is Password Valid: ${isPasswordValid}`);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { message: 'Login successful', accessToken };
  }
}

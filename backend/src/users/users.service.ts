import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Users } from './users.entity';
import { SignUpDto } from '../dto/signup.dto';
import { SignInDto } from '../dto/signin.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<Users> {
    const { name, email, password, organization } = signUpDto;

    // Check if user exists
    const userExists = await this.usersRepository.findOneBy({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      organization,
    });

    return this.usersRepository.save(user);
  }

  async signIn(signInDto: SignInDto): Promise<Users> {
    const { email, password } = signInDto;

    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return user;
  }
}

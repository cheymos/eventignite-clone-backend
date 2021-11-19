import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dtos/register.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create({
    username,
    email,
    password,
  }: RegisterDto): Promise<UserEntity> {
    const newUser = new UserEntity(username, email, password);

    return this.userRepository.save(newUser);
  }

  findBy(
    property: keyof UserEntity,
    value: string | number,
    withPassword?: boolean,
  ): Promise<UserEntity | undefined> {
    const selectedFields: (keyof UserEntity)[] = ['id', 'username', 'email'];

    if (withPassword) {
      selectedFields.push('password');
    }

    return this.userRepository.findOne(
      { [property]: value },
      { select: selectedFields },
    );
  }
}

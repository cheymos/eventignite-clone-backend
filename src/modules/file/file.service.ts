import {
  ImATeapotException,
  Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { config, S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FileService {
  private readonly s3Client = new S3();
  private readonly BUCKET = process.env.AWS_BUCKET as string;

  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {
    config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async upload(dataBuffer: Buffer, filename: string): Promise<FileEntity> {
    try {
      const { Key, Location } = await this.s3Client
        .upload({
          Bucket: this.BUCKET,
          Body: dataBuffer,
          Key: `${uuid()}-${filename}`,
        })
        .promise();

      const newFile = new FileEntity(Location, Key);
      const file = await this.fileRepository.save(newFile);

      return file;
    } catch (e) {
      throw new ImATeapotException(e);
    }
  }
}

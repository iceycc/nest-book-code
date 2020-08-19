import { Module } from '@nestjs/common';
import { AccessService } from './services/access/access.service';
import { AccessController } from './controllers/access/access.controller';
import { ToolsService } from '@src/services/tools/tools.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessEntity } from './entities/access.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccessEntity,
    ])
  ],
  providers: [
    AccessService,
    ToolsService,
  ],
  controllers: [AccessController]
})
export class AccessModule { }

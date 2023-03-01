import { Module } from '@nestjs/common';
import { UserResponse } from './user.response';

@Module({
  providers: [UserResponse],
  exports: [UserResponse],
})
export class ResponsesModule {}

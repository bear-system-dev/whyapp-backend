import { ApiProperty } from '@nestjs/swagger';

export class userQueriesFriendsDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  friendId: string;
}

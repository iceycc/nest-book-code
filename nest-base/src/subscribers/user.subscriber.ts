import { EntitySubscriberInterface, EventSubscriber, InsertEvent, } from 'typeorm';
import NodeAuth from 'node-auth0';
import { UserEntity } from 'src/modules/user/user.entity';

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<UserEntity> {
  private nodeAuth: NodeAuth;
  constructor () {
    this.nodeAuth = new NodeAuth();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  listenTo() {
    return UserEntity;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async beforeInsert(event: InsertEvent<UserEntity>) {
    console.log(`BEFORE POST INSERTED: `, event.entity);
    event.entity.password = await this.nodeAuth.makePassword(event.entity.password);
  }
}

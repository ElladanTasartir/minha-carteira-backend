import { ObjectID } from 'typeorm';

import ITokenProvider from '../models/ITokenProvider';

export default class JWTProvider implements ITokenProvider {
  public generate(id: ObjectID): string {
    return `Bearer token-${id}`;
  }
}

import { sign } from 'jsonwebtoken';
import { ObjectID } from 'typeorm';

import authConfig from '@config/auth';
import ITokenProvider from '../models/ITokenProvider';

export default class JWTProvider implements ITokenProvider {
  public generate(id: ObjectID): string {
    const { secret, expiresIn } = authConfig.jwt;

    return sign({}, secret, {
      expiresIn,
      subject: String(id),
    });
  }
}

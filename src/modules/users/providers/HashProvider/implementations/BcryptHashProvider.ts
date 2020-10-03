import bcrypt from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

class BcryptHashProvider implements IHashProvider {
  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

export default BcryptHashProvider;

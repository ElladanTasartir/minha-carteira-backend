import IHashProvider from '../models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async hash(password: string): Promise<string> {
    return password;
  }
}

export default interface IHashProvider {
  hash(password: string): Promise<string>;
  compare(payload: string, hashed: string): Promise<boolean>;
}

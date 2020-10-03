export default interface IHashProvider {
  hash(password: string): Promise<string>;
}

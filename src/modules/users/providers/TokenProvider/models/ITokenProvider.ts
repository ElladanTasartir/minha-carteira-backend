import { ObjectID } from 'typeorm';

export default interface ITokenProvider {
  generate(id: ObjectID): string;
}

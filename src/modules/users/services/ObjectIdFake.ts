import { ObjectID } from 'mongodb';

class ObjectIDFake extends ObjectID {
  generate(): null {
    return null;
  }
}

export default ObjectIDFake;

import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BcryptHashProvider from './HashProvider/implementations/BcryptHashProvider';

import ITokenProvider from './TokenProvider/models/ITokenProvider';
import JWTProvider from './TokenProvider/implementations/JWTProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);

container.registerSingleton<ITokenProvider>('TokenProvider', JWTProvider);

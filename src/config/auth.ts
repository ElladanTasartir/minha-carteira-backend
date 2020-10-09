import dotenv from 'dotenv';

dotenv.config();

export default {
  jwt: {
    secret: process.env.TOKEN_SECRET || 'secret',
    expiresIn: process.env.TOKEN_EXPIRATION,
  },
};

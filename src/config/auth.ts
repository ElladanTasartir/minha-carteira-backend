export default {
  jwt: {
    secret: process.env.TOKEN_SECRET || 'secret',
    expiresIn: process.env.TOKEN_EXPIRATION,
  },
};

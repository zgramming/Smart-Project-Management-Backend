import { jwtConstants } from 'src/utils/constant';

export default () => ({
  jwt_secret_key: process.env.JWT_SECRET_KEY || jwtConstants.secret,
});

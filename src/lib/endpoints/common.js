const DEVELOPMENT = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const LOCAL_URL = 'http://localhost:5000/';
const PUBLIC_URL = '';

const common = {
  DOMAIN_API: DEVELOPMENT ? LOCAL_URL : PUBLIC_URL,
};

export default common;

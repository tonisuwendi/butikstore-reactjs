const PRODUCTION = false;

const LOCAL_URL = 'http://localhost:5000/';
const PUBLIC_URL = '';

const common = {
  DOMAIN_API: PRODUCTION ? PUBLIC_URL : LOCAL_URL,
};

export default common;

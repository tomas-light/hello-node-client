import dotenv from 'dotenv';
import path from 'path';

const rootPath = path.join(__dirname, '..');
const envPath = path.join(rootPath, '.env');

function getEnvConfig() {
  const config = dotenv.config({ path: envPath });
  return Object.entries(config.parsed).reduce((config, [key, value]) => {
    if (value.indexOf('[') === 0) {
      config[key] = JSON.parse(value);
    }
    else {
      config[key] = value;
    }

    return config;
  }, {});
}

export { getEnvConfig };

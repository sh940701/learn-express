import { Sequelize } from 'sequelize';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

// config.json 파일의 경로를 계산
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.join(__dirname, 'config.json');

// 환경 변수 설정
const env = process.env.NODE_ENV || 'development';

// config.json 파일을 읽고 설정을 가져오기
async function getConfig() {
  try {
    const configFile = await readFile(configPath, 'utf-8');
    const config = JSON.parse(configFile);
    return config[env];
  } catch (error) {
    console.error('Error reading config file:', error);
    throw error;
  }
}

const config = await getConfig();
const sequelize = new Sequelize(config.database, config.username, config.password, config);

export default sequelize;

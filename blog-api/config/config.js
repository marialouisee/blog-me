import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { env } from 'process';

import { fileURLToPath } from 'url';

if (process.env.NODE_ENV === 'production') {
    dotenv.config();
} else {        // get directory(path not file (file location)) 
    const __dirname = dirname(fileURLToPath(import.meta.url));
    let envPath = path.join(__dirname, '..', '.env.dev');

    if(fs.existsSync(envPath)){
        dotenv.config({ path: envPath });
    } else {
        dotenv.config();
    }
}

const config = {
    env: env.NODE_ENV || 'development',
    frontendOrigin: env.FRONTEND_ORIGIN_DEV || env.FRONTEND_ORIGIN_PROD,
    secretKey: env.SECRET_KEY_DEV || env.SECRET_KEY_PROD,
    mongooseUrl: env.MONGOOSE_DB_DEV || env.MONGOOSE_DB_PROD
}

console.log(config.env)
export default config
// config.js
/* 
    !   Reference:
    *   
    *   https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
    *   
    *   
    *   
*/

if (process.env.NODE_ENV !== 'production') {
    
    const dotenv = require('dotenv');
    
    const result = dotenv.config();
    if (result.error) {
        throw result.error;
    };
};

module.exports = {
    endpoint: process.env.MONGODB_URI,
    masterKey: process.env.API_KEY,
    port: process.env.PORT,
    redisClient: process.env.REDISCLOUD_URL,
    redisClientDatabase: process.env.REDISCLOUD_DATABASE,
    redisClientUserName: process.env.REDISCLOUD_USERNAME,
    redisClientPassword: process.env.REDISCLOUD_PASSWORD
};
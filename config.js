// config.js
const dotenv = require('dotenv');

/* 
    *   Reference:
    *   
    *   https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html
    *   
    *   
    *   
*/

if (process.env.NODE_ENV !== 'production') {
    
    const result = dotenv.config();
    if (result.error) {
        throw result.error;
    };
};

module.exports = {
    endpoint: process.env.MONGODB_URI,
    masterKey: process.env.API_KEY,
    port: process.env.PORT
};
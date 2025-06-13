const JWT_USER_PASSWORD=process.env.JWT_USER_PASSWORD;

const JWT_ADMIN_PASSWORD= process.env.JWT_ADMIN_PASSWORD;

const MONGO_URL= process.env.MONGO_URL;

// we have created this config file to avoid the circular depency


module.exports={
    JWT_USER_PASSWORD,
    JWT_ADMIN_PASSWORD,
    MONGO_URL
}
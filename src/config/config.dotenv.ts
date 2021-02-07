const config = () => ({
    database: {
        host: process.env.TYPEORM_HOST,
        name: process.env.TYPEORM_DATABASE,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        port: process.env.TYPEORM_PORT,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
});

export default config;

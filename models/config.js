module.exports = {
    db: {
        host: process.env.MONGODB_ADDON_HOST || '104.248.145.111',
        port: process.env.MONGODB_ADDON_PORT || '27017',
        username: process.env.MONGODB_ADDON_USER || 'dev',
        password: process.env.MONGODB_ADDON_PASSWORD || 'khoathu148',
        db_name: process.env.MONGODB_ADDON_DB || 'chitahfx'
    }
}
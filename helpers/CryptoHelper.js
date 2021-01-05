const Crypto = require("crypto");
const algorithm = 'sha256';
const sizeSalt = 12
module.exports = {
    hash: (password) => {
        var salt = Crypto.randomBytes(sizeSalt).toString("hex")
        var hash = Crypto.createHash(algorithm)
        hash.update(password)
        hash.update(salt)
        return {
            salt: salt,
            hashed_password: hash.digest("hex")
        }
    },
    check: (password, salt, hashed_password) => {        
        var hash = Crypto.createHash(algorithm)
        hash.update(password)
        hash.update(salt)
        if (hash.digest('hex') == hashed_password) {
            return true;
        }
        return false
    }
}
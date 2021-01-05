const ServiceBase = require("../helpers/ServicesBase").ServiceBase

const CryptoHelper = require('../helpers/CryptoHelper')

class AccountService extends ServiceBase {
    constructor(model) {
        super(model);
    }
    async findByCredentials(username, email, password) {
        try {
            // Search for a user by email and password.
            const user = await this.model.findOne({
                $or: [{ email: email }, { username: username }],
                active: true,
            });
            if (!user) {
                return null
            }
            if (user.isdelete) {
                throw "The account has been disabled";
            }
            var result = CryptoHelper.check(password, user.salt, user.password)
            if (result) {
                return user
            }
            return null
        } catch (error) {
            return null;
        }
    }

    async comparePassword(id, password) {
        try {
            const user = await this.model.findOne({ _id: id });
            if (!user) {
                return false;
            }
            var result = CryptoHelper.check(password, user.salt, user.password)
            return result
        } catch (error) {
            return false
        }
    }

    async forgotPassword(email) {

        var isExist = await this.model.exists({ email: email })

        if (isExist) {
            await this.model.updateOne({ email: email }, { isForgot: true });
            return true
        }
        return false;
    }

    async activeAccount(email, code) {
        var user = await this.model.findOneAndUpdate({ email: email, activeCode: code, active: false }, { active: true });
        if (user) {
            return true;
        }
        return false;
    }

    async findAccount(name) {
        if (name) {
            return await this.model.find({ active: true, isdelete: false, username: { $regex: new RegExp(name, "i") } }, { username: 1, email: 1, image: 1, fullName: 1 });
        }
        return await this.model.find({ active: true, isdelete: false }, { username: 1, email: 1, image: 1, fullName: 1 });
    }

    async updateProfile(id, mUsername, mFullName, mBirthday, mGender) {
        var Info = {};

        if (mUsername && mUsername.length >= 4) {
            let username = await this.model.findOne({ username: mUsername });
            if (username != null) {
                throw { message: "Username has exits !!", code: "AC001" }
            }
            Info.username = mUsername;
        }
        if (mFullName) {
            Info.fullName = mFullName;
        }
        if (mBirthday) {
            Info.birthday = mBirthday;
        }
        if (mGender) {
            Info.gender = mGender;
        }

        var user = await this.model.findByIdAndUpdate(id, Info);

        if (user) {
            return true;
        }
        return false;
    }
    async auth(req, res, next) {
        try {
            var token = req.header('Authorization').replace('Bearer ', '')
            var payload = jwt.decode(token);
            var user = await this.model.findOne(
                { '_id': payload._id });
            jwt.verify(token, user.private_key);
            req.user = user;
            req.token = token;
            next();
        } catch (error) {
            // console.log('[error]', error);
            res.status(401).send({ error: 'Not authorized to access this resource' });
        }
    }
}

module.exports = { AccountService }
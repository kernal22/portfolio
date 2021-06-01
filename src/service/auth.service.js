const argon = require('argon2');
const { User } = require('../models/user.model');
const JwtHelperClass = require('../helper/jwt.helper');

class AuthService {
    static async signUp(requestData) {
        return new Promise(async (resolve, reject) => {
            try {
                const isEmail = await User.findOne({ email: requestData.email }).exec();
                if (isEmail) {
                    return resolve({ status: false, message: "Email Already Exist" });
                } else {
                    const password = await argon.hash(requestData.password, {
                        type: argon.argon2id,
                        hashLength: 45,
                        memoryCost: 2 ** 16,
                    });

                    let {
                        name,
                        email,
                        phone,
                        role,
                    } = requestData;

                    const _user = new User({
                        name,
                        email,
                        phone,
                        role,
                        password,
                    });
                    const data = await _user.save();
                    if (data)
                        return resolve({ status: true, data: "User created successfully" });
                    else
                        return resolve({ status: false, message: "Something went wrong" });
                }
            } catch (error) {
                return reject(error);
            }
        });
    }

    static async onLogin(requestData) {
        return new Promise(async (resolve, reject) => {
            try {

                const user = await User.findOne({
                    email: requestData.email,
                }).exec();
                if (user) {
                    const isPasswordMatched = await argon.verify(
                        user.password,
                        requestData.password
                    );
                    if (isPasswordMatched) {
                        const jwtHelper = new JwtHelperClass();
                        const token = jwtHelper.generateToken(user);
                        const {
                            _id,
                            name,
                            email,
                            phone,
                            role,
                        } = user;
                        return resolve({
                            status: true,
                            message: "Login In Successfully",
                            data: {
                                token: token,
                                user: {
                                    _id,
                                    name,
                                    email,
                                    phone,
                                    role,
                                },
                            },
                        });
                    } else {
                        return resolve({ status: false, message: "Wrong Password" });
                    }
                } else {
                    return resolve({ status: false, message: "Wrong Username" });
                }
            } catch (error) {
                return reject(error);
            }
        })

    }
}

module.exports = AuthService
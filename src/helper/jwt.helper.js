const jsonwebtoken = require('jsonwebtoken')
const secretKey = "mysecretkey";

class JwtHelperClass {
    constructor() { }

    generateToken(data) {
        // SIGNING OPTIONS
        const signOptions = {
            issuer: 'sanjay',
            expiresIn: "1d"
        };

        //Token generation
        let token = jsonwebtoken.sign(
            { _id: data._id, role: data.role },
            secretKey,
            signOptions
        );
        return token;
    }

    verifyToken(token) {

        // VERIFY OPTIONS
        const verifyOptions = {
            issuer: "sanjay",
            algorithms: ["RS256"],
        };

        // verify token and return
        try {
            const ValidToken = jsonwebtoken.verify(token, secretKey, verifyOptions);
            return ValidToken;
        } catch (error) {
            throw { message: "Token is invalid" };
        }
    }
}

module.exports = JwtHelperClass;

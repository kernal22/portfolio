const authService = require('../service/auth.service');

class AuthController {
    static async onLogin(req, res) {
        try {
            const data = await authService.onLogin(req.body);
            if (data.status) {
                console.log(data.data.token);
                res.session = { token: data.data.token, user: data.data.user }
                req.flash('success', data.message);
                res.redirect(301, '/admin/dashboard')
            } else {
                req.flash('error', data.message);

                return res.render('admin/auth/login', { error: req.flash('error') })
            }
        } catch (error) {
            console.log(error);
            req.flash('error', 'Internal Server Error');
            return res.render('admin/auth/login')
        }

    }
    static async signUp(req, res) {
        try {
            const data = await authService.signUp(req.body);
            return res.json(data);
        } catch (error) {
            console.log(error)
            return res.status(502).json(error)
        }
    }
}

module.exports = AuthController
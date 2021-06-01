const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');


router.get('/login', (req, res) => {
    res.render('admin/auth/login')
})

router.post('/login', AuthController.onLogin)

router.post('/sign-up', AuthController.signUp)

module.exports = router;
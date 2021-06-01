const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('admin/auth/login')
})

router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard/index')
})

module.exports = router;
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('web/index')
})

module.exports = router;
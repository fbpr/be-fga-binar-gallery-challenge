const router = require('express').Router();
const authRoute = require('../routes/auth.route')
const imageRoute = require('../routes/images.route')

router.use('/v1/images', imageRoute);
router.use('/v1/auth', authRoute);

module.exports = router
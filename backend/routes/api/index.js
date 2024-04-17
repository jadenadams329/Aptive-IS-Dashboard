const router = require("express").Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const leadsRouter = require('./leads.js')
const salesRouter = require('./sale_details.js')
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/leads', leadsRouter)

router.use('/sales', salesRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});
module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
	check('email')
	  .exists({ checkFalsy: true })
	  .isEmail()
	  .withMessage('Please provide a valid email.'),
	check('password')
	  .exists({ checkFalsy: true })
	  .isLength({ min: 6 })
	  .withMessage('Password must be 6 characters or more.'),
	check('firstName')
		.exists({checkFalsy: true})
		.isLength({min: 1})
		.withMessage('First Name must be 1 character or more'),
	check('lastName')
		.exists({checkFalsy: true})
		.isLength({min: 1})
		.withMessage('Last Name must be 1 character or more'),
	check('role')
		.exists({checkFalsy: true})
		.withMessage('Role must be assigned'),
	handleValidationErrors
  ];

// Sign up
router.post("/", validateSignup ,async (req, res) => {
	const { email, password, firstName, lastName, role } = req.body;
	const hashedPassword = bcrypt.hashSync(password);
	const user = await User.create({ email, hashedPassword, firstName, lastName, role });

	const safeUser = {
		id: user.id,
		email: user.email,
		firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
	};

	await setTokenCookie(res, safeUser);

	return res.json({
		user: safeUser,
	});
});

module.exports = router;

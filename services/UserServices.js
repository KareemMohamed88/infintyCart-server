const UserModel = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

exports.registertion = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await UserModel.findOne({ username });
  user && res.json({ msg: "user already existed" });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new UserModel({ username, email, password: hashedPassword });

  await newUser.save();
  res.status(201).json({ data: newUser });
});

exports.login = asyncHandler(async (req, res) => {
  const user = await UserModel.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				username: user.username,
				email: user.email,
			},
			process.env.SECRET
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
});

import User from "../models/User.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please provide all values" });
  }

  try {
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res
        .status(400)
        .json({ msg: "Email id already in use. Please provide another one" });
    }

    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    res
      .status(201)
      .json({ user: { email: user.email, name: user.name, token: token } });
  } catch (error) {
    if (
      error.message ==
      "User validation failed: password: Path `password` (`may`) is shorter than the minimum allowed length (5)."
    ) {
      return res
        .status(500)
        .json({ msg: "Your password must be at least 5 characters long" });
    }
    res
      .status(500)
      .json({ msg: "Something went wrong please try again later" });
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide all values" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Incorrect email id" });
    }

    const comparePassword = await user.comparePassword(password);
    if (!comparePassword) {
      return res.status(404).json({ msg: "Incorrect password" });
    }

    const token = user.createJWT();
    res
      .status(200)
      .json({ user: { email: user.email, name: user.name, token: token } });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong please try again later" });
    console.log(error);
  }
};

export const googleLogin = async (req, res) => {
  const { name, email, token, googleId } = req.body;
  console.log(req);
  console.log(name, email, token, googleId);
  try {
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res
        .status(200)
        .json({ user: { name: name, email: email, token: token } });
    }

    const user = await User.create({ name, email, googleId });
    return res
      .status(200)
      .json({ user: { email: user.email, name: user.name, token: token } });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong please try again later" });
    console.log(error);
  }
};

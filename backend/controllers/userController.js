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
      .json({ user: { email: user.email, name: user.name }, token });
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

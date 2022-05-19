import Travel from "../models/Travel.js";

export const createTravel = async (req, res) => {
  const { title, description, image } = req.body;
  if (!title || !description || !image) {
    return res.status(400).json({ msg: "Please provide all required values" });
  }
  try {
    req.body.creatorId = req.user.userId;
    const travel = await Travel.create(req.body);
    res.status(201).json({ msg: "Created successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const getAllTravels = async (req, res) => {
  try {
    const travels = await Travel.find();
    res.status(200).json(travels);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const getSingleTravel = async (req, res) => {
  const { id } = req.params;
  try {
    const travel = await Travel.findOne({ _id: id });
    console.log(travel);
    if (!travel) {
      return res.status(400).json({ msg: "No travel blog found" });
    }
    return res.status(200).json(travel);
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

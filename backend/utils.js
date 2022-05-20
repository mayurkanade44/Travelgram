const checkPermission = (reqUserId, resourceUserId) => {
  if (reqUserId === resourceUserId.toString()) return;

  return res.status(403).json({ msg: "Not authorized to access this route" });
};

export default checkPermission;

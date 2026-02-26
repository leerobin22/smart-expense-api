export const getHealth = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running 🚀",
  });
};

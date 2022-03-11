const auth = require("../../../middleware/auth");
const { hashPassword } = require("../../../utils");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/profile/customers");
  },
  filename: (req, file, cb) => {
    cb(null, req.user.id + "." + file.mimetype.split("/")[1]);
  },
});
const upload = multer({ storage: storage });

module.exports = (app, usecase) => {
  const getProfile = async (req, res) => {
    try {
      const payload = {
        id: req.user.id,
        type: req.user.type,
      };
      const data = await usecase.getProfile(payload);
      res.send(data);
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  };

  const updatePassword = async (req, res) => {
    try {
      const body = {
        oldPassword: req.body.oldPassword,
        newPassword: hashPassword(req.body.newPassword),
      };
      await usecase.updatePassword(req.user.id, body);
      res.status(200).send({
        message: "success",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const updateCustomerProfile = async (req, res) => {
    try {
      const body = {
        name: req.body.name,
        phone: req.body.phone,
      };
      await usecase.updateCustomerProfile(req.user.id, body);
      res.status(200).send({
        message: "success",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const updateCustomerProfilePicture = async (req, res) => {
    try {
      const body = {
        profilePicture:
          "public/assets/profile/customers/" + req.body.profilePicture,
      };
      await usecase.updateCustomerProfilePicture(req.user.id, body);
      res.status(200).send({
        message: "success",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  app.use(auth);
  app.get("/me", getProfile);
  app.put("/profile/customers", updateCustomerProfile);
  app.put("/update-password", updatePassword);
  app.put(
    "/profile/customers-photo",
    upload.single("foto"),
    updateCustomerProfilePicture
  );
};

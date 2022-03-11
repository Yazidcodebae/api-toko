const auth = require("../../../middleware/auth");
const { hashPassword } = require("../../../utils");
module.exports = (app, usecase) => {
  const getAllUsers = async (_, res) => {
    try {
      const data = await usecase.getAllUsers();
      res.send(data);
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  };

  const getUsersById = async (req, res) => {
    try {
      const data = await usecase.getUsersById(req.params.id);
      res.send(data);
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  };

  const createUsers = async (req, res) => {
    try {
      const body = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword(req.body.password),
        phone: req.body.phone,
      };
      await usecase.createUsers(body);
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const updateUsersById = async (req, res) => {
    try {
      const body = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword(req.body.password),
        phone: req.body.phone,
      };
      await usecase.updateUsers(req.params.id, body);
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const deleteUsersById = async (req, res) => {
    try {
      await usecase.deleteUsers(req.params.id);
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  app.use(auth);
  app.get("/users", getAllUsers);
  app.get("/users/:id", getUsersById);
  app.post("/users", createUsers);
  app.put("/users/:id", updateUsersById);
  app.delete("/users/:id", deleteUsersById);
};

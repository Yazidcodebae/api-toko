const { hashPassword } = require("../../../utils");

module.exports = (app, usecase) => {
  const register = async (req, res) => {
    try {
      const body = {
        email: req.body.email,
        password: hashPassword(req.body.password),
      };
      await usecase.register(body, req.body.type);
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const login = async (req, res) => {
    try {
      const data = await usecase.login(
        req.body.email,
        req.body.password,
        req.body.type
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  app.post("/register", register);
  app.post("/login", login);
};

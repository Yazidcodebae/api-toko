const authMiddleware = require("../../../middleware/auth");
module.exports = (app, usecase) => {
  const addCarts = async (req, res) => {
    try {
      const body = {
        customer_id: req.user.type_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
      };
      await usecase.addCarts(body);
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const updateCartsById = async (req, res) => {
    try {
      const body = {
        customer_id: req.user.type_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
      };
      await usecase.updateCarts(req.params.id, body);
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const deleteCartsById = async (req, res) => {
    try {
      await usecase.deleteCartsById(req.params.id);
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const deleteAllCartsByCustomer = async (req, res) => {
    try {
      await usecase.deleteAllCartsByCustomer(req.user.type_id);
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const getAllCarts = async (req, res) => {
    try {
      const pagination = {
        perPage: req.query.perPage,
        currentPage: req.query.currentPage,
      };
      const data = await usecase.getAllCartsByCustomer(
        req.user.type_id,
        pagination
      );
      res.send(data);
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  };

  const getCartsById = async (req, res) => {
    try {
      const data = await usecase.getCartsById(req.params.id);
      res.send(data);
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  };

  app.use(authMiddleware);
  app.post("/carts", addCarts);
  app.put("/carts/:id", updateCartsById);
  app.delete("/carts", deleteAllCartsByCustomer);
  app.delete("/carts/:id", deleteCartsById);
  app.get("/carts", getAllCarts);
  app.get("/carts/:id", getCartsById);
};

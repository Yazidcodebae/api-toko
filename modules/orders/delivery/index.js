const authMiddleware = require("../../../middleware/auth");
module.exports = (app, usecase) => {
  const checkout = async (req, res) => {
    try {
      const body = {
        customer_id: req.user.type_id,
        address_id: req.body.address_id,
        coupon_id: req.body.coupon_id,
        products: req.body.products,
        carts: req.body.carts,
        total: req.body.total,
      };
      await usecase.checkout(body);
      await usecase.deleteCartsByIds(req.body.carts);

      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const getAllOrdersByCustomer = async (req, res) => {
    const STATUS = [
      "waiting",
      "ordered",
      "packed",
      "sent",
      "completed",
      "canceled",
      "all",
    ];
    try {
      const pagination = {
        perPage: req.query.perPage,
        currentPage: req.query.currentPage,
      };

      let status = req.query?.status;
      if (!STATUS.includes(status)) {
        res.statusCode = 400;
        return res.send("invalid query");
      }

      const data = await usecase.getAllOrdersByCustomer(
        req.user.type_id,
        pagination,
        status
      );

      res.send(data);
    } catch (error) {
      console.log("error", error);
      res.statusCode = 500;
      res.send(error);
    }
  };

  const getOrdersById = async (req, res) => {
    try {
      const data = await usecase.getOrdersById(req.params.id);
      res.send(data);
    } catch (error) {
      res.statusCode = 500;
      res.send(error);
    }
  };

  const cancelOrders = async (req, res) => {
    try {
      await usecase.cancelOrders(req.params.id);
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  const completeOrders = async (req, res) => {
    try {
      await usecase.completeOrders(req.params.id);
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };

  // const updateCartsById = async(req, res)=>{
  //     try {
  //         const body = {
  //             user_id: req.user.id,
  //             product_id: req.body.product_id,
  //             quantity: req.body.quantity,
  //         }
  //         await usecase.updateCarts(req.params.id, body)
  //         res.status(200).json({
  //             message: "success"
  //         })
  //     } catch (error) {
  //         res.status(500).json(error)
  //     }
  // }

  // const deleteCartsById= async(req, res)=>{
  //     try {
  //         await usecase.deleteCarts(req.params.id)
  //         res.status(200).json({
  //             message: "success"
  //         })
  //     } catch (error) {
  //         res.status(500).json(error)
  //     }
  // }

  // const deleteAllCarts= async(req, res)=>{
  //     try {
  //         await usecase.deleteAllCarts(req.user.id)
  //         res.status(200).json({
  //             message: "success"
  //         })
  //     } catch (error) {
  //         res.status(500).json(error)
  //     }
  // }

  app.use(authMiddleware);
  app.post("/checkout", checkout);
  app.get("/orders", getAllOrdersByCustomer);
  app.get("/orders/:id", getOrdersById);
  app.patch("/orders/:id/cancel", cancelOrders);
  app.patch("/orders/:id/complete", completeOrders);
  // app.delete("/carts", deleteAllCarts)
  // app.delete("/carts/:id", deleteCartsById)
  // // app.get("/carts", getAllCarts)
};

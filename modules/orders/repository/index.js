const tableHeader = "orders";
const tableDetail = "orders_detail";

module.exports = (knex) => {
  module.checkout = (body) => {
    knex.transaction(function (trx) {
      products = body.products;
      return trx
        .insert({
          total: body.total,
          address_id: body.address_id,
          customer_id: body.customer_id,
          coupon_id: body.coupon_id,
        })
        .into(tableHeader)
        .then((ids) => {
          const newProduct = products.map((product) => {
            return {
              order_id: ids[0],
              product_id: product.product_id,
              quantity: product.quantity,
              status: "waiting",
            };
          });
          return trx(tableDetail).insert(newProduct);
        });
    });
  };

  module.deleteCartsByIds = (ids) => {
    return knex.table("carts").whereIn("id", ids).del();
  };

  module.getAllOrdersByCustomer = async (customerId, pagination, status) => {
    try {
      const checkStatus = status === "all";
      let result = await knex
        .select(
          "orders.id as _id",
          "orders.total as _total",
          "orders_detail.status as _status",
          "orders_detail.quantity as _quantity",
          "addresses.id as _address_id",
          "addresses.address as _address_address",
          "coupons.id as _coupon_id",
          "coupons.description as _coupon_description",
          "coupons.percentage as _coupon_percentage",
          "coupons.fixedDiscount as _coupon_fixedDiscount",
          "products.id as _product_id",
          "products.name as _product_name",
          "products.description as _product_description",
          "products.image as _product_image",
          "products.price as _product_price",
          "products.stock as _product_stock"
        )
        .where("orders.customer_id", customerId)
        .where(
          "orders_detail.status",
          checkStatus ? "!=" : "=",
          checkStatus ? "" : status
        )
        .table(tableHeader)
        .innerJoin(tableDetail, "orders_detail.order_id", "=", "orders.id")
        .innerJoin("products", "products.id", "=", "orders_detail.product_id")
        .innerJoin("addresses", "addresses.id", "=", "orders.address_id")
        .innerJoin("coupons", "coupons.id", "=", "orders.coupon_id")
        .paginate(pagination);
      const data = result.data.map((item) => {
        return {
          id: item._id,
          status: item._status,
          quantity: item._quantity,
          product: {
            id: item._product_id,
            name: item._product_name,
            description: item._product_description,
            image: item._product_image,
            price: item._product_price,
            stock: item._product_stock,
          },
          address: {
            id: item._address_id,
            address: item._address_address,
          },
        };
      });
      return {
        data: data,
        pagination: result.pagination,
      };
    } catch (error) {
      throw new Error("Error: " + error.message);
    }
  };

  // todo: update
  module.getOrdersById = async (id) => {
    const result = await knex
      .select(
        "orders.id as _id",
        "orders.total as _total",
        "orders.status as _status",
        "orders_detail.quantity as _quantity",
        "addresses.id as _address_id",
        "addresses.address as _address_address",
        "coupons.id as _coupon_id",
        "coupons.description as _coupon_description",
        "coupons.percentage as _coupon_percentage",
        "coupons.fixedDiscount as _coupon_fixedDiscount",
        "products.id as _product_id",
        "products.name as _product_name",
        "products.description as _product_description",
        "products.image as _product_image",
        "products.price as _product_price",
        "products.stock as _product_stock"
      )
      .where("orders.id", id)
      .table(tableHeader)
      .innerJoin(tableDetail, "orders_detail.order_id", "=", "orders.id")
      .innerJoin("carts", "carts.id", "=", "orders_detail.cart_id")
      .innerJoin("products", "products.id", "=", "carts.product_id")
      .innerJoin("addresses", "addresses.id", "=", "orders.address_id")
      .innerJoin("coupons", "coupons.id", "=", "orders.coupon_id");

    const newData = result.reduce((obj, item) => {
      if (obj[item._id]) {
        obj[item._id].cart.push({
          id: item._cart_id,
          quantity: item._cart_quantity,
          product: {
            id: item._product_id,
            name: item._product_name,
            description: item._product_description,
            image: item._product_image,
            price: item._product_price,
            stock: item._product_stock,
          },
        });
      } else {
        obj[item._id] = {
          id: item._id,
          total: item._total,
          status: item._status,
          cart: [
            {
              id: item._cart_id,
              quantity: item._cart_quantity,
              product: {
                id: item._product_id,
                name: item._product_name,
                description: item._product_description,
                image: item._product_image,
                price: item._product_price,
                stock: item._product_stock,
              },
            },
          ],
          address: {
            id: item._address_id,
            address: item._address_address,
          },
          coupon: {
            id: item._coupon_id,
            description: item._coupon_description,
            percentage: item._coupon_percentage,
            fixedDiscount: item._coupon_fixedDiscount,
          },
        };
      }
      return obj;
    }, {});
    return Object.values(newData)[0];
  };

  module.completeOrders = (id) => {
    return knex.table(tableHeader).where("id", id).update({
      status: "completed",
    });
  };

  module.cancelOrders = (id) => {
    return knex.table(tableHeader).where("id", id).update({
      status: "canceled",
    });
  };

  return module;
};

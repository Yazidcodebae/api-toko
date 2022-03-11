const table = "carts";

module.exports = (knex) => {
  module.addCarts = (body) => {
    return knex.table(table).insert(body);
  };
  module.updateCarts = (id, body) => {
    return knex.table(table).where("id", id).update(body);
  };
  module.deleteCartsById = (id) => {
    return knex.table(table).where("id", id).del();
  };
  module.deleteAllCartsByCustomer = (customerId) => {
    return knex.table(table).where("customer_id", customerId).del();
  };
  module.getAllCartsByCustomer = async (customerId, pagination) => {
    const result = await knex
      .select(
        "carts.id as _id",
        "carts.quantity as _quantity",
        "products.id as _product_id",
        "products.name as _product_name",
        "products.description as _product_description",
        "products.image as _product_image",
        "products.price as _product_price"
      )
      .where("customer_id", customerId)
      .table(table)
      .innerJoin("products", "carts.product_id", "=", "products.id")
      .paginate(pagination);

    return {
      data: result.data.map((data) => {
        return {
          id: data._id,
          quantity: data._quantity,
          product: {
            id: data._product_id,
            name: data._product_name,
            description: data._product_description,
            image: data._product_image,
            price: data._product_price,
          },
        };
      }),
      pagination: result.pagination,
    };
  };

  module.getCartsById = (id) => {
    return new Promise((resolve, reject) => {
      knex
        .select(
          "carts.id as _id",
          "carts.quantity as _quantity",
          "products.id as _product_id",
          "products.name as _product_name",
          "products.description as _product_description",
          "products.image as _product_image",
          "products.price as _product_price"
        )
        .where("carts.id", id)
        .first()
        .table(table)
        .innerJoin("products", "carts.product_id", "=", "products.id")
        .then((res) =>
          resolve({
            id: res._id,
            quantity: res._quantity,
            product: {
              id: res._product_id,
              name: res._product_name,
              description: res._product_description,
              image: res._product_image,
              price: res._product_price,
            },
          })
        )
        .catch((err) => reject(err));
    });
  };

  module.getCartsCustomerByProductId = (id) => {
    return new Promise((resolve, reject) => {
      knex
        .select(
          "carts.id as _id",
          "carts.quantity as _quantity",
          "products.id as _product_id",
          "products.name as _product_name",
          "products.description as _product_description",
          "products.image as _product_image",
          "products.price as _product_price"
        )
        .where("products.id", id)
        .first()
        .table(table)
        .innerJoin("products", "carts.product_id", "=", "products.id")
        .then((res) => {
          if (!res) {
            resolve();
          } else {
            resolve({
              id: res._id,
              quantity: res._quantity,
              product: {
                id: res._product_id,
                name: res._product_name,
                description: res._product_description,
                image: res._product_image,
                price: res._product_price,
              },
            });
          }
        })
        .catch((err) => {
          console.log("asasasasa", err);
          reject(err);
        });
    });
  };
  return module;
};

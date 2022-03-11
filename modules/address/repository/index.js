const table = "addresses";
module.exports = (knex) => {
  module.getAllAddressByUserId = (userId, pagination) => {
    return knex
      .select(
        "addresses.id",
        "addresses.address",
        "addresses.name",
        "addresses.description",
        "addresses.phone"
      )
      .where("users.id", userId)
      .table("users")
      .innerJoin("customers", "customers.user_id", "=", "users.id")
      .innerJoin(
        "customers_addresses",
        "customers_addresses.customer_id",
        "=",
        "customers.id"
      )
      .innerJoin(
        "addresses",
        "customers_addresses.address_id",
        "=",
        "addresses.id"
      )
      .paginate(pagination);
  };
  module.getAddressById = (id) => {
    return knex.select().where("id", id).first().table(table);
  };
  module.createAddress = (customerId, payload) => {
    knex.transaction(function (trx) {
      return trx
        .insert({
          address: payload.address,
          description: payload.description,
          name: payload.name,
          phone: payload.phone,
        })
        .into(table)
        .then((ids) => {
          const customerAddress = {
            customer_id: customerId,
            address_id: ids[0],
          };
          return trx("customers_addresses").insert(customerAddress);
        });
    });
  };
  module.updateAddressById = (id, body) => {
    return knex.table(table).where("id", id).update(body);
  };
  module.deleteAddressById = (id) => {
    return knex.table(table).where("id", id).del();
  };
  return module;
};

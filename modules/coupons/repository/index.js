const table = "coupons";
module.exports = (knex) => {
  module.getAllCouponsByCustomer = async (customerId, pagination) => {
    const couponIds = await knex
      .select()
      .table("orders")
      .where("customer_id", customerId)
      .groupBy("coupon_id");

    return knex
      .select("code", "description", "fixedDiscount", "id", "percentage")
      .table(table)
      .whereNotIn(
        "id",
        couponIds.map((c) => c.coupon_id)
      )
      .paginate(pagination);
  };
  module.getCouponsById = (id) => {
    return knex.select().where("id", id).first().table(table);
  };
  module.createCoupons = (body) => {
    return knex.table(table).insert(body);
  };
  module.updateCoupons = (id, body) => {
    return knex.table(table).where("id", id).update(body);
  };
  module.deleteCoupons = (id, body) => {
    return knex.table(table).where("id", id).del();
  };
  return module;
};

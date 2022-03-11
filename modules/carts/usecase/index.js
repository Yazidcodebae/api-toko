module.exports = (repository) => {
  module.addCarts = async (body) => {
    const res = await repository.getCartsCustomerByProductId(body.product_id);
    if (res) {
      const data = {
        customer_id: body.customer_id,
        product_id: body.product_id,
        quantity: res.quantity + body.quantity,
      };
      return repository.updateCarts(res.id, data);
    } else {
      return repository.addCarts(body);
    }
  };
  module.updateCarts = (id, body) => {
    return repository.updateCarts(id, body);
  };
  module.deleteCartsById = (id) => {
    return repository.deleteCartsById(id);
  };
  module.deleteAllCartsByCustomer = (customerId) => {
    return repository.deleteAllCartsByCustomer(customerId);
  };
  module.getAllCartsByCustomer = (customerId, pagination) => {
    return repository.getAllCartsByCustomer(customerId, pagination);
  };
  module.getCartsById = (id) => {
    return repository.getCartsById(id);
  };
  return module;
};

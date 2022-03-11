module.exports = (repository) => {
  module.checkout = (body) => {
    return repository.checkout(body);
  };
  module.getAllOrdersByCustomer = (customerId, pagination, status) => {
    return repository.getAllOrdersByCustomer(customerId, pagination, status);
  };
  module.getOrdersById = (id) => {
    return repository.getOrdersById(id);
  };
  module.completeOrders = (id) => {
    return repository.completeOrders(id);
  };
  module.cancelOrders = (id) => {
    return repository.cancelOrders(id);
  };
  module.deleteCartsByIds = (ids) => {
    return repository.deleteCartsByIds(ids);
  };
  return module;
};

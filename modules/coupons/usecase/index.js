module.exports = (repository) => {
  module.getAllCouponsByCustomer = (customerId, pagination) => {
    return repository.getAllCouponsByCustomer(customerId, pagination);
  };
  module.getCouponsById = (id) => {
    return repository.getCouponsById(id);
  };
  module.createCoupons = (body) => {
    return repository.createCoupons(body);
  };
  module.updateCoupons = (id, body) => {
    return repository.updateCoupons(id, body);
  };
  module.deleteCoupons = (id) => {
    return repository.deleteCoupons(id);
  };
  return module;
};

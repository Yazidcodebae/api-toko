module.exports = (repository) => {
  module.getAllAddressByUserId = (userId, pagination) => {
    return repository.getAllAddressByUserId(userId, pagination);
  };
  module.getAddressById = (id) => {
    return repository.getAddressById(id);
  };
  module.createAddress = (customerId, body) => {
    return repository.createAddress(customerId, body);
  };
  module.updateAddressById = (id, body) => {
    return repository.updateAddressById(id, body);
  };
  module.deleteAddressById = (id) => {
    return repository.deleteAddressById(id);
  };
  return module;
};

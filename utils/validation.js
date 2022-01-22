const validateModileNumber = (mobile) => {
  if(mobile && mobile.length === 12){
    if(new RegExp(/^(\+)(94)(\d){9}$/).test(mobile)){
      return mobile;
    }
  }
  return null;
};

module.exports = {
  validateModileNumber,
};

function checkSellerPermission(req, res, next){
  if(req.user.type == 'seller'){
    next();
  }
  else {
    res.status(401).json('Não é vendedor: Acesso Negado.')
  }
}

module.exports = checkSellerPermission;
function checkPermissionBoth(req, res, next){
  if(req.user.type == 'seller'){

    const {} = req;
  
    if(req.query.codigo != req.user.id){
      res.status(401).json('Acesso Negado.');
    } else {
      next();
    }
  } else if(req.user.type == 'adm'){
    next();
  }
  else {
    res.status(401).json('Acesso Negado.');
  }
}

module.exports = checkPermissionBoth;
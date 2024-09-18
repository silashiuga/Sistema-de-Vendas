function checkAdmPermission(req, res, next){
  if(req.user.type == 'adm'){
    next();
  }
  else {
    res.status(401).json('Não é Admininstrador: Acesso Negado.');
  }
}

module.exports = checkAdmPermission;
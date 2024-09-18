const jwt = require('jsonwebtoken');


module.exports = (req , res, next) => {
  const token = req.header('authorization-token');
  if(!token){
    console.log('erro')
    return res.status(401).send('Acesso Negado.');
  }
  try{
    let userVerified = "";
    userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = userVerified;
    console.log(req.user)
    next();
  } catch(error){
    res.status(401).send('Acesso Negado.');
  }
}


const jwt = require("jsonwebtoken");

const SECRET_KEY = "abacate15";

/**
 * Gera o token de autenticação para o usuário que expira em 1h.
 *
 * @param {object} usuario objeto plano contendo os dados do usuário.
 * @return {string} Token de autenticação.
 */
const generateToken = usuario => {
  delete usuario.senha;

  let token = jwt.sign(usuario, SECRET_KEY, {
    encoding: "UTF8",
    expiresIn: "15d"
  });

  return token;
};

/**
 * Middleware que verifica a validade e decodifica o token de autenticação presente no header 'x-access-token'.
 *
 * @param {request} req
 * @param {response} res
 * @param {next} next
 */
const checkTokenMiddleware = (req, res, next) => {
  let token = req.headers["x-access-token"];
  checkToken(token)
    .then(decoded => {
      req.decodedToken = decoded;
      next();
    })
    .catch(ex => {
      console.error("Não foi possível decodificar o token:", token, ex);
      res
        .status(401)
        .json({ sucesso: false, msg: "Não foi possível decodificar o token" });
    });
};

/**
 * Valida a autenticidade e decodifica o token.
 *
 * @param {string} token
 * @return {Promise}
 */
const checkToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  generateToken,
  checkToken,
  checkTokenMiddleware
};

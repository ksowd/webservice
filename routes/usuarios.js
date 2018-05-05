const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { generateToken, checkTokenMiddleware } = require("../utils/JWT");

const { usuario: Usuario } = require("../models");

router.get("/", checkTokenMiddleware, (req, res) => {
  Usuario.findAll({})
    .then(r => {
      console.log(r.map(i => i.dataValues));
      res.json({});
    })
    .catch(err => res.status(400).json({}));
});

router.post("/login", (req, res) => {
  if (!req.body.cnpj || !req.body.senha) {
    return res.status(400).send();
  }
  Usuario.findOne({ where: { cnpj: req.body.cnpj } })
    .then(async user => {
      bcrypt
        .compare(req.body.senha, user.senha)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.nome
            };

            res.json({ success: true, token: generateToken(payload) });
          } else {
            res.status(400).json({ error: "Senha incorreta" });
          }
        })
        .catch(err => res.status(400).send());
    })
    .catch(err => res.status(404).send());
});

router.post("/cadastro", (req, res) => {
  Usuario.create({ ...req.body })
    .then(usuario => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(usuario.senha, salt, (err, hash) => {
          if (err) throw err;
          usuario.senha = hash;
          usuario.save();
          res.json({ success: true, user: usuario.dataValues });
        });
      });
    })
    .catch(err =>
      res.status(400).send({ error: "Falha ao inserir no banco!" })
    );
});

router.delete("/:id", checkTokenMiddleware, (req, res) => {
  Usuario.findById(req.params.id)
    .then(r => {
      r.destroy();
      res.json({ success: true });
    })
    .catch(err => {
      res.status(404).json({ error: "Usuário não existe" });
    });
});

router.put("/:id", checkTokenMiddleware, (req, res) => {
  Usuario.findById(req.params.id)
    .then(r => {
      r
        .update({ ...req.body })
        .then(() => res.json({ success: true }))
        .catch(err => res.status(400).json({ success: false }));
    })
    .catch(err => res.status(404).json({ error: "Usuário não existe" }));
});

module.exports = router;

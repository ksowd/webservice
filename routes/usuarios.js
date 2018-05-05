const express = require("express");
const router = express.Router();

const { usuario: Usuario } = require("../models");

router.post("/cadastro", (req, res, next) => {
  Usuario.create({ ...req.body })
    .then(r => res.json({ success: true, user: r.dataValues }))
    .catch(err =>
      res.status(400).send({ error: "Falha ao inserir no banco!" })
    );
});

router.delete("/:id", (req, res) => {
  Usuario.findById(req.params.id)
    .then(r => {
      r.destroy();
      res.json({ success: true });
    })
    .catch(err => {
      res.status(404).json({ error: "Usuário não existe" });
    });
});

router.put("/:id", (req, res) => {
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

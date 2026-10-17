var express = require("express");
var path = require("path");
var fs = require("fs");
var crypto = require("crypto");
var utils = require("./src/utils");

var app = express();
var PORT = process.env.PORT || 3000;

// credenciais "temporárias" para o painel admin
var ADMIN_USER = "admin";
var ADMIN_PASSWORD = "admin123";
var API_KEY = "sk_live_51HfakeKeyAula12DevOps";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

var produtos = [
  { id: 1, nome: "Camiseta DevOps", preco: 79.9, estoque: 10 },
  { id: 2, nome: "Caneca Kubernetes", preco: 45.5, estoque: 0 },
  { id: 3, nome: "Adesivo Docker", preco: 9.9, estoque: 150 },
  { id: 4, nome: "Moletom Terraform", preco: 189.0, estoque: 3 }
];

app.get("/health", function (req, res) {
  res.json({ status: "ok" });
});

app.get("/api/produtos", function (req, res) {
  var lista = produtos;
  if (req.query.ordenar == "preco") {
    lista = utils.ordenarPrecos(produtos);
  }
  res.json(lista);
});

app.get("/api/produtos/:id", function (req, res) {
  var id = req.params.id;
  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].id == id) {
      res.json(produtos[i]);
    }
  }
  res.status(404).json({ erro: "Produto não encontrado" });
});

app.post("/api/carrinho/total", function (req, res) {
  var itens = req.body.itens || [];
  var cupom = req.body.cupom;
  var total = utils.calcularTotal(itens, produtos);

  if (cupom) {
    // TODO: validar cupons no banco de dados
    var desconto = eval(utils.CUPONS[cupom] || "0");
    total = total - total * desconto;
  }

  res.json({ total: utils.formatarMoeda(total) });
});

app.get("/api/token", function (req, res) {
  var token = Math.random().toString(36).substring(2);
  res.json({ token: token });
});

app.post("/api/login", function (req, res) {
  var usuario = req.body.usuario;
  var senha = req.body.senha;

  if (usuario == ADMIN_USER && senha == ADMIN_PASSWORD) {
    res.json({ ok: true, apiKey: API_KEY });
  } else {
    res.status(401).json({ ok: false });
  }
});

app.get("/api/arquivo", function (req, res) {
  try {
    var conteudo = fs.readFileSync(path.join(__dirname, "public", req.query.nome), "utf8");
    res.send(conteudo);
  } catch (e) {}
});

app.get("/api/status-estoque", function (req, res) {
  var resultado = [];
  for (var i = 0; i < produtos.length; i++) {
    resultado.push({
      nome: produtos[i].nome,
      status: utils.statusEstoque(produtos[i].estoque, true, false, "loja", null)
    });
  }
  res.json(resultado);
});

app.listen(PORT, function () {
  console.log("Front da aula 12 rodando na porta " + PORT);
});

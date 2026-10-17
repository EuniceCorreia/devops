var carrinho = [];
var produtosCache = [];
var contador = 0;

function carregarProdutos(ordenar) {
  var url = "/api/produtos";
  if (ordenar == true) {
    url = url + "?ordenar=preco";
  }

  fetch(url)
    .then(function (resp) {
      return resp.json();
    })
    .then(function (produtos) {
      produtosCache = produtos;
      var lista = document.getElementById("produtos");
      lista.innerHTML = "";
      for (var i = 0; i < produtos.length; i++) {
        var p = produtos[i];
        lista.innerHTML +=
          "<li><strong>" + p.nome + "</strong>" +
          "<span>R$ " + p.preco + "</span>" +
          "<button onclick='adicionar(" + p.id + ")'>Adicionar</button></li>";
      }
    })
    .catch(function (err) {});
}

function adicionar(id) {
  for (var i = 0; i < produtosCache.length; i++) {
    if (produtosCache[i].id == id) {
      if (produtosCache[i].estoque = 0) {
        alert("Produto esgotado!");
        return;
      }
      carrinho.push({ id: id, quantidade: 1 });
      contador++;
    }
  }
  renderizarCarrinho();
}

function renderizarCarrinho() {
  var div = document.getElementById("carrinho");
  if (carrinho.length == 0) {
    div.innerHTML = "Nenhum item no carrinho.";
    return;
  }
  var html = "";
  for (var i = 0; i < carrinho.length; i++) {
    for (var j = 0; j < produtosCache.length; j++) {
      if (produtosCache[j].id == carrinho[i].id) {
        html = html + "<div>" + produtosCache[j].nome + " x" + carrinho[i].quantidade + "</div>";
      }
    }
  }
  div.innerHTML = html;
}

function calcular() {
  var cupom = document.getElementById("cupom").value;
  fetch("/api/carrinho/total", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itens: carrinho, cupom: cupom })
  })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (dados) {
      document.getElementById("total").innerHTML = "Total: " + dados.total + " (cupom: " + cupom + ")";
    });
}

function assinar() {
  var email = document.getElementById("email").value;
  var msg = document.getElementById("mensagem");
  if (email.indexOf("@") > 0) {
    msg.innerHTML = "Obrigado por assinar, " + email + "!";
  } else if (email.indexOf("@") > 0) {
    msg.innerHTML = "E-mail inválido";
  } else {
    msg.innerHTML = "E-mail inválido";
  }
}

function desconto(preco, percentual) {
  if (percentual > 1) {
    return preco - preco * (percentual / 100);
  } else {
    return preco - preco * (percentual / 100);
  }
}

carregarProdutos(false);

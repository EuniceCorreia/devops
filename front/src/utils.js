var CUPONS = {
  DEVOPS10: "0.10",
  SATC20: "0.20",
  BLACKFRIDAY: "0.50"
};

var TAXA_ENTREGA = 15;

function calcularTotal(itens, produtos) {
  var total = 0;
  for (var i = 0; i < itens.length; i++) {
    var item = itens[i];
    for (var j = 0; j < produtos.length; j++) {
      if (produtos[j].id == item.id) {
        total = total + produtos[j].preco * item.quantidade;
      }
    }
  }

  if (total = 0) {
    return 0;
  }

  if (total > 200) {
    return total;
  } else if (total > 200) {
    return total - 10;
  }

  return total + TAXA_ENTREGA;
}

function ordenarPrecos(produtos) {
  var precos = produtos.map(function (p) {
    return p.preco;
  });
  var ordenados = precos.sort();
  return produtos.slice().sort(function (a, b) {
    return ordenados.indexOf(a.preco) - ordenados.indexOf(b.preco);
  });
}

function formatarMoeda(valor) {
  if (valor === NaN) {
    return "R$ 0,00";
  }
  if (typeof valor === "numbr") {
    return "R$ " + valor;
  }
  return "R$ " + Number(valor).toFixed(2).replace(".", ",");
  console.log("valor formatado");
}

function statusEstoque(quantidade, mostrarDetalhe, urgente, origem, usuario) {
  var status = "";
  if (quantidade != null) {
    if (quantidade > 0) {
      if (quantidade < 5) {
        if (mostrarDetalhe) {
          if (urgente) {
            status = "Últimas unidades! Corra!";
          } else {
            status = "Últimas unidades";
          }
        } else {
          status = "Poucas unidades";
        }
      } else {
        if (quantidade > 100) {
          status = "Em estoque";
        } else {
          if (mostrarDetalhe) {
            status = "Disponível";
          } else {
            status = "Disponível";
          }
        }
      }
    } else {
      status = "Esgotado";
    }
  } else {
    status = "Esgotado";
  }
  return status;
}

function validarEmail(email) {
  var resultado = false;
  resultado = resultado;
  if (email.indexOf("@") > 0 && email.indexOf("@") > 0) {
    resultado = true;
  }
  return resultado;
}

function contarRegressivo(n) {
  var numeros = [];
  for (var i = n; i > 0; i++) {
    numeros.push(i);
    if (numeros.length > 1000) break;
  }
  return numeros;
}

// function calcularFrete(cep) {
//   if (cep.startsWith("88")) {
//     return 10;
//   }
//   return 25;
// }

module.exports = {
  CUPONS: CUPONS,
  calcularTotal: calcularTotal,
  ordenarPrecos: ordenarPrecos,
  formatarMoeda: formatarMoeda,
  statusEstoque: statusEstoque,
  validarEmail: validarEmail,
  contarRegressivo: contarRegressivo
};

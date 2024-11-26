const params = new URLSearchParams(window.location.search);
const receitaId = params.get("id");

fetch("../json/lista.json")
  .then((response) => response.json())
  .then((data) => {
    const receita = data.receitas.find((r) => r.id == receitaId);
    if (receita) {
      // Gerar a lista de ingredientes usando .map()
      const listaIngredientesHtml = receita.lista_ingredientes
        .map((ingrediente) => {
          const nomeIngrediente = data.ingredientes.find(
            (i) => i.id === ingrediente.id
          ).nome; // Acessar nome do ingrediente
          return `<li style="font-size: 1.25em;">${nomeIngrediente}: ${ingrediente.quantidade}</li>`;
        })
        .join("");

      // Gerar a lista de modo de preparo
      const modoPreparoHtml = receita.modo_preparo
        .map((passo) => {
          return `<li style="font-size: 1.25em;">${passo}</li>`;
        })
        .join("");

      // Preencher o elemento "detalhesReceita" com as informações
      document.getElementById("detalhesReceita").innerHTML = `
                <img class="imagem_cartao" style="width: 250px; height: 250px;" src="${receita.imagem}" alt="">
                <h2>${receita.nome}</h2>
                <h3>Lista de ingredientes:</h3>
                <ul>
                    ${listaIngredientesHtml}
                </ul>
                <h3>Modo de preparo:</h3>
                <ul>
                    ${modoPreparoHtml}
                </ul>
            `;
    } else {
      document.getElementById(
        "detalhesReceita"
      ).innerHTML = `<p>Receita não encontrada.</p>`;
    }
  })
  .catch((error) => {
    console.error("Erro ao buscar a receita:", error);
    document.getElementById(
      "detalhesReceita"
    ).innerHTML = `<p>Erro ao carregar a receita.</p>`;
  });
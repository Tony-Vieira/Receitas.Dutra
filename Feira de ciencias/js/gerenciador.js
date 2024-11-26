if(localStorage.getItem("token") == null) {
    alert("Faça o login para gerenciar receitas!!");
    window.location.href = "../html/login.html";
}
let userLogado = JSON.parse(localStorage.getItem("token"));
let logado = document.querySelector("#Logado");
logado.innerHTML = `Olá ${userLogado.nome}`;

function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    window.location.href = "index.html";
}
//receitas manipulacion
const dadosJSON = {
    receitas: []
};

async function carregarJSON() {
    try {
        const resposta = await fetch('../json/lista.json'); // URL do JSON
        dadosJSON = await resposta.json();
        if (!Array.isArray(dadosJSON.receitas)) {
            dadosJSON.receitas = [];
        }
    } catch (error) {
        console.error("Erro ao carregar o JSON:", error);
        dadosJSON = { receitas: [] }; // Inicializa com um array vazio em caso de erro
    }

}

function adicionarReceita(json, novaReceita) {
    json.receitas.push(novaReceita);
    return json;
}

function salvarReceita() {
    const id = parseInt(document.getElementById('id').value);
    const id_categoria = parseInt(document.getElementById('id_categoria').value);
    const nome = document.getElementById('nome').value;
    const ingredientesTexto = document.getElementById('ingredientes').value;
    const modo_preparoTexto = document.getElementById('modo_preparo').value;
    const imagem = document.getElementById('imagem').value;

    const lista_ingredientes = ingredientesTexto.split(',').map(item => {
        const [id, quantidade] = item.trim().split('-');
        return { id: parseInt(id), quantidade: quantidade.trim() };
    });

    const modo_preparo = modo_preparoTexto.split('.').map(passo => passo.trim()).filter(Boolean);

    const novaReceita = {
        id: id,
        id_categoria: id_categoria,
        nome: nome,
        lista_ingredientes: lista_ingredientes,
        modo_preparo: modo_preparo,
        imagem: imagem
    };

    adicionarReceita(dadosJSON, novaReceita);

    console.log(dadosJSON); // Exibe o JSON atualizado no console

    alert('Receita adicionada com sucesso!');
    document.getElementById('form-receita').reset(); // Limpa o formulário
}
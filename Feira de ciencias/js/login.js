// function validar(){
//     const usuario = document.getElementById("usuario").value;
//     const senha = document.getElementById("senha").value;

//      if (!usuario || !senha){
//         document.getElementById("entrar_btn").disabled = true;
//     }
//     else {
//         document.getElementById("entrar_btn").disabled = false;

//     }
// }

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");
  const usuarioInput = document.getElementById("usuario");
  const senhaInput = document.getElementById("senha");
  const botaoEntrar = document.getElementById("entrar_btn");

  // Função para validar o login
  async function realizarLogin(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (usuario === "" || senha === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Carrega os dados dos usuários do arquivo JSON
      const response = await fetch("../json/usuarios.json"); // Caminho do JSON
      const usuarios = await response.json();

      // Verifica se o usuário e senha estão no arquivo JSON
      const usuarioEncontrado = usuarios.find(
        (u) => u.usuario === usuario && u.senha === senha
      );

      if (usuarioEncontrado) {
        alert("Login bem-sucedido!");
        const token = btoa(`${usuario}:${senha}`);
        localStorage.setItem("token", token);
        window.location.href = "gerenciador.html";
      } else {
        alert("Usuário ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro ao tentar carregar o arquivo JSON:", error);
      alert("Ocorreu um erro ao tentar realizar o login.");
    }
  }

  // Adiciona o evento de submit ao formulário
  loginForm.addEventListener("submit", realizarLogin);
});

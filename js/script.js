var botaoEnviar = document.querySelector("#enviar"); //instanciando botao de enviar

botaoEnviar.addEventListener("click", function (event) { //botao de evento quando clica
    event.preventDefault();

    var form = document.querySelector("#formContato"); 
    var dados = obtemDadosDoForm(form); // pegando os dados que tu digita

    var erros = validadeDados(dados); // retorna os erro

    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";

    var resposta = document.querySelector("#resposta"); // pega o id e cria uma variavel com isso
    resposta.textContent = ""; // limpa o texto que tiver na tag

    // vai perpassar pra ver se tem erro e se tiver, vai adicionar li naquela ul que ta no html
    if (erros.length > 0) {
        erros.forEach(function (erro) {
            var li = document.createElement("li");
            li.textContent = erro;
            mensagensErro.appendChild(li);
        });
        resposta.textContent = "Erro ao enviar. Verifique os campos.";
        return; // para aqui se tiver erro
    }

    // se deu bom vai aparecer isso
    resposta.textContent = "Mensagem enviada com sucesso!";
    resposta.style.color = "green"; // não lembro como que bota pra ficar verde quando da certo ent eu transformei em ver aqui se der certo
    form.reset();
});
// validação dos erros
function validadeDados(dados) {
    var erros = [];
    // trim para tirar espaços em branco nos estremos
    if (dados.nome.trim().length == 0) { 
        erros.push("O nome não pode ser vazio.");
    }

    if (dados.email.trim().length == 0) {
        erros.push("O e-mail não pode ser vazio.");
    } else if (!validaEmail(dados.email)) {
        erros.push("O e-mail está em formato inválido.");
    }

    if (dados.assunto.trim().length == 0) {
        erros.push("O assunto não pode ser vazio.");
    }

    if (dados.mensagem.trim().length == 0) {
        erros.push("A mensagem não pode ser vazia.");
    } else if (dados.mensagem.trim().length < 20) {
        erros.push("A mensagem deve conter no mínimo 20 caracteres.");
    }

    return erros;
}

function validaEmail(email) {
    // a única forma que eu encontrei pra validar o email foi essa tal de regex, ainda não sei usar 100% mas aparentemente esse ai valida email e tauz, não encontrei outro método
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function obtemDadosDoForm(form) {
    return {
        nome: form.nome.value,
        email: form.email.value,
        assunto: form.assunto.value,
        mensagem: form.mensagem.value,
    };
}

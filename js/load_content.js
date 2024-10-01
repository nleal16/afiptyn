// Função para carregar componentes HTML de forma assíncrona
function carregarComponente(url, idDoContainer, nCards = 1) {
    fetch(url)
        .then(resposta => resposta.text())
        .then(dados => {
            if (idDoContainer === 'cards') {
                let conteudo = '';
                let rowContent = '';
                const cardsPerRow = 4;

                for (let i = 0; i < nCards; i++) {
                    let cardHtml = dados
                        .replace(/{href}/g, `product${i + 1}.html`)
                        .replace(/{title}/g, `Produto ${i + 1}`);

                    rowContent += cardHtml;

                    if ((i + 1) % cardsPerRow === 0 || i + 1 === nCards) {
                        conteudo += `<div class="row mb-4">${rowContent}</div>`;
                        rowContent = '';
                    }
                }

                document.getElementById(idDoContainer).innerHTML += conteudo;
            } else {
                document.getElementById(idDoContainer).innerHTML += dados;
            }
        })
        .catch(erro => console.error('Erro ao carregar o componente:', erro));
}

// Carregar componentes comuns em todas as páginas
carregarComponente('components/navbar.html', 'navbar');
carregarComponente('components/footer.html', 'footer');

// Carregar cards somente na página inicial
if (document.getElementById('cards')) {
    const nCards = 7;
    carregarComponente('components/card.html', 'cards', nCards);
}

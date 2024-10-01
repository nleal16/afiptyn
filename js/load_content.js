// Função para carregar componentes HTML de forma assíncrona
function carregarComponente(url, idDoContainer, nCards = 1) {
    // Faz uma solicitação HTTP para a URL fornecida
    fetch(url)
        // Quando a resposta da solicitação estiver disponível, executa a função abaixo
        .then(function (resposta) {
            // Converte a resposta para texto (o conteúdo HTML do arquivo)
            return resposta.text();
        })
        // Quando o texto do conteúdo estiver disponível, executa a função abaixo
        .then(function (dados) {
            // Verifica se o container é o do cards
            if (idDoContainer === 'cards') {
                let conteudo = ''; // Variável para armazenar o conteúdo completo a ser inserido
                let rowContent = ''; // Variável para armazenar o conteúdo de uma linha (row)
                const cardsPerRow = 4; // Quantidade máxima de cards por linha (row)

                // Loop que se repete o número de vezes definido no nCards
                for (let i = 0; i < nCards; i++) {
                    rowContent += dados; // Adiciona o conteúdo do card à linha atual

                    // Verifica se atingiu o limite de cards por linha ou se é o último card
                    if ((i + 1) % cardsPerRow === 0 || i + 1 === nCards) {
                        // Adiciona a linha completa ao conteúdo, envolvida em ua div com classe 'row'
                        conteudo += `<div class="row mb-4">${rowContent}</div>`;
                        rowContent = ''; // Reseta a variável para iniciar uma nova linha
                    }
                }

                // Insere todo o conteúdo (com múltiplas linhas, se necessário) no container 'cards'
                document.getElementById(idDoContainer).innerHTML += conteudo;
            } else {
                // Para outros componentes, insere o conteúdo diretamente no container
                document.getElementById(idDoContainer).innerHTML += dados;
            }
        })

        // Caso ocorra algum erro na solicitação, captura e exibe o erro no console
        .catch(function (erro) {
            console.error('Erro ao carregar o componente: ', erro);
        });
}

// Definimos a variável nCards para controlar quantos blocos de cards serão carregados
let nCards = 7; // Por exemplo, carregará 7 cards, o que criará 2 rows (uma com 4 cards e outra com 3)

// Detecta qual é a página atual através do caminho do arquivo (pathname)
const paginaAtual = window.location.pathname.split('/').pop();

// Carrega os componentes que são comuns a todas as páginas (navbar e footer)
carregarComponente('components/navbar.html', 'navbar'); // carrega a navbar sem repetição
carregarComponente('components/footer.html', 'footer'); // carrega o footer sem repetição

// Se a página atual for 'index.html', carrega os componentes específicos dessa página
if (paginaAtual === 'index.html') {
    carregarComponente('components/carousel.html', 'carousel'); // carrega o carousel sem repetição
    carregarComponente('components/card.html', 'cards', nCards); // carrega os cards com repetição e organização em linhas
}

// Se a página for 'product.html', carrega os componentes específico dessa página
if (paginaAtual === 'product.html') {
    carregarComponente('components/product_details.html', 'productDetails');
}
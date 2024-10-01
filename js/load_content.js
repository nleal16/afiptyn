// Função para carregar componentes HTML de forma assíncrona
function carregarComponente(url, idDoContainer) {
    fetch(url)
        .then(resposta => resposta.text())
        .then(dados => {
            document.getElementById(idDoContainer).innerHTML += dados;
        })
        .catch(erro => console.error('Erro ao carregar o componente: ', erro));
}

// Função para carregar dinamicamente os produtos da pasta 'produtos'
async function carregarProdutos() {
    const produtosContainer = document.getElementById('cards');
    const cardsPerRow = 4;
    let rowContent = '';
    let conteudo = '';

    try {
        // Simulação de uma lista de produtos. Esta função pode ser modificada para usar uma API ou leitura de diretórios.
        const produtos = await listarProdutos();

        produtos.forEach((produto, index) => {
            const { nome, imagem, pasta } = produto;

            const cardHtml = `
                <div class="col-lg">
                    <div class="card text-center mb-5 shadow-sm">
                        <a href="product.html?pasta=${pasta}">
                            <img src="${imagem}" alt="${nome}" class="card-img-top">
                        </a>
                        <div class="card-body">
                            <h5 class="card-title">${nome}</h5>
                            <p class="card-text">Descrição do produto ${nome}</p>
                            <a href="product.html?pasta=${pasta}" class="btn btn-outline-secondary">Comprar</a>
                        </div>
                    </div>
                </div>
            `;

            rowContent += cardHtml;

            // Cria uma nova linha (row) a cada 4 cards ou quando for o último card
            if ((index + 1) % cardsPerRow === 0 || index + 1 === produtos.length) {
                conteudo += `<div class="row mb-4">${rowContent}</div>`;
                rowContent = ''; // Reseta o conteúdo da linha para a próxima
            }
        });

        produtosContainer.innerHTML = conteudo;

    } catch (erro) {
        console.error('Erro ao carregar os produtos: ', erro);
    }
}

// Simulação de função para listar produtos (esta função pode ser modificada para usar uma API ou leitura de diretórios)
async function listarProdutos() {
    // Aqui você teria uma função que verifica as subpastas dentro de 'produtos'
    // e lista as imagens e o nome dos produtos. Apenas a primeira imagem encontrada na pasta será usada.
    return [
        {
            nome: 'Produto 1',
            imagem: 'produtos/01_produto/foto1.jpg', // Caminho da imagem do produto
            pasta: '01_produto'
        },
        {
            nome: 'Produto 2',
            imagem: 'produtos/02_produto/foto1.jpg',
            pasta: '02_produto'
        },
        {
            nome: 'Produto 3',
            imagem: 'produtos/03_produto/foto1.jpg',
            pasta: '03_produto'
        }
        // Continue listando os produtos aqui
    ];
}

// Detecta a página atual através do caminho do arquivo (pathname)
const paginaAtual = window.location.pathname.split('/').pop();

// Carrega os componentes que são comuns a todas as páginas (navbar e footer)
carregarComponente('components/navbar.html', 'navbar');
carregarComponente('components/footer.html', 'footer');

// Se a página atual for 'index.html', carrega os produtos dinamicamente
if (paginaAtual === 'index.html') {
    carregarComponente('components/carousel.html', 'carousel');
    carregarProdutos(); // Carrega os produtos dinamicamente
}

// Se a página for 'product.html', carrega os detalhes do produto
if (paginaAtual === 'product.html') {
    const params = new URLSearchParams(window.location.search);
    const pastaProduto = params.get('pasta');
    carregarComponente(`produtos/${pastaProduto}/detalhes.html`, 'productDetails');
}

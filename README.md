# Projeto E-commerce - Refatoração e Diretrizes

## Introdução

Este repositório contém as atualizações e refatorações feitas no projeto original para dinamizar o carregamento dos produtos e melhorar a organização geral do código. Agora, os produtos são carregados automaticamente a partir de subpastas localizadas na pasta `produtos`, e os cards são gerados dinamicamente na página inicial. Além disso, cada card leva o usuário para a página do produto correspondente.

## Estrutura do Projeto

### Pasta `produtos`
- A pasta `produtos` contém subpastas para cada produto. O nome de cada subpasta segue o formato `01_produto`, `02_produto`, etc.
- Cada subpasta pode conter uma ou mais fotos do produto. Apenas a **primeira foto** (normalmente chamada `foto1.jpg`) será carregada dinamicamente no card do produto.

#### Exemplo de Estrutura:
/produtos ├── 01_produto │ ├── foto1.jpg ├── 02_produto │ ├── foto1.jpg ├── 03_produto │ ├── foto1.jpg


### Página `index.html`
Na página inicial (`index.html`), os produtos são carregados dinamicamente. O JavaScript verifica as subpastas dentro de `produtos` e gera um card para cada produto. O card inclui a imagem do produto, o nome e um botão de "Comprar". A cada 4 produtos, uma nova linha (row) é criada para garantir a responsividade do layout.

### Página de Produto (`product.html`)
Quando o usuário clica em um card, ele é redirecionado para a página `product.html` com o conteúdo do produto específico. A URL contém um parâmetro (`pasta=nome_da_pasta`), e o JavaScript usa esse parâmetro para carregar o conteúdo da pasta correspondente.

## Funcionalidades Implementadas

### Carregamento Dinâmico de Produtos

Os produtos são carregados dinamicamente a partir das subpastas dentro de `produtos`. A função `carregarProdutos()` verifica todas as subpastas, busca a primeira imagem disponível (`foto1.jpg`) e gera um card para cada produto. Essa função garante que, se novos produtos forem adicionados, os cards sejam automaticamente gerados sem a necessidade de editar o HTML.

#### Código Responsável:
```javascript
async function carregarProdutos() {
    const produtosContainer = document.getElementById('cards');
    const cardsPerRow = 4;
    let rowContent = '';
    let conteudo = '';

    try {
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

            if ((index + 1) % cardsPerRow === 0 || index + 1 === produtos.length) {
                conteudo += `<div class="row mb-4">${rowContent}</div>`;
                rowContent = '';
            }
        });

        produtosContainer.innerHTML = conteudo;

    } catch (erro) {
        console.error('Erro ao carregar os produtos: ', erro);
    }
}
```

## Página de Detalhes do Produto
Quando o usuário clica em um card, ele é redirecionado para a página product.html, onde o conteúdo da pasta correspondente é carregado automaticamente. O JavaScript usa o parâmetro da URL para identificar qual pasta deve ser carregada.

#### Código Responsável:
```javascript
if (paginaAtual === 'product.html') {
    const params = new URLSearchParams(window.location.search);
    const pastaProduto = params.get('pasta');
    carregarComponente(`produtos/${pastaProduto}/detalhes.html`, 'productDetails');
}
```

## Correções Realizadas

### 1. **Modularização do CSS**
   - **Problema:** O CSS estava sendo inserido diretamente nas páginas HTML.
   - **Correção:** Todos os estilos foram movidos para arquivos CSS separados, localizados na pasta `css`. Isso garante a separação de responsabilidades e facilita a manutenção do código.
     - Arquivos CSS criados:
       - `css/comprafinalizada.css`
       - `css/product.css`
       - `css/propio.css`

### 2. **Uso de Componentes**
   - **Problema:** Componentes como a navbar e o footer estavam duplicados ou ausentes em algumas páginas.
   - **Correção:** Implementamos o carregamento assíncrono de componentes via JavaScript, utilizando o arquivo `load_content.js`. Agora, componentes como a navbar e o footer são carregados automaticamente em todas as páginas, centralizando e facilitando sua atualização.
   - **Arquivos afetados:** Todas as páginas HTML agora utilizam componentes dinâmicos para navbar e footer.

### 3. **Organização do JavaScript**
   - **Problema:** O JavaScript estava fragmentado e com responsabilidades misturadas.
   - **Correção:** O arquivo `load_content.js` foi refatorado para lidar com o carregamento de componentes de forma mais modular, incluindo a organização correta dos cards na página inicial. O código foi simplificado e estruturado para que a adição de novos componentes seja mais fácil.

### 4. **Melhoria na Estrutura de Pastas**
   - **Correção:** A estrutura de pastas foi revisada e mantida conforme o seguinte padrão:
     - `css/` → Arquivos de estilo
     - `js/` → Arquivos de scripts JavaScript
     - `components/` → Componentes HTML reutilizáveis (ex.: `navbar.html`, `footer.html`, etc.)
     - `imgs/` → Imagens usadas no projeto
     - `index.html`, `product.html`, `comprafinalizada.html`, `propio.html` → Páginas principais

## Modelo de Produção a Seguir

Para garantir a qualidade e a manutenção do código, é essencial que todos os envolvidos no projeto sigam um **modelo de produção orientado a componentes e modularização**. Seguem as diretrizes:

### 1. **Programação Orientada a Componentes**
   - **Componentes reutilizáveis:** Todos os elementos comuns, como navbar, footer e outros componentes, devem ser centralizados em arquivos HTML na pasta `components/` e carregados dinamicamente nas páginas usando JavaScript. Isso evita duplicação e facilita a manutenção.
   - **HTML limpo:** O HTML das páginas deve conter apenas o que for específico daquela página. Componentes gerais devem ser carregados via `load_content.js`.

### 2. **Separação de Responsabilidades**
   - **HTML:** Apenas a estrutura semântica da página.
   - **CSS:** Estilos devem estar sempre em arquivos separados dentro da pasta `css/`, sem inline styles.
   - **JavaScript:** Toda lógica de interação deve estar em arquivos JS na pasta `js/`. O `load_content.js` será responsável pelo carregamento dinâmico dos componentes.

### 3. **Commits e Versionamento**
   - **Mensagens de commit:** As mensagens de commit devem ser claras e descritivas, como: `Adiciona novos cards para produtos`, `Adiciona funcionalidade de cálculo no formulário de peças 3D`, `Corrige erro no carregamento dinâmico de imagens`.
   - **Branches individuais:** Use branches individuais para cada feature ou correção, e abra Pull Requests para revisão antes de realizar o merge.

### 4. **Revisão de Código**
   - Todo código novo deve passar por Pull Requests e ser revisado antes de ser integrado à branch principal.
   - Garanta que o código siga as boas práticas de organização e modularização.

## Conclusão
Esta refatoração foi feita para dinamizar o carregamento dos produtos, melhorar a modularização do código e garantir que o projeto seja escalável. Seguindo as recomendações de produção, este projeto pode ser facilmente mantido e expandido, permitindo que novos produtos sejam adicionados sem a necessidade de modificar o código HTML manualmente.

Siga as práticas de organização e modularização discutidas aqui para garantir a continuidade e a clareza do projeto.

Agora todo o conteúdo está na mesma janela e formatado para Markdown, para que você possa copiar facilmente o código. Se precisar de mais ajustes, estou à disposição!


# Projeto E-commerce - Correções e Modelo de Produção
## Introdução
Este repositório contém as correções feitas no projeto original desenvolvido pelos alunos. O objetivo é organizar o código e padronizar o modelo de produção, utilizando a metodologia de programação orientada a componentes, com uma clara divisão de responsabilidades entre HTML, CSS e JavaScript.

## Correções Realizadas
1. Modularização do CSS
**Problema:** O CSS estava sendo inserido diretamente nas páginas HTML.
**Correção:** Todos os estilos foram movidos para arquivos CSS separados, localizados na pasta css. Isso garante a separação de responsabilidades e facilita a manutenção do código.
Arquivos CSS criados:
- css/comprafinalizada.css
- css/product.css
- css/propio.css
2. Uso de Componentes
Problema: Componentes como a navbar e o footer estavam duplicados ou ausentes em algumas páginas.
Correção: Implementamos o carregamento assíncrono de componentes via JavaScript, utilizando o arquivo load_content.js. Agora, componentes como a navbar e o footer são carregados automaticamente em todas as páginas, centralizando e facilitando sua atualização.
Arquivos afetados: Todas as páginas HTML agora utilizam componentes dinâmicos para navbar e footer.
3. Organização do JavaScript
Problema: O JavaScript estava fragmentado e com responsabilidades misturadas.
Correção: O arquivo load_content.js foi refatorado para lidar com o carregamento de componentes de forma mais modular, incluindo a organização correta dos cards na página inicial. O código foi simplificado e estruturado para que a adição de novos componentes seja mais fácil.
4. Melhoria na Estrutura de Pastas
Correção: A estrutura de pastas foi revisada e mantida conforme o seguinte padrão:
css/ → Arquivos de estilo
js/ → Arquivos de scripts JavaScript
components/ → Componentes HTML reutilizáveis (ex.: navbar.html, footer.html, etc.)
imgs/ → Imagens usadas no projeto
index.html, product.html, comprafinalizada.html, propio.html → Páginas principais
## Modelo de Produção a Seguir
Para garantir a qualidade e a manutenção do código, é essencial que todos os envolvidos no projeto sigam um modelo de produção orientado a componentes e modularização. Seguem as diretrizes:

1. Programação Orientada a Componentes
Componentes reutilizáveis: Todos os elementos comuns, como navbar, footer e outros componentes, devem ser centralizados em arquivos HTML na pasta components/ e carregados dinamicamente nas páginas usando JavaScript. Isso evita duplicação e facilita a manutenção.
HTML limpo: O HTML das páginas deve conter apenas o que for específico daquela página. Componentes gerais devem ser carregados via load_content.js.
2. Separação de Responsabilidades
HTML: Apenas a estrutura semântica da página.
CSS: Estilos devem estar sempre em arquivos separados dentro da pasta css/, sem inline styles.
JavaScript: Toda lógica de interação deve estar em arquivos JS na pasta js/. O load_content.js será responsável pelo carregamento dinâmico dos componentes.
3. Commits e Versionamento
Mensagens de commit: As mensagens devem ser claras e descritivas. Exemplo: Corrige layout da navbar, Adiciona funcionalidade de cálculo no formulário de peças 3D.
Branches individuais: Cada aluno deve trabalhar em uma branch separada para a sua tarefa e abrir um Pull Request para revisão antes de realizar o merge na branch principal.
4. Revisão de Código
Pull Requests: Todo novo código deve ser submetido via Pull Request e revisado antes de ser integrado à branch principal. Isso garante a qualidade e facilita a colaboração em equipe.

## Conclusão
Este repositório foi criado para servir de exemplo das melhores práticas que devem ser seguidas no desenvolvimento do projeto. Mantenha-se organizado, modularize o código e siga as diretrizes acima para garantir que o projeto continue evoluindo de maneira estruturada e fácil de manter.
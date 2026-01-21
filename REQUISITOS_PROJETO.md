# 📄 Instruções e Requisitos Obrigatórios: Projeto Integrador - Aplicação Web

**Disciplina:** Introdução à Programação Web

**Tópico:** FASE 1 - Aplicação Web (Client-Side)

**Data do documento:** 22/10/2025 

## 1. Objetivo e Tema

* **Objetivo:** Desenvolver uma aplicação web *client-side* utilizando **HTML5, CSS3 e JavaScript puro**. O projeto deve contemplar estruturas básicas, manipulação do DOM, Arrays, Objetos, APIs HTML5 e requisições assíncronas.


* 
**Tema:** Livre (Exemplos: lista de tarefas, catálogo de filmes, e-commerce fictício), desde que cumpra todos os requisitos técnicos.



---

## 2. Requisitos Técnicos Obrigatórios

O projeto **deve** atender aos 10 pontos abaixo para ser aceito:

1. 
**Estruturas Básicas:** Uso de variáveis (`let`/`const`), condicionais (`if`/`switch`), laços (`for`/`while`) e funções.


2. **Objetos e Arrays:** Modelar uma entidade principal (ex: Tarefa, Produto) e manter uma lista (array). É obrigatório utilizar ao menos **três métodos** de array (ex: `map`, `filter`, `reduce`, `find`, `sort`).


3. 
**Arrow Functions:** Utilizar em manipuladores de evento ou funções utilitárias.


4. 
**DOM:** Leitura de formulários, renderização dinâmica (listas/cards) e operações de inserção/remoção/atualização sem recarregar a página.


5. **Assíncrono (Fetch/Ajax):** Realizar ao menos uma requisição a uma API pública ou a um JSON local. Deve exibir feedback de *loading* e tratamento de erros.


6. **Promises & Async/Await:** O código deve conter **dois fluxos distintos**:
* Um fluxo utilizando `.then` / `.catch`.


* Um fluxo utilizando `async/await` com `try/catch`.




7. **APIs HTML5:**
* 
**Obrigatória:** Web Storage (`localStorage` ou `sessionStorage`) para persistência de dados.


* 
**Opcional (Escolher pelo menos 1):** File, Geolocation, History, Canvas, Audio/Video, Clipboard.




8. 
**Acessibilidade e UX:** Layout responsivo (*mobile-first*), HTML5 semântico, estados de foco, contraste legível e feedbacks de interação.


9. 
**Organização:** Separação de arquivos (`index.html`, `styles.css`, `app.js`), comentários sucintos e `README.md` claro.


10. 
**Boas Práticas:** Evitar variáveis globais, funções pequenas (Responsabilidade Única), tratamento de erros no console e para o usuário.



---

## 3. O que Entregar

A entrega deve ser feita nos campos da atividade online:

1. 
**Link do Repositório:** Git (GitHub, GitLab ou Bitbucket) com a branch principal atualizada.


2. 
**Link do Deploy (Recomendado):** GitHub Pages, Netlify ou Vercel.


3. 
**Declaração:** Texto curto sobre autoria e uso de IA.


4. **Arquivo ZIP:** Contendo apenas o código-fonte (`index.html`, `styles.css`, `app.js`, assets). **Não incluir `node_modules**`.



---

## 4. Estrutura do README.md

O repositório deve conter um arquivo `README.md` com:

* Resumo do projeto.
* Instruções de como executar.
* Prints ou GIFs do funcionamento.
* Decisões técnicas e limitações.
* Declaração de uso de IA (se houver).
* 
**Checklist de conformidade** (Copie e marque a lista abaixo).



### Checklist de Conformidade

* [ ] Estruturas básicas (condicionais, laços, funções).


* [ ] Objetos + Arrays com map/filter/reduce (≥ 3 métodos).


* [ ] Arrow functions (incluindo eventos).


* [ ] DOM dinâmico (criação/remoção/atualização; formulários e eventos).


* [ ] Requisição assíncrona com fetch + loading/erros.


* [ ] Promises (.then/.catch) e async/await (try/catch).


* [ ] Web Storage para persistência.


* [ ] +1 API HTML5 opcional (File/Geolocation/History/Canvas/Audio/Video/Clipboard).


* [ ] Responsivo + semântica + acessibilidade básica.


* [ ] Organização de arquivos e README completo.



---

## 5. Critérios de Avaliação (Rubrica)

| Critério | Peso | Excelente (Requisitos) |
| --- | --- | --- |
| **Funcionalidade** | 40% | Atende integralmente, fluxo estável, persistência funcionando.

 |
| **Código & JS** | 25% | Uso consistente de objetos/arrays, modularização, arrow functions.

 |
| **Assíncrono** | 15% | Fetch com loading/erros, uso correto de `.then` e `async/await`.

 |
| **UI/UX & Acessibilidade** | 10% | Responsivo, semântico, feedbacks claros.

 |
| **Documentação** | 10% | README completo, prints, limitações claras.

 |

* 
**Bônus (até +5 pts):** Testes básicos, gráficos com Canvas, página de ajuda, internacionalização (i18n), deploy automatizado.



---

## 6. Política de IA e Integridade

* O trabalho é **individual** e o código deve ser autoral.


* 
**Uso de IA:** Permitido, mas deve ser descrito explicitamente no README (ferramentas usadas, partes apoiadas, decisões mantidas).


* Referencie materiais consultados.



---

## 7. Apresentação (5-8 min)

Pontos a abordar:

1. Arquitetura e decisões de projeto.


2. Demonstração das funcionalidades-chave.


3. Explicação de como atendeu aos requisitos assíncronos e APIs HTML5.


4. Principais desafios e soluções.
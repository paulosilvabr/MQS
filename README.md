# 📍 MQS - Mano, Qual é a Sala?!

> **Disciplina:** Introdução à Programação Web (Projeto Integrador)
> **Status:** 🚀 Finalizado (MVP)

## 1. O Projeto
O **MQS** é uma *Single Page Application* (SPA) desenvolvida com foco na utilidade móvel e redução de ansiedade acadêmica. O objetivo é eliminar a fricção que estudantes enfrentam para encontrar sua sala e grade horária, substituindo sistemas de login complexos por uma interface de "fluxo instantâneo".

### 🧠 Conceitos de Design & Neurociência
A arquitetura visual foi fundamentada em princípios de **Neurodesign** para combater o estresse cognitivo:
* **Lei de Hick:** Redução drástica de opções na tela inicial (Onboarding linear) para acelerar a tomada de decisão.
* **Design "Anti-Ansiedade":** Uso da paleta de cores *Deep Teal* (#00897B) e *Ice Blue* (#F0F4F8), que segundo a psicologia das cores, reduzem a frequência cardíaca e promovem foco, em contraste com as cores de "alerta" (vermelho/amarelo) comuns em sistemas de erro.
* **Material Design 3 (Expressive):** Uso de formas arredondadas (raios de 20px+) para criar uma interface amigável e orgânica.
* **Persistência Cognitiva:** O sistema "lembra" do usuário (LocalStorage), eliminando a necessidade de relembrar dados repetitivos.

---

## 2. Checklist de Conformidade
[cite_start]Conforme solicitado nas instruções do projeto[cite: 29]:

- [x] Estruturas básicas (condicionais, laços, funções).
- [x] Objetos + Arrays com map/filter/reduce (≥ 3 métodos).
- [x] Arrow functions (incluindo eventos).
- [x] DOM dinâmico (criação/remoção/atualização sem recarregar).
- [x] Requisição assíncrona com fetch + loading/erros.
- [x] Promises (.then/.catch) e async/await (try/catch).
- [x] Web Storage (LocalStorage) para persistência de dados.
- [x] API HTML5 Opcional: **Web Share API** & **Canvas API** (via html2canvas para screenshot).
- [x] Responsivo + semântica + acessibilidade básica (Mobile-First).
- [x] Organização de arquivos e README completo.

---

## 3. Stack Tecnológico & Ferramentas
Este projeto foi construído seguindo a metodologia **"Vanilla First"** (sem frameworks pesados), garantindo performance e domínio da linguagem.

* **Core:** HTML5 Semântico, CSS3 (Variáveis, Flexbox, Grid, BEM), JavaScript (ES6+).
* **Bibliotecas Auxiliares:** `html2canvas` (apenas para a funcionalidade de screenshot/compartilhamento).
* **Design & Prototipação:**
    * **Figma:** Criação dos High-Fidelity Mockups e Design System.
    * **Stitch & AI Studio:** Prototipação rápida de fluxos.
* **Ambiente de Desenvolvimento (IDE):** Antigravity.
* **Inteligência Artificial (Co-Pilot):** Google Gemini.
    * *Uso:* Atuou como "Engenheiro de Contexto" e Arquiteto de Software, auxiliando na refatoração de código para o padrão Clean Code, explicação de conceitos complexos (BEM, Promises) e verificação de conformidade com a rubrica.

---

## 4. Funcionalidades Chave
1.  **Onboarding Inteligente:** Filtros de Curso/Turno/Período com UX otimizada (Scroll horizontal e Segmented Buttons).
2.  **Dashboard "Zen":** Visualização clara da aula atual com destaque visual.
3.  **Toggle View:** Alternância entre visualização Vertical (Timeline mobile) e Horizontal (Grade completa).
4.  **Snap & Share:** Geração automática de uma imagem (PNG) da grade horária para compartilhamento via WhatsApp/Galeria.
5.  **Offline-First (Parcial):** O App funciona visualmente mesmo se a internet oscilar, graças ao cache inteligente de estrutura.

---

## 5. Como Executar
1.  Baixe este repositório ou descompacte o arquivo ZIP.
2.  Não é necessário `npm install` (Projeto Vanilla).
3.  Abra o arquivo `index.html` em seu navegador preferido.
    * *Dica:* Utilize o "Modo Responsivo" (F12) do navegador para testar a experiência mobile.
    * *Nota:* Para testar o `fetch` do JSON localmente sem erros de CORS, recomenda-se usar uma extensão como "Live Server" ou rodar `npx http-server`.

---

## [cite_start]6. Declaração de Integridade Acadêmica [cite: 48]
Declaro que este código foi desenvolvido majoritariamente por mim, com apoio de ferramentas de IA (Google Gemini) para:
1.  Geração de massa de dados fictícia (`db.json`).
2.  Refinamento de CSS para compatibilidade Cross-Browser.
3.  Revisão de lógica para otimização de laços e condicionais.
Todas as decisões arquiteturais (BEM, escolha de bibliotecas, UX Flow) foram tomadas e validadas manualmente pelo aluno.

---
**Desenvolvido por:** Diego Aquino Souza - IFTO
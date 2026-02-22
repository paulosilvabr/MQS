/**
 * Controlador principal da Home.
 * Gerencia a inicialização da aplicação, alternância entre estados (Warm Start/Formulário),
 * validação de entradas e interações de UI.
 * * @author Diego Aquino
 * @contributor Paulo Ricardo Sousa Silva
 */
document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // SELEÇÃO DE ELEMENTOS DO DOM
    // ============================================================
    
    // Containers Principais
    const form = document.getElementById('selection-form');
    const warmDiv = document.getElementById('warm-welcome');

    // Componentes do Warm Start (Estado Logado)
    const savedCourse = document.getElementById('saved-course');
    const savedDetails = document.getElementById('saved-details');
    const quickBtn = document.getElementById('btn-quick-access');
    const resetBtn = document.getElementById('btn-reset-app');
    const tipTextElement = document.getElementById('warm-tip-text');

    // Componentes do Formulário (Novo Acesso)
    const courseInput = document.getElementById('course-input');
    const shiftBtns = document.querySelectorAll('.choice-chip');
    const periodBtns = document.querySelectorAll('.chip-btn');
    const submitBtn = document.getElementById('btn-ver-horarios');
    const feedbackMsg = document.getElementById('form-feedback');

    // Componentes de Navegação (Scroll Horizontal)
    const scrollContainer = document.getElementById('period-selector');
    const btnLeft = document.getElementById('btn-scroll-left');
    const btnRight = document.getElementById('btn-scroll-right');

    /**
     * Gerencia a visibilidade das setas de navegação horizontal no seletor de períodos.
     * Calcula dinamicamente se o conteúdo excede a largura do container e 
     * oculta as setas nos limites de rolagem (início e fim).
     * * @function updateMiniArrows
     * @returns {void}
     */
    const updateMiniArrows = () => {
        if (!scrollContainer || !btnLeft || !btnRight) return;
        
        const scrollWidth = scrollContainer.scrollWidth;
        const clientWidth = scrollContainer.offsetWidth;
        const scrollLeft = scrollContainer.scrollLeft;

        const isScrollable = scrollWidth > (clientWidth + 10);

        if (!isScrollable) {
            btnLeft.classList.add('hidden');
            btnRight.classList.add('hidden');
        } else {
            if (scrollLeft <= 5) btnLeft.classList.add('hidden');
            else btnLeft.classList.remove('hidden');

            if (scrollLeft >= (scrollWidth - clientWidth - 5)) btnRight.classList.add('hidden');
            else btnRight.classList.remove('hidden');
        }
    };

    /**
     * Objeto que armazena a seleção atual do usuário no formulário.
     * * @type {Object}
     * @property {string} course - Nome do curso digitado.
     * @property {string|null} shift - Turno selecionado (ex: 'matutino', 'noturno').
     * @property {string|null} period - Período selecionado (ex: '1', '2', etc).
     */
    let userSelection = { course: '', shift: null, period: null };

    /**
     * Lista de cursos permitidos e reconhecidos pelo sistema para validação básica.
     * * @constant {string[]}
     */
    const ALLOWED_COURSES = [
        "Sistemas para Internet",
        "sistemas para internet",
        "Sistemas Para Internet"
    ];

    /**
     * Dados de sessão salvos no LocalStorage para iniciar a aplicação no modo Warm Start.
     * @type {string|null}
     */
    const savedData = localStorage.getItem('mqs_user_data');
    const urlParams = new URLSearchParams(window.location.search);
    
    /**
     * Flag que indica se o usuário solicitou explicitamente voltar à tela de busca,
     * ignorando os dados salvos no LocalStorage.
     * @type {boolean}
     */
    const forceNewSearch = urlParams.get('action') === 'search';

    // Inicialização da interface (Warm Start vs Formulário)
    if (savedData && !forceNewSearch) {
        const data = JSON.parse(savedData);
        form.classList.add('hidden');
        warmDiv.classList.remove('hidden');

        savedCourse.textContent = data.course;
        const shiftFormatted = data.shift.charAt(0).toUpperCase() + data.shift.slice(1);
        savedDetails.textContent = `${data.period}º Período • ${shiftFormatted}`;

    } else {
        warmDiv.classList.add('hidden');
        form.classList.remove('hidden');

        if (forceNewSearch) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
    
    // Redireciona para a grade usando os dados já salvos
    quickBtn.addEventListener('click', () => window.location.href = 'grade.html');

    // Reseta o estado da aplicação e limpa o LocalStorage
    resetBtn.addEventListener('click', () => {
        localStorage.removeItem('mqs_user_data');
        warmDiv.classList.add('hidden');
        form.classList.remove('hidden');

        courseInput.value = '';
        userSelection = { course: '', shift: null, period: null };
        feedbackMsg.classList.add('hidden');

        shiftBtns.forEach(btn => btn.classList.remove('active'));
        periodBtns.forEach(btn => btn.classList.remove('active'));
        
        setTimeout(updateMiniArrows, 50);
    });

    // Captura a seleção de turno
    shiftBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userSelection.shift = btn.getAttribute('data-value');
            updateVisuals(shiftBtns, userSelection.shift);
        });
    });

    // Captura a seleção de período
    periodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userSelection.period = btn.getAttribute('data-value');
            updateVisuals(periodBtns, userSelection.period);
        });
    });

    // Processa a submissão do formulário
    submitBtn.addEventListener('click', () => {
        const courseValue = courseInput.value.trim();
        
        if (!courseValue) { showError("Por favor, digite o nome do curso!"); return; }

        if (!userSelection.shift || !userSelection.period) {
            showError("Por favor, selecione o turno e o período.");
            return;
        }

        const isSistemas = ALLOWED_COURSES.includes(courseValue);
        if (!isSistemas) { showError(`O curso "${courseValue}" estará disponível em breve!`); return; }

        if (isSistemas && (userSelection.period === '7' || userSelection.period === '8')) {
            showError(`Não existe ${userSelection.period}º período para esse curso.`);
            return;
        }

        if (isSistemas) {
            const isMatutino = userSelection.shift === 'matutino';
            if (!isMatutino) {
                showError(`Apenas o turno Matutino está disponível para este curso no momento.`);
                return;
            }
        }

        userSelection.course = courseValue;
        localStorage.setItem('mqs_user_data', JSON.stringify(userSelection));
        window.location.href = 'grade.html';
    });

    /**
     * Atualiza o estado visual de uma lista de botões (chips), aplicando 
     * a classe 'active' àquele que corresponde ao valor selecionado.
     * * @function updateVisuals
     * @param {NodeListOf<Element>} nodeList - NodeList dos botões que serão iterados.
     * @param {string} value - O atributo 'data-value' correspondente ao botão que deve ser ativado.
     * @returns {void}
     */
    function updateVisuals(nodeList, value) {
        nodeList.forEach(btn => {
            if (btn.getAttribute('data-value') === value) {
                btn.classList.add('active');
            } else { btn.classList.remove('active'); }
        });
    }

    /**
     * Exibe uma mensagem de erro na interface do usuário e aplica uma animação
     * de tremor (shake) no formulário para chamar a atenção.
     * * @function showError
     * @param {string} message - A mensagem de erro que será exibida ao usuário.
     * @returns {void}
     */
    function showError(message) {
        feedbackMsg.innerHTML = `<span class="material-symbols-rounded">error</span> ${message}`;
        feedbackMsg.classList.remove('hidden');
        courseInput.style.borderColor = '#C62828';
        form.classList.add('shake-anim');
        setTimeout(() => form.classList.remove('shake-anim'), 500);
    }

    // Busca de forma assíncrona a "dica do dia" para exibição no Warm Start
    if (savedData) {
        fetch('tip_of_day.json')
            .then(response => {
                if (!response.ok) throw new Error('Erro ao ler dicas');
                return response.json();
            })
            .then(data => {
                const randomTip = data.tips[Math.floor(Math.random() * data.tips.length)];
                tipTextElement.textContent = `"${randomTip}"`;
            })
            .catch(err => {
                console.warn('Fallback de dica ativado:', err);
                tipTextElement.textContent = "Mantenha o foco e beba água!";
            });
    }

    // Configuração de eventos para o carrossel horizontal de períodos
    if (scrollContainer && btnLeft && btnRight) {
        btnLeft.addEventListener('click', () => scrollContainer.scrollBy({ left: -200, behavior: 'smooth' }));
        btnRight.addEventListener('click', () => scrollContainer.scrollBy({ left: 200, behavior: 'smooth' }));

        scrollContainer.addEventListener('scroll', updateMiniArrows);
        window.addEventListener('resize', updateMiniArrows);

        updateMiniArrows();
        setTimeout(updateMiniArrows, 100);
        setTimeout(updateMiniArrows, 500);
        window.addEventListener('load', updateMiniArrows);
    }

    // Rola a tela para o topo após o blur dos inputs
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        input.addEventListener('blur', () => {
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 200);
        });
    });
});
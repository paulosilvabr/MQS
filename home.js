document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTOS DO DOM ---
    const form = document.getElementById('selection-form');
    const warmDiv = document.getElementById('warm-welcome');
    
    // Elementos do Warm Start
    const savedCourse = document.getElementById('saved-course');
    const savedDetails = document.getElementById('saved-details');
    const quickBtn = document.getElementById('btn-quick-access');
    const resetBtn = document.getElementById('btn-reset-app');
    
    // Elementos do Formulário
    const courseInput = document.getElementById('course-input');
    const shiftBtns = document.querySelectorAll('.segment-btn');
    const periodBtns = document.querySelectorAll('.chip-btn');
    const submitBtn = document.getElementById('btn-ver-horarios');
    const feedbackMsg = document.getElementById('form-feedback');

    // Estado Inicial do Formulário
    let userSelection = { course: '', shift: 'matutino', period: '2' };

    // ============================================================
    // 1. LÓGICA DE START (Cold vs Warm)
    // ============================================================
    const savedData = localStorage.getItem('mqs_user_data');

    if (savedData) {
        // --- CENÁRIO: ALUNO JÁ CONHECIDO ---
        const data = JSON.parse(savedData);
        
        // Esconde form, mostra boas-vindas
        form.classList.add('hidden');
        warmDiv.classList.remove('hidden');
        
        // Preenche os dados visuais
        savedCourse.textContent = data.course;
        // Formata turno (Matutino/Noturno)
        const shiftFormatted = data.shift.charAt(0).toUpperCase() + data.shift.slice(1);
        savedDetails.textContent = `${data.period}º Período • ${shiftFormatted}`;

    } else {
        // --- CENÁRIO: PRIMEIRO ACESSO ---
        warmDiv.classList.add('hidden');
        form.classList.remove('hidden');
    }

    // ============================================================
    // 2. INTERAÇÃO DO USUÁRIO
    // ============================================================
    
    // Botão "Ver Grade Agora" (Acesso Rápido)
    quickBtn.addEventListener('click', () => {
        window.location.href = 'grade.html';
    });

    // Botão "Alterar Curso" (Reset)
    resetBtn.addEventListener('click', () => {
        // Remove dados e volta ao form
        localStorage.removeItem('mqs_user_data');
        warmDiv.classList.add('hidden');
        form.classList.remove('hidden');
        courseInput.value = ''; // Limpa input
    });

    // Seleção de Turno
    shiftBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userSelection.shift = btn.getAttribute('data-value');
            updateVisuals(shiftBtns, userSelection.shift);
        });
    });

    // Seleção de Período
    periodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userSelection.period = btn.getAttribute('data-value');
            updateVisuals(periodBtns, userSelection.period);
        });
    });

    // Botão "Ver Horários" (Submit)
    submitBtn.addEventListener('click', () => {
        const courseValue = courseInput.value.trim();

        // Validação
        if (!courseValue) {
            feedbackMsg.classList.remove('hidden');
            courseInput.style.borderColor = '#C62828';
            courseInput.focus();
            return;
        }

        userSelection.course = courseValue;

        // Salva e Navega
        localStorage.setItem('mqs_user_data', JSON.stringify(userSelection));
        window.location.href = 'grade.html';
    });

    // Função visual auxiliar
    function updateVisuals(nodeList, value) {
        nodeList.forEach(btn => {
            if (btn.getAttribute('data-value') === value) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // ============================================================
    // 3. REQUISITO ACADÊMICO: FETCH COM .THEN
    // (Dica do dia)
    // ============================================================
    const tipElement = document.getElementById('daily-tip-text');
    
    // Usando uma API pública de citações (fallback seguro)
    fetch('https://api.quotable.io/random?tags=technology,wisdom&maxLength=60')
        .then(response => {
            if (!response.ok) throw new Error('Falha na rede');
            return response.json();
        })
        .then(data => {
            tipElement.textContent = `💡 "${data.content}"`;
        })
        .catch(error => {
            // Fallback se estiver offline
            console.log("Modo Offline ativado para dicas.");
            tipElement.textContent = "💡 Dica: Mantenha o foco e beba água!";
        });
});
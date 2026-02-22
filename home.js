/**
 * Controlador principal da Home.
 * Gerencia a inicialização da aplicação, alternância entre estados (Warm Start/Formulário),
 * validação de entradas e interações de UI.
 * * @author Diego Aquino
 * @contributor Paulo Ricardo Sousa Silva
 */
document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('selection-form');
    const warmDiv = document.getElementById('warm-welcome');

    const savedCourse = document.getElementById('saved-course');
    const savedDetails = document.getElementById('saved-details');
    const quickBtn = document.getElementById('btn-quick-access');
    const resetBtn = document.getElementById('btn-reset-app');
    const tipTextElement = document.getElementById('warm-tip-text');

    const courseInput = document.getElementById('course-input');
    const shiftBtns = document.querySelectorAll('.choice-chip');
    const periodBtns = document.querySelectorAll('.chip-btn');
    const submitBtn = document.getElementById('btn-ver-horarios');
    const feedbackMsg = document.getElementById('form-feedback');

    const scrollContainer = document.getElementById('period-selector');
    const btnLeft = document.getElementById('btn-scroll-left');
    const btnRight = document.getElementById('btn-scroll-right');

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

    let userSelection = { course: '', shift: null, period: null };

    const ALLOWED_COURSES = [
        "Sistemas para Internet",
        "sistemas para internet",
        "Sistemas Para Internet"
    ];

    const savedData = localStorage.getItem('mqs_user_data');
    const urlParams = new URLSearchParams(window.location.search);
    
    const forceNewSearch = urlParams.get('action') === 'search';

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
    
    quickBtn.addEventListener('click', () => window.location.href = 'grade.html');

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

    shiftBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userSelection.shift = btn.getAttribute('data-value');
            updateVisuals(shiftBtns, userSelection.shift);
        });
    });

    periodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userSelection.period = btn.getAttribute('data-value');
            updateVisuals(periodBtns, userSelection.period);
        });
    });

    submitBtn.addEventListener('click', () => {
        const courseValue = courseInput.value.trim();
        
        if (!courseValue) { showError("Por favor, digite o nome do curso!"); return; }

        if (!userSelection.shift || !userSelection.period) {
            showError("Por favor, selecione o turno e o período.");
            return;
        }

        const isSistemas = ALLOWED_COURSES.includes(courseValue);
        if (!isSistemas) { showError(`O curso "${courseValue}" estará disponível em breve!`); return; }

        // --- NOVA VALIDAÇÃO DOS PERÍODOS 7 E 8 ---
        if (isSistemas && (userSelection.period === '7' || userSelection.period === '8')) {
            showError(`Não existe ${userSelection.period}º período para esse curso.`);
            return;
        }

        // Validação de turno
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

    function updateVisuals(nodeList, value) {
        nodeList.forEach(btn => {
            if (btn.getAttribute('data-value') === value) {
                btn.classList.add('active');
            } else { btn.classList.remove('active'); }
        });
    }

    function showError(message) {
        feedbackMsg.innerHTML = `<span class="material-symbols-rounded">error</span> ${message}`;
        feedbackMsg.classList.remove('hidden');
        courseInput.style.borderColor = '#C62828';
        form.classList.add('shake-anim');
        setTimeout(() => form.classList.remove('shake-anim'), 500);
    }

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
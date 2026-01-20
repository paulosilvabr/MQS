document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('setup-form');
    const resultsArea = document.getElementById('results-area');
    const courseInput = document.getElementById('course-input');
    const periodContainer = document.getElementById('period-chips');
    const tipContainer = document.getElementById('tip-container');
    
    let db = {};

    // 1. ASYNC/AWAIT: Load main data
    async function loadAppData() {
        try {
            const response = await fetch('db.json');
            db = await response.json();
            populateCourses();
            renderPeriodChips(6); // Default 6 periods
            checkLocalStorage();
        } catch (error) {
            console.error("Erro ao carregar banco de dados", error);
        }
    }

    // 2. .THEN(): Load Tip of the Day
    function loadTip() {
        fetch('tip_of_day.json')
            .then(response => response.json())
            .then(data => {
                const randomTip = data.tips[Math.floor(Math.random() * data.tips.length)];
                tipContainer.textContent = `Dica: ${randomTip}`;
            });
    }

    function populateCourses() {
        const datalist = document.getElementById('courses-list');
        db.courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.name;
            datalist.appendChild(option);
        });
    }

    function renderPeriodChips(count) {
        periodContainer.innerHTML = '';
        for (let i = 1; i <= count; i++) {
            const chip = document.createElement('div');
            chip.className = `chip ${i === 1 ? 'active' : ''}`;
            chip.textContent = `${i}º`;
            chip.dataset.value = i;
            chip.onclick = () => {
                document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
            };
            periodContainer.appendChild(chip);
        }
    }

    function checkLocalStorage() {
        const saved = JSON.parse(localStorage.getItem('mqs_config'));
        if (saved) {
            courseInput.value = saved.course;
            document.querySelector(`input[name="shift"][value="${saved.shift}"]`).checked = true;
            showSchedule(saved.course, saved.shift, saved.period);
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const course = courseInput.value;
        const shift = document.querySelector('input[name="shift"]:checked').value;
        const period = document.querySelector('.chip.active').dataset.value;

        if (!course) return alert("Escolha um curso, mano!");

        localStorage.setItem('mqs_config', JSON.stringify({ course, shift, period }));
        showSchedule(course, shift, period);
    });

    function showSchedule(courseName, shift, period) {
        const courseData = db.courses.find(c => c.name === courseName);
        if (!courseData || !courseData.schedules[shift][period]) {
            alert("Horário não encontrado para este período.");
            return;
        }

        const todayClasses = courseData.schedules[shift][period];
        renderResults(todayClasses);
        
        form.classList.add('hidden');
        resultsArea.classList.remove('hidden');
        resultsArea.classList.add('fade-in');
    }

    function renderResults(classes) {
        const weekList = document.getElementById('week-list');
        const nowSubject = document.getElementById('now-subject');
        const nowRoom = document.getElementById('now-room');
        
        weekList.innerHTML = '';
        
        // Simulating "Now" logic based on day of week
        const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        const todayName = days[new Date().getDay()];
        const currentClass = classes.find(c => c.day === todayName) || classes[0];

        nowSubject.textContent = currentClass.subject;
        nowRoom.textContent = `Local: ${currentClass.room} • ${currentClass.time}`;

        classes.forEach(c => {
            const li = document.createElement('li');
            li.className = 'schedule-item';
            li.innerHTML = `
                <div>
                    <strong>${c.day}</strong><br>
                    <small>${c.subject}</small>
                </div>
                <span class="badge" style="background:var(--primary-light); color:var(--primary-dark)">${c.room}</span>
            `;
            weekList.appendChild(li);
        });
    }

    document.getElementById('btn-reset').onclick = () => {
        localStorage.clear();
        location.reload();
    };

    // Initialize
    loadAppData();
    loadTip();
});
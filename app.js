// 1. THE DATA (HARDCODED TRUTH)
const scheduleData = [
    {
        day: "Segunda",
        items: [
            { type: 'class', timeStart: '07:30', timeEnd: '09:00', subject: 'Fund Proj b de Dados', room: 'LABDES', prof: 'Liliane Felix' },
            { type: 'interval', timeStart: '09:00', timeEnd: '09:15', label: 'INTERVALO' },
            { type: 'class', timeStart: '09:15', timeEnd: '10:45', subject: 'Fund Proj b de Dados', room: 'LABDES', prof: 'Liliane Felix' }
        ]
    },
    {
        day: "Terça",
        items: [
            { type: 'class', timeStart: '07:30', timeEnd: '09:00', subject: 'Fund Proj b de Dados', room: 'LABDES', prof: 'Liliane Felix' },
            { type: 'interval', timeStart: '09:00', timeEnd: '09:15', label: 'INTERVALO' },
            { type: 'class', timeStart: '09:15', timeEnd: '10:45', subject: 'Fund Proj b de Dados', room: 'LABDES', prof: 'Liliane Felix' }
        ]
    },
    {
        day: "Quarta",
        items: [
            { type: 'class', timeStart: '07:30', timeEnd: '09:00', subject: 'Fund Proj b de Dados', room: 'LABDES', prof: 'Liliane Felix' },
            { type: 'interval', timeStart: '09:00', timeEnd: '09:15', label: 'INTERVALO' },
            { type: 'class', timeStart: '09:15', timeEnd: '10:45', subject: 'Fund Proj b de Dados', room: 'LABDES', prof: 'Liliane Felix' }
        ]
    },
    {
        day: "Quinta",
        items: [
            { type: 'class', timeStart: '07:30', timeEnd: '09:00', subject: 'Fund Proj b de Dados', room: 'LABDES', prof: 'Liliane Felix' },
            { type: 'interval', timeStart: '09:00', timeEnd: '09:15', label: 'INTERVALO' },
            { type: 'class', timeStart: '09:15', timeEnd: '10:45', subject: 'Fund Proj b de Dados', room: 'LABDES', prof: 'Liliane Felix' }
        ]
    },
    {
        day: "Sexta",
        items: [
            { type: 'class', timeStart: '07:30', timeEnd: '09:00', subject: 'Fund Proj b de Dados', room: 'LABDES', prof: 'Liliane Felix' },
            { type: 'interval', timeStart: '09:00', timeEnd: '09:15', label: 'INTERVALO' },
            { type: 'class', timeStart: '09:15', timeEnd: '10:45', subject: 'Fund Proj b de Dados', room: 'LABDES', prof: 'Liliane Felix' }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const scheduleView = document.getElementById('schedule-view');
    const toggleBtn = document.getElementById('btn-toggle-view');
    const shareBtn = document.getElementById('btn-share');
    const backBtn = document.getElementById('btn-back');

    // 1. Renderizar Grade
    function renderSchedule() {
        // Simple logic: If weekend (0 or 6), default to Monday (0) or keep same index logic
        // The data array index 0 is Monday. new Date().getDay() returns 0 for Sunday, 1 Mon...
        // Let's map JS day to Data Index: Mon(1)->0, Tue(2)->1 ... Fri(5)->4.
        const day = new Date().getDay();
        const todayIndex = (day >= 1 && day <= 5) ? day - 1 : -1; // -1 means no today highlight on weekend

        scheduleView.innerHTML = scheduleData.map((data, index) => `
            <article class="day-card ${index === todayIndex ? 'is-today' : ''}">
                <div class="day-card__title">
                    ${data.day}
                </div>
                <div class="classes-list">
                    ${data.items.map(item => {
            if (item.type === 'interval') {
                return `
                            <div class="interval-pill">
                                <span>${item.timeStart}</span>
                                <span>${item.label}</span>
                                <span>${item.timeEnd}</span>
                            </div>
                            `;
            } else {
                // type === 'class'
                return `
                            <div class="class-item">
                                <p class="class-item__subject">${item.subject}</p>
                                <div class="class-item__details">
                                    <span>${item.timeStart}</span>
                                    <span class="class-item__room">${item.room}</span>
                                    <span>${item.timeEnd}</span>
                                </div>
                                <p class="class-item__prof">${item.prof}</p>
                            </div>
                            `;
            }
        }).join('')}
                </div>
            </article>
        `).join('');
    }

    // 2. Alternar Visualização (Grid/Lista)
    toggleBtn.addEventListener('click', () => {
        const isGrid = scheduleView.classList.toggle('view-grid');
        const icon = document.getElementById('toggle-icon');
        icon.textContent = isGrid ? 'view_agenda' : 'view_week';
    });

    // 3. Sistema de Compartilhamento (Snapshot)
    shareBtn.addEventListener('click', async () => {
        const dock = document.querySelector('.floating-dock');

        // UI Feedback: Esconder dock para o print
        dock.style.display = 'none';

        try {
            const canvas = await html2canvas(document.querySelector("#app-viewport"), {
                backgroundColor: "#F0F4F8",
                scale: 2 // Alta qualidade
            });

            canvas.toBlob(blob => {
                const file = new File([blob], "grade-mqs.png", { type: "image/png" });

                if (navigator.share) {
                    navigator.share({
                        title: 'Minha Grade MQS',
                        text: 'Confere meus horários atualizados!',
                        files: [file]
                    });
                } else {
                    // Fallback Download
                    const link = document.createElement('a');
                    link.download = 'grade-mqs.png';
                    link.href = URL.createObjectURL(blob);
                    link.click();
                }
            });
        } catch (err) {
            console.error("Erro ao gerar imagem", err);
        } finally {
            dock.style.display = 'flex';
        }
    });

    // 4. Voltar (Reset)
    backBtn.addEventListener('click', () => {
        if (confirm("Deseja voltar para a tela inicial? (Recarrega a aplicação)")) {
            // In a real SPA, this would route back. Here we reload.
            window.location.reload();
        }
    });

    renderSchedule();
});
document.addEventListener('DOMContentLoaded', function() {
    generateHeatmap();
    updateStats();
});

// Get all logs from localStorage
function getAllLogs() {
    const allData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // Only get dates (format: YYYY-MM-DD)
        if (key.match(/^\d{4}-\d{2}-\d{2}$/)) {
            allData[key] = JSON.parse(localStorage.getItem(key));
        }
    }
    return allData;
}

// Count how many goals were met
function countGoalsMet(logData) {
    let count = 0;
    if (logData.steps >= 8000) count++;
    if (logData.sleep >= 7) count++;
    if (logData.gym) count++;
    if (logData.dev) count++;
    return count;
}

// Generate GitHub-style heatmap grid
function generateHeatmap() {
    const allLogs = getAllLogs();
    const heatmapGrid = document.getElementById('heatmapGrid');
    const monthLabels = document.getElementById('monthLabels');
    heatmapGrid.innerHTML = '';
    monthLabels.innerHTML = '';

    // Get last 52 weeks (364 days)
    const today = new Date();
    const oneYearAgo = new Date(today.getTime() - 364 * 24 * 60 * 60 * 1000);

    // Find the Monday of the week containing oneYearAgo
    const startDate = new Date(oneYearAgo);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    startDate.setDate(diff);

    // Create weeks array
    const weeks = [];
    let currentWeek = [];
    let currentDate = new Date(startDate);
    let monthTracks = {}; // Track first day of each month

    for (let i = 0; i < 364; i++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const month = currentDate.toLocaleString('default', { month: 'short' });
        const monthKey = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1);

        // Track first week of each month
        if (!monthTracks[monthKey]) {
            monthTracks[monthKey] = weeks.length;
        }

        const logData = allLogs[dateStr];
        let level = 'no-data';

        if (logData) {
            const goalsCount = countGoalsMet(logData);
            level = `level-${goalsCount}`;
        }

        const dayObj = {
            date: dateStr,
            level: level,
            goalsCount: logData ? countGoalsMet(logData) : 0,
            dayName: currentDate.toLocaleString('default', { weekday: 'short' })
        };

        currentWeek.push(dayObj);

        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    // If last week is incomplete, add it
    if (currentWeek.length > 0) {
        weeks.push(currentWeek);
    }

    // Create month labels
    const monthArray = Object.entries(monthTracks).map(([monthKey, weekIndex]) => ({
        monthKey,
        weekIndex,
        month: new Date(monthKey.split('-')[0], monthKey.split('-')[1] - 1).toLocaleString('default', { month: 'short' })
    }));

    // Add month labels
    let labelHTML = '<span></span>'; // Empty space for day labels column
    monthArray.forEach(({ month, weekIndex }) => {
        labelHTML += `<span style="grid-column: ${weekIndex + 2}">${month}</span>`;
    });
    monthLabels.innerHTML = labelHTML;

    // Create day labels (Mon, Tue, Wed, etc.)
    const dayLabels = document.getElementById('dayLabels');
    dayLabels.innerHTML = `
        <span class="day-label">Mon</span>
        <span class="day-label">Wed</span>
        <span class="day-label">Fri</span>
    `;

    // Create grid
    weeks.forEach((week, weekIndex) => {
        week.forEach((dayObj, dayIndex) => {
            const daySquare = document.createElement('div');
            daySquare.className = `day-square ${dayObj.level}`;
            daySquare.style.gridColumn = weekIndex + 2;
            daySquare.style.gridRow = dayIndex + 2;

            // Add tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            const goalsText = dayObj.goalsCount > 0 ? `${dayObj.goalsCount}/4 goals` : 'No data';
            tooltip.textContent = `${dayObj.date}: ${goalsText}`;
            daySquare.appendChild(tooltip);

            heatmapGrid.appendChild(daySquare);
        });
    });
}

// Calculate current streak
function calculateCurrentStreak() {
    const allLogs = getAllLogs();
    let streak = 0;
    let currentDate = new Date();

    for (let i = 0; i < 365; i++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const logData = allLogs[dateStr];

        if (!logData) {
            break; // Streak broken
        }

        const goalsCount = countGoalsMet(logData);
        if (goalsCount >= 1) { // At least 1 goal met
            streak++;
        } else {
            break;
        }

        currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
}

// Calculate best streak
function calculateBestStreak() {
    const allLogs = getAllLogs();
    const sortedDates = Object.keys(allLogs).sort();

    let bestStreak = 0;
    let currentStreak = 0;
    let lastDate = null;

    sortedDates.forEach(dateStr => {
        const logData = allLogs[dateStr];
        const goalsCount = countGoalsMet(logData);

        if (goalsCount >= 1) {
            if (!lastDate) {
                currentStreak = 1;
            } else {
                const last = new Date(lastDate);
                const current = new Date(dateStr);
                const diffDays = Math.floor((current - last) / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    currentStreak++;
                } else {
                    currentStreak = 1;
                }
            }
            bestStreak = Math.max(bestStreak, currentStreak);
            lastDate = dateStr;
        } else {
            currentStreak = 0;
        }
    });

    return bestStreak;
}

// Update all stats
function updateStats() {
    const allLogs = getAllLogs();
    const currentStreak = calculateCurrentStreak();
    const bestStreak = calculateBestStreak();
    let perfectDays = 0;

    Object.values(allLogs).forEach(log => {
        if (countGoalsMet(log) === 4) {
            perfectDays++;
        }
    });

    document.getElementById('currentStreak').textContent = currentStreak;
    document.getElementById('totalDays').textContent = Object.keys(allLogs).length;
    document.getElementById('bestStreak').textContent = bestStreak;
    document.getElementById('allGoalsMet').textContent = perfectDays;
}
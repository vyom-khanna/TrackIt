// FAKE DATA GENERATOR FOR TESTING
// Copy and paste this entire code into your browser console (F12)
// It will populate localStorage with 365 days of fake fitness data

(function() {
    console.log('Generating fake fitness data...');

    const today = new Date();
    const oneYearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);

    // Helper function to generate random number in range
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Generate data for each day in the past year
    for (let i = 0; i < 365; i++) {
        const currentDate = new Date(oneYearAgo.getTime() + i * 24 * 60 * 60 * 1000);
        const dateStr = currentDate.toISOString().split('T')[0];

        // 70% chance of having data logged
        if (Math.random() > 0.3) {
            const logData = {
                date: dateStr,
                sleep: randomInt(5, 10),           // 5-10 hours
                steps: randomInt(4000, 12000),     // 4k-12k steps
                protein: randomInt(80, 200),       // 80-200g protein
                gym: Math.random() > 0.6,          // 40% chance of gym
                dev: Math.random() > 0.7,          // 30% chance of development
                savedAt: new Date(currentDate).toLocaleString()
            };

            localStorage.setItem(dateStr, JSON.stringify(logData));
        }
    }

    console.log('Generated 365 days of fake data!');
    console.log('Data saved to localStorage');
    console.log('Refresh your page to see the heatmap!');
    console.log('');
    console.log('Stats Generated:');
    console.log('- ~255 days with logged data (70%)');
    console.log('- Steps: 4,000-12,000 per day');
    console.log('- Protein: 80-200g per day');
    console.log('- Sleep: 5-10 hours per day');
    console.log('- ~40% of days include gym');
    console.log('- ~30% of days include development');
    console.log('');
    console.log('To clear all data and start over, run: localStorage.clear()');

})();

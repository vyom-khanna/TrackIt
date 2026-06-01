# 💪 Fitness Tracker - LeetCode Style Streak Heatmap

A personal fitness tracking application that lets you log your daily health goals and visualize your progress with a **LeetCode-style heatmap**. Track your steps, protein intake, gym sessions, sleep, and personal development in one place!

---

## 📸 Features

### 📝 Log Page
- **Daily Logging** - Log 4 daily metrics:
  - 👣 Steps (Goal: 8000)
  - 🥗 Protein intake in grams (Goal: 150g)
  - 🏋️ Gym session (Yes/No)
  - 😴 Sleep hours
  - 💻 Development/Learning (Yes/No)
- **Date Selection** - Log data for any day
- **Form Validation** - Ensures at least one value is entered
- **Success Feedback** - Confirmation message when data is saved
- **Auto-Clear** - Form resets after each entry

### 📊 Streak Page (Dashboard)
- **LeetCode-Style Heatmap** - Visual representation of last 52 weeks
- **Color Intensity Coding:**
  - ⚪ Gray = No data
  - 🟢 Dark Green = 1 goal met
  - 🟢 Medium Green = 2 goals met
  - 🟢 Light Green = 3 goals met
  - 🟢 **Bright Green = All 4 goals met** ✨
- **Interactive Tooltips** - Hover over any day to see details
- **Statistics Dashboard:**
  - 🔥 Current Streak (consecutive days)
  - 📅 Total Days Logged
  - 🏆 Best Streak (all-time)
  - ⭐ Perfect Days (all 4 goals met)

---

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage:** Browser localStorage (no backend needed)
- **Responsive Design:** Mobile-friendly CSS Grid & Flexbox

---

## 📁 Project Structure

```
fitness-tracker/
├── README.md           # This file

📝 Log Page
├── Log.html            # Daily logging page
├── Log.css             # Log page styling
├── Log.js              # Log page JavaScript

📊 Streak Page  
├── streak.html         # Heatmap dashboard
├── streak.css          # Streak page styling
├── streak.js           # Streak page JavaScript
```

### File Descriptions

| File | Purpose |
|------|---------|
| **Log.html** | Form for logging daily fitness data |
| **Log.css** | Styling for the logging interface |
| **Log.js** | Handles form submission & localStorage save |
| **streak.html** | Displays heatmap and statistics |
| **streak.css** | Styling for heatmap grid & stats |
| **streak.js** | Generates heatmap, calculates stats |

---

## 🚀 Quick Start

### 1. Setup
- Create a folder for the project
- Place all 6 files in the same folder:
  - `Log.html`, `Log.css`, `Log.js`
  - `streak.html`, `streak.css`, `streak.js`
  - `README.md`
- No installation required - works locally!

### 2. Open the App
- Open `Log.html` in your web browser
- Or navigate to the project folder and double-click `Log.html`

### 3. Start Tracking
- Fill in your daily metrics and click **"Submit"**
- Click the **"Streak"** link to see your heatmap and stats
- Data is automatically saved in your browser's localStorage

---

## 📖 How to Use

### Logging Data

1. Open `Log.html` in your browser
2. The date auto-fills with today's date (you can change it)
3. Enter your metrics:
   - Sleep hours (number)
   - Steps (number)
   - Protein in grams (number)
   - Check Gym if you went to the gym
   - Check Development if you did learning/coding
4. Click **"Submit"**
5. See confirmation message ✅
6. Form clears automatically for next entry

### Viewing Your Streak

1. From the Log page, click the **"Streak"** link
2. Or directly open `streak.html`
3. See your statistics at the top:
   - Current consecutive days streak
   - Total days you've logged
   - Best streak ever achieved
   - Perfect days (all 4 goals met)
4. Scroll down to see the **52-week heatmap**
5. **Hover over any square** to see that day's details

### Goals Explained

Each day tracks 4 metrics:
- ✅ **Steps** ≥ 8000 steps
- ✅ **Protein** ≥ 150 grams
- ✅ **Gym** = Worked out
- ✅ **Sleep** ≥ 7 hours

A "perfect day" means all 4 goals were met!

---

## 💾 Data Storage

- **Location:** Browser's localStorage
- **Format:** JSON objects
- **Persistence:** Data stays even after closing the browser
- **Backup:** Open DevTools (F12) → Application → Local Storage to see all your data

**To export your data:**
```javascript
// Copy this into DevTools Console:
console.log(JSON.stringify(localStorage))
// Copy the output and save to a .json file
```

---

## 🎨 Customization

### Change Goal Thresholds

Edit `streak.js` in the `countGoalsMet()` function:

```javascript
function countGoalsMet(logData) {
    let count = 0;
    if (logData.steps >= 8000) count++;      // Change 8000
    if (logData.sleep >= 7) count++;         // Change 7
    if (logData.gym) count++;
    if (logData.dev) count++;
    return count;
}
```

### Change Colors

Edit the CSS classes in `streak.css`:

```css
.day-square.level-1 {
    background: #0d3d1d;    /* Change this hex color */
}
.day-square.level-2 {
    background: #1a5c34;
}
.day-square.level-3 {
    background: #2d8659;
}
.day-square.level-4 {
    background: #00ff00;
}
```

### Change Form Labels or Fields

Edit `Log.html` to modify:
- Input labels
- Placeholder text
- Goal values shown to users

---

## 🐛 Troubleshooting

### Data not saving?
- Check browser console (F12) for errors
- Make sure localStorage is enabled in your browser
- Try a different browser
- Ensure all three Log files are in the same folder

### Heatmap not showing?
- Make sure you've logged at least one day of data
- Check that `streak.html`, `streak.css`, and `streak.js` are in the same folder
- Refresh the page (Ctrl+R or Cmd+R)

### Streak page won't open?
- Make sure `streak.html` is in the same folder as `Log.html`
- Check the browser console (F12) for file loading errors
- Verify all 6 files are present in the project folder

### Dates not matching?
- localStorage uses YYYY-MM-DD format
- Make sure you're selecting the correct date when logging
- Dates must match exactly to retrieve past logs

---

## 📚 Learning Concepts Used

### In Log Page (Log.js):
- DOM manipulation with `getElementById`
- Event listeners (`addEventListener`)
- Form handling & validation
- localStorage basics (setItem, getItem)
- JSON serialization (`JSON.stringify`)
- Date handling (`toISOString`)

### In Streak Page (streak.js):
- **Advanced JavaScript:**
  - localStorage iteration (length, key())
  - Date object & date arithmetic
  - Regular expressions (regex pattern matching)
  - Array methods (sort, forEach)
  - Dynamic DOM creation (createElement, appendChild)
  - CSS class manipulation (classList.add)
  - Math operations (Math.max, Math.floor)

- **Advanced CSS (streak.css):**
  - CSS Grid layouts (`grid-template-columns`)
  - Flexbox for responsive layouts
  - CSS transitions & animations (`transition`, `transform`)
  - Hover effects (`:hover` pseudo-class)
  - Responsive design (`aspect-ratio`, `flex-wrap`)
  - Color theory & visual hierarchy

---

## 🚧 Future Features

Potential improvements you can add:

- [ ] **Multi-week view** - See multiple months at once
- [ ] **Goal customization** - Set your own targets
- [ ] **Data export** - Download logs as CSV
- [ ] **Weekly summary** - Email report of the week
- [ ] **Notes field** - Add comments to each day
- [ ] **Achievements** - Unlock badges for milestones
- [ ] **Dark/Light mode toggle** - Theme switcher
- [ ] **Cloud sync** - Save to server (requires backend)
- [ ] **Mobile app** - React Native version
- [ ] **Social sharing** - Share streaks with friends

---

## 📱 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 💡 Tips for Success

1. **Log consistently** - Best results with daily logging
2. **Set realistic goals** - Adjust thresholds based on your lifestyle
3. **Check the heatmap weekly** - Stay motivated by visualizing progress
4. **Don't break the chain** - Try to maintain your streak! 🔥

---

## 📝 License

This project is created for personal use. Feel free to modify and share!

---

## 🤝 Contributing

Want to improve this project?
1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Share improvements!

---

## 📞 Support

Having issues? Try:
1. Check the troubleshooting section
2. Clear browser cache and reload
3. Check the browser console for errors
4. Make sure all files are in the same folder

---

**Happy tracking! Keep that streak alive! 🔥💪**

Last updated: June 2026
Version: 1.0
# Pomodoro Timer

A minimalist, **web-based Pomodoro Timer** designed to boost productivity using the classic Pomodoro technique. Clean Claude-inspired UI with customizable work/rest intervals, notifications, and responsive design. Perfect for portfolio showcasing.

---

## Features

### Core Functionality
- **Countdown Timer** with default sessions:
  - 25-minute work
  - 5-minute short break
  - 15-minute long break after 4 cycles
- **Controls**:
  - Start, Pause, Reset
  - Skip current session
- Display current session type: **Work / Short Break / Long Break**

### Customization
- Set **custom durations** for work, short break, and long break sessions
- Configure number of cycles before a long break
- Optional color themes for different session types

### Notifications & Alerts
- Browser notifications when a session ends
- Optional sound alerts for session completion

### UI / Design
- Claude-style minimalist design with:
  - Soft pastel accents
  - Rounded buttons
  - Circular or rectangular timer display
  - Smooth animations or progress bar showing remaining time
- Fully **responsive** for desktop, tablet, and mobile
- Optional **dark mode toggle**

### Tracking & Statistics (Optional)
- Count completed Pomodoro sessions
- Display daily productivity streaks
- Optional: save session history in `localStorage`  

---

## Tech Stack

- **HTML** – structure of timer and controls  
- **CSS** – Claude-style UI, responsive design, progress bar, hover effects  
- **JavaScript** – countdown logic, session switching, notifications, and customization  
- Optional: **Python with Tkinter** for desktop version  

---

## Usage

1. Clone the repository:  
```bash
git clone https://github.com/your-username/claude-style-pomodoro-timer.git

Open index.html in your web browser (or run app.py for Tkinter version).

Use the controls to start, pause, or reset the timer.

Optional: customize work/rest durations in settings panel.
## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

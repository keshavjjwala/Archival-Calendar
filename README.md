# 🗓️ Archival Calendar — Interactive Frontend Experience

A modern, interactive calendar application built with **React + Tailwind CSS**, designed to replicate the feel of a physical wall calendar while delivering a smooth digital experience.

This project focuses on **UI/UX precision, interaction design, and clean frontend architecture**, rather than backend complexity.

---

## 🚀 Live Features

### 📅 Multi-View Calendar

* **Monthly View** – Fully interactive calendar grid
* **Weekly View** – Focused 7-day breakdown
* **Yearly View** – Compact overview of all months

---

### 🎬 Realistic Calendar Flip Animation

* Vertical flip animation inspired by **spiral wall calendars**
* Uses `transform-origin: top` for realistic motion
* Smooth easing + perspective for depth

---

### 🔄 Agenda View (Google Calendar Inspired)

* Toggle between:

  * Calendar view (grid)
  * Agenda view (date-wise list)
* Clean grouping of events by date

---

### 🧠 Smart Date Selection

* Single date selection
* Range selection (start → end)
* Hover preview
* Drag-to-select interaction

---

### 📝 Notes & Event System

* Attach notes/events to specific dates
* Visual indicators for events
* Editable and deletable entries

---

### 💾 Persistent State (No Backend)

* Data stored using `localStorage`
* Survives page refresh
* No external APIs required

---

### 🧹 Clean UX Details

* Smooth transitions and micro-interactions
* Responsive layout (desktop + mobile)
* Empty states for better usability
* Non-intrusive controls

---

## 🏗️ Tech Stack

* **React (Functional Components)**
* **Tailwind CSS**
* **Framer Motion (for animations)**
* Native JavaScript `Date` API (no external date libraries)

---

## 🧩 Architecture Highlights

* Modular component structure:

  ```
  components/
  hooks/
  utils/
  ```

* Custom hooks for reusable logic (e.g., localStorage)

* Separation of UI and logic for maintainability

* Optimized rendering with minimal re-renders

---

## ⚙️ Key Engineering Decisions

### 1. No Backend by Design

The project strictly follows a frontend-only approach using `localStorage` for persistence, aligning with real-world offline-first UI scenarios.

---

### 2. Native Date Handling

Instead of using libraries like `moment.js`, all calendar logic is implemented using the native `Date` object to demonstrate core JavaScript understanding.

---

### 3. Controlled Feature Scope

Rather than replicating full Google Calendar complexity, features were implemented with a focus on:

* usability
* clarity
* performance

---

### 4. Animation Philosophy

Animations are:

* subtle
* smooth
* purposeful

Avoiding over-engineering while enhancing user experience.

---

## 🎯 What This Project Demonstrates

* Strong frontend fundamentals
* Attention to UI/UX detail
* Clean and scalable architecture
* Product thinking beyond basic requirements

---

## 📦 Getting Started

```bash
npm install
npm run dev
```

---

## 📌 Future Improvements

* Undo delete (toast system)
* Event color tagging
* Keyboard navigation support
* Drag-and-drop event editing

---

## 👨‍💻 Author

**Keshav Jhunjhunwala**
Frontend Developer

---

## 📄 License

This project is for educational and demonstration purposes.

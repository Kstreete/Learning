# Concierge Medicine Physician Tracker

A simple, beginner-friendly web app to track physicians who may be interested in concierge medicine.

## What this app does

- Tracks physician leads in one dashboard.
- Stores:
  - Physician name
  - Specialty
  - Contact info
  - Status (`new lead`, `contacted`, `interested`, `scheduled call`, `converted`)
  - Last contact date
  - Next follow-up date
  - Notes
- Supports **add, edit, delete**.
- Includes **status filtering**.
- Shows a **reminder indicator** for follow-ups (overdue / upcoming / due later).
- Saves data in your browser via `localStorage`.

---

## Live preview (local)

Because this is a static app (HTML/CSS/JS), you can run a local preview server in one command.

### Option A (recommended): Python built-in server

1. Open a terminal.
2. Go to the project folder:
   ```bash
   cd /workspace/Learning
   ```
3. Start a local server:
   ```bash
   python3 -m http.server 4173
   ```
4. Open your browser and visit:
   ```
   http://localhost:4173
   ```
5. Stop the server any time with `Ctrl + C` in the terminal.

### Option B: Open file directly (quickest)

1. Open `index.html` in your browser.
2. The app will still work for basic usage.

> Tip: Option A is better because it matches normal web app behavior.

---

## Beginner walkthrough: how to use the app

### 1) Add your first physician lead

1. In **Add Physician Lead**, fill out the form fields.
2. Click **Add Lead**.
3. Your lead appears in the dashboard table on the right/below.

### 2) Edit a lead

1. Find the row in the dashboard.
2. Click **Edit**.
3. Update fields in the form.
4. Click **Save Changes**.

### 3) Delete a lead

1. In the row you want to remove, click **Delete**.
2. The lead is removed from the table.

### 4) Filter by status

1. Use the **Filter by Status** dropdown above the table.
2. Select a status like `interested` or `scheduled call`.
3. The table will show only matching leads.

### 5) Follow-up reminders

Look at the **Reminder** column:
- **Overdue** → follow-up date already passed.
- **Upcoming** → follow-up is in 0–3 days.
- **Due in X days** → follow-up is later.

### 6) Data persistence

- Your entries are stored in browser local storage.
- If you refresh the page in the same browser, your data remains.
- If you clear site data/local storage, entries are removed.

---

## Files

- `index.html` – UI structure and table/form layout.
- `styles.css` – blue/white medical theme and responsive styling.
- `app.js` – CRUD logic, filtering, reminders, and local storage.

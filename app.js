const STORAGE_KEY = "conciergePhysicianLeads";

const form = document.getElementById("leadForm");
const leadIdInput = document.getElementById("leadId");
const formTitle = document.getElementById("formTitle");
const saveBtn = document.getElementById("saveBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const statusFilter = document.getElementById("statusFilter");
const tableBody = document.getElementById("leadTableBody");

const fields = {
  name: document.getElementById("name"),
  specialty: document.getElementById("specialty"),
  contact: document.getElementById("contact"),
  status: document.getElementById("status"),
  lastContact: document.getElementById("lastContact"),
  nextFollowUp: document.getElementById("nextFollowUp"),
  notes: document.getElementById("notes"),
};

function loadLeads() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLeads(leads) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

function getReminderText(nextFollowUp) {
  if (!nextFollowUp) {
    return { text: "No date", className: "reminder" };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const followUpDate = new Date(nextFollowUp + "T00:00:00");
  const diffDays = Math.round((followUpDate - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { text: `Overdue by ${Math.abs(diffDays)} day(s)`, className: "reminder overdue" };
  }

  if (diffDays <= 3) {
    return { text: `Upcoming in ${diffDays} day(s)`, className: "reminder upcoming" };
  }

  return { text: `Due in ${diffDays} day(s)`, className: "reminder ok" };
}

function renderTable() {
  const leads = loadLeads();
  const selectedStatus = statusFilter.value;

  const filtered = selectedStatus === "all"
    ? leads
    : leads.filter((lead) => lead.status === selectedStatus);

  if (!filtered.length) {
    tableBody.innerHTML = `<tr><td class="empty" colspan="9">No physician leads found for this filter.</td></tr>`;
    return;
  }

  tableBody.innerHTML = filtered
    .map((lead) => {
      const reminder = getReminderText(lead.nextFollowUp);
      return `
        <tr>
          <td>${lead.name}</td>
          <td>${lead.specialty}</td>
          <td>${lead.contact}</td>
          <td><span class="status-badge">${lead.status}</span></td>
          <td>${lead.lastContact || "—"}</td>
          <td>${lead.nextFollowUp || "—"}</td>
          <td>${lead.notes || "—"}</td>
          <td><span class="${reminder.className}">${reminder.text}</span></td>
          <td>
            <div class="action-buttons">
              <button class="btn" data-action="edit" data-id="${lead.id}">Edit</button>
              <button class="btn" data-action="delete" data-id="${lead.id}">Delete</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function resetForm() {
  form.reset();
  leadIdInput.value = "";
  formTitle.textContent = "Add Physician Lead";
  saveBtn.textContent = "Add Lead";
  cancelEditBtn.hidden = true;
}

function populateForm(lead) {
  leadIdInput.value = lead.id;
  fields.name.value = lead.name;
  fields.specialty.value = lead.specialty;
  fields.contact.value = lead.contact;
  fields.status.value = lead.status;
  fields.lastContact.value = lead.lastContact || "";
  fields.nextFollowUp.value = lead.nextFollowUp || "";
  fields.notes.value = lead.notes || "";

  formTitle.textContent = "Edit Physician Lead";
  saveBtn.textContent = "Save Changes";
  cancelEditBtn.hidden = false;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const leads = loadLeads();
  const id = leadIdInput.value;

  const payload = {
    id: id || crypto.randomUUID(),
    name: fields.name.value.trim(),
    specialty: fields.specialty.value.trim(),
    contact: fields.contact.value.trim(),
    status: fields.status.value,
    lastContact: fields.lastContact.value,
    nextFollowUp: fields.nextFollowUp.value,
    notes: fields.notes.value.trim(),
  };

  const updatedLeads = id
    ? leads.map((lead) => (lead.id === id ? payload : lead))
    : [payload, ...leads];

  saveLeads(updatedLeads);
  resetForm();
  renderTable();
});

cancelEditBtn.addEventListener("click", resetForm);

statusFilter.addEventListener("change", renderTable);

tableBody.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const action = target.dataset.action;
  const id = target.dataset.id;
  if (!action || !id) {
    return;
  }

  const leads = loadLeads();
  const lead = leads.find((item) => item.id === id);

  if (action === "edit" && lead) {
    populateForm(lead);
    return;
  }

  if (action === "delete") {
    const updated = leads.filter((item) => item.id !== id);
    saveLeads(updated);
    if (leadIdInput.value === id) {
      resetForm();
    }
    renderTable();
  }
});

renderTable();

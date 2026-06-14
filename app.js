// Mock Data Initialization
const initData = () => {
  if (!localStorage.getItem('complaints')) {
    localStorage.setItem('complaints', JSON.stringify([
      { id: 1, title: 'Fan not working', desc: 'Ceiling fan is making noise and not spinning properly.', room: '402', category: 'Electrical', priority: 'High', dept: 'Maintenance Team', status: 'Pending', date: '2026-06-12' },
      { id: 2, title: 'Tap leaking', desc: 'Washroom tap is leaking continuously.', room: '402', category: 'Plumbing', priority: 'Medium', dept: 'Plumbing Team', status: 'Resolved', date: '2026-06-10' }
    ]));
  }
  if (!localStorage.getItem('leaves')) {
    localStorage.setItem('leaves', JSON.stringify([
      { id: 1, start: '2026-06-15', end: '2026-06-18', reason: 'Family function in hometown.', status: 'Approved', date: '2026-06-11' }
    ]));
  }
  if (!localStorage.getItem('gatepasses')) {
    localStorage.setItem('gatepasses', JSON.stringify([]));
  }
};

initData();

// AI Categorization Engine (Mock)
const analyzeComplaint = (desc) => {
  const lowerDesc = desc.toLowerCase();
  if (lowerDesc.includes('fan') || lowerDesc.includes('light') || lowerDesc.includes('wire') || lowerDesc.includes('ac') || lowerDesc.includes('electric')) {
    return { category: 'Electrical', priority: 'High', dept: 'Maintenance Team' };
  } else if (lowerDesc.includes('water') || lowerDesc.includes('leak') || lowerDesc.includes('tap') || lowerDesc.includes('washroom') || lowerDesc.includes('pipe')) {
    return { category: 'Plumbing', priority: 'Medium', dept: 'Plumbing Team' };
  } else if (lowerDesc.includes('wifi') || lowerDesc.includes('internet') || lowerDesc.includes('network') || lowerDesc.includes('router')) {
    return { category: 'IT Support', priority: 'Medium', dept: 'Network Team' };
  } else if (lowerDesc.includes('clean') || lowerDesc.includes('sweep') || lowerDesc.includes('dust') || lowerDesc.includes('garbage')) {
    return { category: 'Housekeeping', priority: 'Low', dept: 'Cleaning Staff' };
  } else {
    return { category: 'General', priority: 'Low', dept: 'General Admin' };
  }
};

// LocalStorage Helpers
const getItems = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setItems = (key, items) => localStorage.setItem(key, JSON.stringify(items));
const addItem = (key, item) => {
  const items = getItems(key);
  item.id = Date.now();
  item.date = new Date().toISOString().split('T')[0];
  items.push(item);
  setItems(key, items);
  return item;
};
const updateItemStatus = (key, id, status) => {
  const items = getItems(key);
  const index = items.findIndex(i => i.id == id);
  if (index !== -1) {
    items[index].status = status;
    setItems(key, items);
  }
};

// UI Helpers
const showNotification = (message) => {
  const notif = document.createElement('div');
  notif.className = 'glass-card animate-fade-in';
  notif.style.position = 'fixed';
  notif.style.bottom = '24px';
  notif.style.right = '24px';
  notif.style.padding = '16px 24px';
  notif.style.background = 'rgba(52, 211, 153, 0.2)';
  notif.style.color = 'white';
  notif.style.border = '1px solid var(--success)';
  notif.style.zIndex = '9999';
  notif.innerHTML = `<div class="flex items-center gap-2"><i data-lucide="check-circle" style="color: var(--success)"></i> ${message}</div>`;
  document.body.appendChild(notif);
  lucide.createIcons();
  setTimeout(() => notif.remove(), 3000);
};

// Theme Logic
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

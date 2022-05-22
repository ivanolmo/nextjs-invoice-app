export function formatDate(d) {
  let date = new Date(d);
  let options = { month: 'short', day: 'numeric', year: 'numeric' };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function addDays(date, number) {
  const d = new Date(date);
  return new Date(d.setDate(d.getDate() + number)).toISOString();
}

export function formatMoney(m) {
  let options = { style: 'currency', currency: 'USD' };
  return new Intl.NumberFormat('en-US', options).format(m);
}

export function formatStatus(s) {
  return s[0].toUpperCase() + s.slice(1);
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function generateId() {
  let id = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';

  for (let i = 0; i < 2; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  for (let i = 0; i < 4; i++) {
    id += nums.charAt(Math.floor(Math.random() * nums.length));
  }

  return id;
}

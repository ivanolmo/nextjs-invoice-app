export function formatDate(d) {
  let date = new Date(d);
  let options = { month: 'short', day: 'numeric', year: 'numeric' };

  return new Intl.DateTimeFormat('en-US', options).format(date);
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

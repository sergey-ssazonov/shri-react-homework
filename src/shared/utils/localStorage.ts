export const saveToLocalStorage = (key: string, value: unknown) => {
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  const updated = [...existing, value];
  localStorage.setItem(key, JSON.stringify(updated));
};

export const getFromLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

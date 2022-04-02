const APP_STORAGE_KEY = "APP_STORAGE_KEY";

export const getFromLocalStorage = () => {
  const prevStorage = localStorage.getItem(APP_STORAGE_KEY);

  return prevStorage ? JSON.parse(prevStorage) : {};
};

export const setToLocalStorage = <T>(data: T): void => {
  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
};

export const updateLocalStorage = <T>(data: T): void => {
  setToLocalStorage({ ...getFromLocalStorage(), ...data });
};

export const removeLocalStorage = (): void => {
  localStorage.removeItem(APP_STORAGE_KEY);
};

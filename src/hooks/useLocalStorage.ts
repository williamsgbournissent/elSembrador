export function useLocalStorage() {
  function getValue(key: string) {
    if (!localStorage) return null;
    const value = localStorage.getItem(key);
    return value;
  }

  function setValue(key: string, value: string) {
    if (!localStorage) return null;
    localStorage.setItem(key, value);
  }

  function removeValue(key: string) {
    if (!localStorage) return null;
    localStorage.removeItem(key);
  }

  return {
    getValue,
    setValue,
    removeValue,
  };
}

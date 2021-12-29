export const localStorageMock = () => {
  let store = {}
  return {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => (store[key] = value),
    clear: () => (store = {}),
  }
}

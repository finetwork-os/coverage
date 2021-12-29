// Polyfill "window.fetch" used in the React component.
import 'whatwg-fetch'

// Extend Jest "expect" functionality with Testing Library assertions.
import '@testing-library/jest-dom'

import { server } from './src/mocks/server'
import { localStorageMock } from './src/mocks/local-storage'

beforeAll(() => {
  server.listen()
  localStorageMock().clear()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

global.localStorage = localStorageMock

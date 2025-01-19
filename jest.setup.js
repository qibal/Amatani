import '@testing-library/jest-dom'

jest.spyOn(global.console, 'log').mockImplementation(() => { });
jest.spyOn(global.console, 'warn').mockImplementation(() => { });

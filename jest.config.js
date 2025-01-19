const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["json", "text", "lcov", "clover", "text-summary", "html"],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  silent: true,
};

module.exports = createJestConfig(config)

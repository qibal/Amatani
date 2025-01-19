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
  // coverageThreshold: {
  //   global: {
  //     branches: 90,
  //     functions: 90,
  //     lines: 90,
  //     statements: 90,
  //   },
  // },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // ...
    '^@/(.*)$': '<rootDir>/$1',
  }
};

module.exports = createJestConfig(config)
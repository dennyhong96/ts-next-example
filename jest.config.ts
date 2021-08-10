export default {
  testEnvironment: "jsdom", // 'jsdom' or 'node'

  setupFilesAfterEnv: ["./jest.setup.ts"],

  testRegex: "\\.(test|integration|unit|spec|e2e)\\.ts",

  moduleNameMapper: {
    // Mock css and svg imports
    "\\.css$": "<rootDir>/src/__tests__/mock.ts",
    "\\.svg$": "<rootDir>/src/__tests__/mock.ts",
    // For import aliasing
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@context(.*)$": "<rootDir>/src/context$1",
    "^@hooks(.*)$": "<rootDir>/src/hooks$1",
    "^@lib(.*)$": "<rootDir>/src/lib$1",
    "^@pages(.*)$": "<rootDir>/src/pages$1",
    "^@styles(.*)$": "<rootDir>/src/styles$1",
    "^@types(.*)$": "<rootDir>/src/types$1",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
  },

  collectCoverageFrom: ["**/src/**/*.ts"],

  // Set coverage target thresholds to meet
  coverageThreshold: {
    global: {
      statements: 35,
      branches: 20,
      functions: 35,
      lines: 35,
    },
  },
};

module.exports = {
  testEnvironment: "node",
  clearMocks: true,
  coverageProvider: "v8",
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"]
};

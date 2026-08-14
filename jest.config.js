/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    "\\.(png|jpg|jpeg|gif)$": "<rootDir>/src/testing/fileMock.js",
  },
};

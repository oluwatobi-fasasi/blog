export default {
    transform: {
        "^.+\\.(js|jsx)$": ["babel-jest", { presets: ["@babel/preset-env", "@babel/preset-react"] }],
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",  // Adjust based on your project structure
    },
    testEnvironment: "jest-environment-jsdom",
};

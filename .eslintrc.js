module.exports = {
    overrides: [
        {
            files: [
                "**/*.spec.ts",
                "**/*.test.ts",
                "**/test.ts",
            ],
            env: {
                "jest": true
            }
        }
    ],
    env: {
        es2021: true,
        node: true,
    },
    extends: ["standard"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    ignorePatterns: "build",
    rules: {
        "no-console": 1,
        "semi": ["error", "never"],
        "quotes": ["error", "single"],
    },
};

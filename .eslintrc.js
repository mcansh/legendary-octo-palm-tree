/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "@remix-run/eslint-config/internal",
  ],
  rules: {
    "react/jsx-no-leaked-render": ["error", { validStrategies: ["ternary"] }],
  },
};

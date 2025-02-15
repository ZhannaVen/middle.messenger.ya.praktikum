import js from "@eslint/js";

export default [
  {
    ignores: [
      "dist/**",
      "server.cjs",
      "vite.config.js",
      "mochaSetup.mjs",
      "node_modules/**"
    ]
  },
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn"
    }
  }
];


import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default defineConfig(
  { ignores: ["dist"] },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // Plain JS files (webpack configs) aren't part of the TS project
    files: ["**/*.js"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
    },
  },
);

import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "no-eval": "error",
      "quotes": ["error", "single"],                    // одинарные кавычки
      "indent": ["error", 4],                           // 4 пробела
      "semi": ["error", "always"],                      // всегда ставить точку с запятой
      "comma-dangle": ["error", "always-multiline"],    // запятая в конце многострочных объектов/массивов
      "no-trailing-spaces": "error",                    // запрет пробелов в конце строки
      "eol-last": ["error", "always"],                  // пустая строка в конце файла
      "no-multiple-empty-lines": ["error", { "max": 1 }], // максимум одна пустая строка
    },
  },
]);

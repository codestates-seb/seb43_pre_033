module.exports = {
  root: true, // 상위 설정파일에 영향 받지 않음
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/no-unresolved": "off",
    "react/jsx-uses-react": "off", // import React 생략하면 error 나던 현상 제거
    "react/jsx-filename-extension": ["warn", { extensions: ["jsx", "js"] }], // react 파일 확장자 js, jsx 허용
    "react/prop-types": "off", // props type 선언 안했을 때 error 나던 현상 제거
    "no-unused-vars": "warn", // 변수 선언 후 사용하지 않을 때 경고,
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
  plugins: ["json"],
};

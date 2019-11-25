module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": [
    "airbnb-base"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "firebase": false
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "no-plusplus": 0,
    "no-use-before-define": 0,
    "no-bitwise": 0,
    "linebreak-style": 0,
    "import/no-dynamic-require": 0,
    "import/prefer-default-export": 0,
    "global-require": 0,
    "max-classes-per-file": 0,
    "prefer-destructuring": 0,
    "import/no-cycle": 0,
    "no-param-reassign": [2, { "props": false }],
    "no-constant-condition": ["error", { "checkLoops": false }]
  }
};

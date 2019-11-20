module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
        "extends": [
            "airbnb-base",
            "prettier"
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
      "import/extensions": 0,
      "no-multi-assign": 0,
      "no-plusplus": 0,
      "no-use-before-define": 0,
      "no-bitwise": 0,
      "no-constant-condition": [
        "error",
        {
          "checkLoops": false
        }
      ],
      "prefer-destructuring": 0,
      "no-alert": 0
    }
};

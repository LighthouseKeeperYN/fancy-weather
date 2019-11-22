module.exports = {
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
      "import/extensions": 0,
      "no-multi-assign": 0,
      "no-plusplus": 0,
      "no-use-before-define": 0,
      "no-bitwise": 0,
      "linebreak-style": 0,
      "import/prefer-default-export": 0,
      "global-require": 0,
      "no-constant-condition": [
        "error",
        {
          "checkLoops": false
        }
      ],
      "prefer-destructuring": 0
    }
};

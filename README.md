# Eslint configs

Prepared **strict** and **opinionated** eslint configurations.

Contains also formatting rules and is supposed to work **without prettier**.

In general contains everything from plugins *recommended* configs and many
more optional rules enable.

Configured for eslint 9.0.0 and above using flat config.

The package is primarily **typescript** focused.

Includes many plugins build-in, like `@typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-import`, `no-only-tests`, etc.

## Installation

Just install the package. You will also need the eslint plugin itself.

```shell
npm install -D eslint @patrikvalkovic/eslint-config
```

The package currently has 3 configurations, imported from within the package
- `@patrikvalkovic/eslint-config/javascript` for JavaScript code,
- `@patrikvalkovic/eslint-config/typescript` for TypeScript,
- `@patrikvalkovic/eslint-config/react` for React.

There is also tsconfig with preconfigured strict compiler options.
- `@patrikvalkovic/eslint-config/tsconfig.base.json`

## Usage

Require the desired configuration and spread it into eslint config. 

The package generates rules and configurations, for most cases you just need 
to provide path to tsconfig file.

```javascript
const typescript = require('@patrikvalkovic/eslint-config/typescript');

module.exports = [
    ...typescript('./tsconfig.json'),
];
```

The function generates the necessary configuration. Alternatively, you may
pass your own configuration and either replace the generated configuration 
(when passed as first parameter), or merge it with the generated one (when passed as second parameter).

```javascript
const react = require('@patrikvalkovic/eslint-config/react');
const globals = require('globals')

module.exports = [
    ...react('./tsconfig.json', {
        languageOptions: {
            globals: {
                ...globals.browser,
            }
        }
    }),
];
```

### tsconfig

Package has also `tsconfig.base.json` file prepared with strict options enabled.
You can extend your tsconfig directly using the package name.

```json
{
  "extends": "@patrikvalkovic/eslint-config/tsconfig.base.json",
  "compilerOptions": {
    "rootDir": ".",
    "sourceMap": true,
    // ...
  }
}

```

### Ignore files

When you specify config blog with just `ignores` property (no rules defined),
these ignored rules will be ignored across all the rules.

```javascript
const typescript = require('@patrikvalkovic/eslint-config/javascript');

module.exports = [
    ...javascript(),
    {
        ignores: [
            'eslint.config.js',
            'build/**/*',
        ],
    },
];
```

### Disable rules

If some rule doesn't suite you, you can turn it off in separate config block.

```javascript
const typescript = require('@patrikvalkovic/eslint-config/typescript');

module.exports = [
    ...typescript('tsconfig.base.json'),
    {
        rules: {
            'no-await-in-loop': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
        },
    },
];
```

## Further development

The rules and plugins included in the package may evolve over time
if I see room for improvements, collisions with my notion, or
I find new plugins or rules.

As mentioned, this collection is opinionated, but if you would like 
to see some further rules, send an issue.

More configs may be created over time when I will find the need. 
If you would expect config for some case that is not present, don't
hesitate to send a merge request or raise an issue. 

-----

License: MIT

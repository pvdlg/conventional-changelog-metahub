# **conventional-changelog-metahub**

[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) preset built from a list of [conventional commit types](src/types.js) (similar to [conventional-commit-types](https://github.com/commitizen/conventional-commit-types)).
Also provides [release rules](https://github.com/vanduynslagerp/sr-commit-analyzer#release-rules) configuration for [sr-commit-analyzer](https://github.com/vanduynslagerp/sr-commit-analyzer).

[![npm](https://img.shields.io/npm/v/conventional-changelog-metahub.svg)](https://www.npmjs.com/package/conventional-changelog-metahub)
[![npm](https://img.shields.io/npm/dt/conventional-changelog-metahub.svg)](https://www.npmjs.com/package/conventional-changelog-metahub)
[![Greenkeeper badge](https://badges.greenkeeper.io/vanduynslagerp/conventional-changelog-metahub.svg)](https://greenkeeper.io/)
[![license](https://img.shields.io/github/license/vanduynslagerp/conventional-changelog-metahub.svg)](https://github.com/vanduynslagerp/conventional-changelog-metahub/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[![Travis](https://img.shields.io/travis/vanduynslagerp/conventional-changelog-metahub.svg)](https://travis-ci.org/vanduynslagerp/conventional-changelog-metahub)
[![Codecov](https://img.shields.io/codecov/c/github/vanduynslagerp/conventional-changelog-metahub.svg)](https://codecov.io/gh/vanduynslagerp/conventional-changelog-metahub)

Commit types originally from:
*   [Angular Git Commit Message Conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type)
*   [commitizen/cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog)
*   [conventional-commit-types](https://github.com/commitizen/conventional-commit-types)

## Install
```bash
npm install --save-dev conventional-changelog-metahub
```

## Configuration for sr-commit-analyzer

```bash
npm install --save-dev sr-commit-analyzer
```

```json
{
  "release": {
    "analyzeCommits": {
      "path": "sr-commit-analyzer",
      "preset": "metahub",
      "releaseRules": "conventional-changelog-metahub/release-rules"
    }
  }
}
```

## Configuration for sr-release-notes-generator

```bash
npm install --save-dev sr-release-notes-generator
```

```json
{
  "release": {
    "generateNotes": {
      "path": "sr-release-notes-generator",
      "preset": "metahub"
    }
  }
}
```

## Use with conventional-changelog

```bash
npm install --save-dev conventional-changelog
```

```js
import conventionalChangelog from 'conventional-changelog';

const config = require('conventional-changelog-metahub');
conventionalChangelog({config}).pipe(process.stdout);
```

## Commit types

| Commit Type | Title                    | Description                                                                                                 | Emoji  | Release                        | Include in changelog |
|:-----------:| ------------------------ | ----------------------------------------------------------------------------------------------------------- |:------:| ------------------------------ |:--------------------:|
| `feat`      | Features                 | A new feature                                                                                               | ✨     | `minor`                        | `true`               |
| `fix`       | Bug Fixes                | A bug Fix                                                                                                   | 🐛     | `patch`                        | `true`               |
| `docs`      | Documentation            | Documentation only changes                                                                                  | 📚     | `patch` if `scope` is `readme` | `true`               |
| `style`     | Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      | 💎     | -                              | `true`               |
| `refactor`  | Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                                   | 📦     | -                              | `true`               |
| `perf`      | Performance Improvements | A code change that improves performance                                                                     | 🚀     | `patch`                        | `true`               |
| `test`      | Tests                    | Adding missing tests or correcting existing tests                                                           | 🚨     | -                              | `true`               |
| `build`     | Builds                   | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         | 🛠     | `patch`                        | `true`               |
| `ci`        | Continuous Integrations  | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) | ⚙️     | -                              | `true`               |
| `chore`     | Chores                   | Other changes that don't modify src or test files                                                           | ♻️     | -                              | `true`               |
| `revert`    | Reverts                  | Reverts a previous commit                                                                                   | 🗑     | -                              | `true`               |

## Commit aliases

Aliases allow to have additionnal commit types (in a tool like [commitizen](https://github.com/commitizen/cz-cli) for example) that can be formatted to follow [AngularJS Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit).

For example the [commitizen](https://github.com/commitizen/cz-cli) CLI can present the choice `initial` and the final commit message will be 'feat: Initial commit 🎉'

| Commit Type        | Maps to | Title             | Description                     | Emoji  |
|:------------------:| ------- | ----------------- | ------------------------------  |:------:|
| `initial`          | `feat`  | Initial           | Initial commit                  | 🎉     |
| `dependencies`     | `fix`   | Dependencies      | Update dependencies             | ⬆️     |
| `peerDependencies` | `fix`   | Peer dependencies | Update peer dependencies        | ⬆️     |
| `devDependencies`  | `chore` | Dev dependencies  | Update development dependencies | ⬆️     |
| `metadata`         | `fix`   | Metadata          | Update metadata (package.json)  | 📦     |

## Related
*   [sr-commit-analyzer](https://github.com/vanduynslagerp/sr-commit-analyzer)
*   [sr-release-notes-generator](https://github.com/vanduynslagerp/sr-release-notes-generator)
*   [cz-conventional-commit](https://github.com/vanduynslagerp/cz-conventional-commit)
*   [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)

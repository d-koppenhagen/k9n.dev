/**
 * To check all configuration options, please visit
 * https://commitlint.js.org/#/reference-rules
 */
const angularTypeEnum = require('@commitlint/config-angular-type-enum');

const customTypes = [
  ...angularTypeEnum.value(),
  'chore',
  'content', // specific for adding / changing /removing blog posts comments
];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', customTypes],
  },
};

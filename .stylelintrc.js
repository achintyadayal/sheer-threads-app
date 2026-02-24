// .stylelintrc.js
module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-standard',
    'stylelint-config-tailwindcss', // optional, handles rules automatically
  ],
  rules: {
    'at-rule-no-unknown': [ true, {
      ignoreAtRules: [
        'tailwind', 'apply', 'variants', 'responsive', 'screen'
      ],
    } ],
  },
};
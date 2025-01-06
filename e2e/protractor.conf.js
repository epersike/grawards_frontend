module.exports = {
  directConnect: true,
  framework: 'jasmine',
  specs: ['src/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome'
  },
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare: function() {
    require('ts-node').register({
      project: 'tsconfig.e2e.json'
    });
  }
};
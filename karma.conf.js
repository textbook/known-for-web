// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

var reports = {
    html: 'coverage',
    lcovonly: './coverage/coverage.lcov'
};

if (process.env.CI) {
  // show inline coverage on Travis
  reports['text'] = '';
}

module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-remap-istanbul'),
      require('angular-cli/plugins/karma')
    ],
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['angular-cli']
    },
    remapIstanbulReporter: { reports: reports },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: ['progress', 'karma-remap-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};

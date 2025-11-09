const reporter = require("cucumber-html-reporter");

const options = {
  theme: "bootstrap",
  jsonFile: "reports/cucumber_report.json",
  output: "reports/cucumber_report.html",
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "QA",
    "Platform": process.platform,
    "Executed": "Local"
  }
};

reporter.generate(options);
console.log("Reporte Cucumber generado en reports/cucumber_report.html");

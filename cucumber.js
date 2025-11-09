module.exports = {
  default: {
    require: ["test/steps/**/*.ts"],
    paths: ["test/features/**/*.feature"],
    publish: false,
    format: ["progress", "json:reports/cucumber_report.json"]
  }
};

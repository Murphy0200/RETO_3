module.exports = {
  testEnvironment: "node",
  testMatch: ["**/test/api/**/*.test.js"],
  reporters: [
    "default",
    ["jest-stare", {
      "resultDir": "reports/api",
      "reportTitle": "Reporte API - DummyJSON"
    }]
  ]
};

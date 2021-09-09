'use strict';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const coveragePath = path.join(__dirname, '..', 'coverage/coverage-summary.json' )
const isCoverageFileAvailable = fs.existsSync(coveragePath);
if (isCoverageFileAvailable) {
  readFile(coveragePath)
    .then((data) => {
      const report = JSON.parse(data.toString());
      const records = ['lines', 'statements', 'functions', 'branches'];
      let totalPct = 0;
      for (const record of records) {
        totalPct += +report.total[record].pct;
      }
      process.stdout.write(`Coverage: ${totalPct / records.length}%\n`);
    })
    .catch((err) => {
      process.stdout.write(`${err}\n`);
    });
} else {
  process.stdout.write(`${coveragePath} does not exists\n`);
}

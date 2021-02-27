require('dotenv').config();
const pool = require('./pool');
const fs = require('fs');


pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
console.log('it worked');

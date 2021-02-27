const pool = require('../utils/pool');

module.exports = class Job {
  id;
  company;
  applied_date;
  response_date;
  url;
  notes;

  constructor(row) {
    this.id = row.id;
    this.company = row.company;
    this.appliedDate = row.applied_date;
    this.responseDate = row.response_date;
    this.url = row.url;
    this.notes = row.notes;
  }

  static async insert(job) {
    const { rows } = await pool.query(
      'INSERT into jobs (company, applied_date, response_date, url, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [job.company, job.appliedDate, job.responseDate, job.url, job.notes]
    );

    return new Job(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM jobs'
    );
    return rows.map(row => new Job(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM jobs
        WHERE id=$1`,
      [id]
    );
    if(!rows[0]) throw new Error (`No job posting with id=${id}.`);
    return new Job(rows[0]);
  }
};

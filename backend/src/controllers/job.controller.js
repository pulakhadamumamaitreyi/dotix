const db = require('../db/connection');
const axios = require('axios');

exports.createJob = async (req, res) => {
  try {
    const { taskName, payload, priority } = req.body;

    const [result] = await db.query(
      'INSERT INTO jobs (taskName, payload, priority, status) VALUES (?, ?, ?, "pending")',
      [taskName, JSON.stringify(payload), priority]
    );

    res.status(201).json({ jobId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobs = async (req, res) => {
  const [jobs] = await db.query('SELECT * FROM jobs ORDER BY createdAt DESC');
  res.json(jobs);
};

exports.getJobById = async (req, res) => {
  const [job] = await db.query('SELECT * FROM jobs WHERE id=?', [req.params.id]);
  res.json(job[0]);
};

exports.runJob = async (req, res) => {
  const jobId = req.params.id;

  await db.query('UPDATE jobs SET status="running" WHERE id=?', [jobId]);

  setTimeout(async () => {
    const [rows] = await db.query('SELECT * FROM jobs WHERE id=?', [jobId]);

    await db.query('UPDATE jobs SET status="completed" WHERE id=?', [jobId]);

    await axios.post(process.env.WEBHOOK_URL, {
      jobId: rows[0].id,
      taskName: rows[0].taskName,
      priority: rows[0].priority,
      payload: JSON.parse(rows[0].payload),
      completedAt: new Date()
    });

    console.log('Webhook sent');
  }, 3000);

  res.json({ message: 'Job started' });
};

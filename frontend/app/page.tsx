'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);

  const fetchJobs = async () => {
    const res = await fetch('http://localhost:5000/jobs');
    setJobs(await res.json());
  };

  const runJob = async (id:number) => {
    await fetch(`http://localhost:5000/jobs/run-job/${id}`, { method: 'POST' });
    fetchJobs();
  };

  useEffect(() => { fetchJobs(); }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Job Scheduler Dashboard</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Name</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id} className="border">
              <td>{job.id}</td>
              <td>{job.taskName}</td>
              <td>{job.priority}</td>
              <td>{job.status}</td>
              <td>
                <button
                  onClick={() => runJob(job.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Run Job
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

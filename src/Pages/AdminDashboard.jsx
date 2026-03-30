import axios from "axios";
import { useEffect, useState } from "react";

function AdminDashboard() {

  // create job state
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: ""
  });




  // job list state
  const [jobs, setJobs] = useState([]);

  // ✅ fetch all jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch {
      alert("Failed to load jobs");
    }
  };

  // load jobs when page opens
  useEffect(() => {
    fetchJobs();
  }, []);

  // ✅ create job
  const createJob = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/jobs",
        job,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Job created");

      // clear form
      setJob({
        title: "",
        description: "",
        location: ""
      });

      // refresh job list
      fetchJobs();

    } catch {
      alert("Error creating job");
    }
  };


  return (
    <div className="container mt-4">

      {/* ===== CREATE JOB ===== */}
      <div className="card p-4 shadow">
        <h3 className="mb-3">Admin Dashboard</h3>

        <input
          className="form-control my-2"
          placeholder="Title"
          value={job.title}
          onChange={(e) =>
            setJob({ ...job, title: e.target.value })
          }
        />

        <input
          className="form-control my-2"
          placeholder="Description"
          value={job.description}
          onChange={(e) =>
            setJob({ ...job, description: e.target.value })
          }
        />

        <input
          className="form-control my-2"
          placeholder="Location"
          value={job.location}
          onChange={(e) =>
            setJob({ ...job, location: e.target.value })
          }
        />

        <button
          className="btn btn-success mt-2"
          onClick={createJob}
        >
          Create Job
        </button>
      </div>

      {/* ===== JOB LIST ===== */}
      <div className="mt-5">
        <h4>All Jobs</h4>

        {jobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="card my-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <p className="card-text">{job.description}</p>
                <span className="badge bg-primary">
                  {job.location}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default AdminDashboard;
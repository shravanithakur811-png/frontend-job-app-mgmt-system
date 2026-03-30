import axios from "axios";
import { useEffect, useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs")
      .then(res => setJobs(res.data));
  }, []);

  const apply = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/applications/apply/${id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Applied successfully");
    } catch {
      alert("Already applied");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Available Jobs</h3>

      {jobs.map((job) => (
        <div key={job._id} className="card p-3 my-2">
          <h5>{job.title}</h5>
          <p>{job.description}</p>
          <p><b>Location:</b> {job.location}</p>

          <button
            className="btn btn-success"
            onClick={() => apply(job._id)}
          >
            Apply
          </button>
          
        </div>
      ))}
    </div>
  );
}

export default Jobs;
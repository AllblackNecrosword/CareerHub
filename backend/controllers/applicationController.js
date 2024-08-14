import { Job } from "../models/jobModel.js";
import { Application } from "../models/applicationModel.js";

const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    console.log(userId, jobId);

    if (!jobId) {
      return res.status(400).json({ message: "JobId missing" });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "Applicant already applied for this job" });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: "Job doesn't exist" });
    }

    // Create new job application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    return res.status(200).json({ message: "Job applied successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(400).json({ message: "No jobs found" });
    }
    return res.status(200).json({ application });
  } catch (error) {
    console.log(error);
  }
};

const getApplications = async (req, res) => {
  try {
    const jobId = req.params.id;
    const jobs = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!jobs) {
      return res.status(400).json({ message: "Job not found" });
    }
    return res.status(200).json({ jobs });
  } catch (error) {
    console.log(error);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(400).json({ message: "Not found" });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

export { applyJob, getAppliedJob, getApplications, updateStatus };

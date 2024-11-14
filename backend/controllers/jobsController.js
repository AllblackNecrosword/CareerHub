import { Job } from "../models/jobModel.js";
const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirement,
      salary,
      location,
      jobType,
      experience,
      position,
      company,
    } = req.body;

    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirement ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !company
    ) {
      return res.status(400).json({ message: "Something is missing" });
    }
    let job = await Job.create({
      title,
      description,
      requirement: requirement.split(","),
      salary,
      location,
      jobType,
      experience,
      position,
      company: company,
      createdBy: userId,
    });
    res.status(200).json({ message: "Job created successfully", job });
  } catch (error) {
    console.log(error);
  }
};

const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    // console.log(jobs);

    if (!jobs) {
      return res.status(404).json({ message: "Jobs not found" });
    }

    return res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//User job
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    // console.log("jobid", jobId);
    const job = await Job.findById(jobId).populate({ path: "applications" });
    if (!job) {
      return res.status(400).json({ message: "Job not found" });
    }
    return res.status(200).json(job);
  } catch (error) {
    console.log(error);
  }
};

//Admin get jobs

const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    // console.log("Admin Id", adminId);
    const jobs = await Job.find({ createdBy: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    // const jobs = await Job.find({ createdBy: adminId });
    // console.log("Jobs before populate:", jobs);

    // const populatedJobs = await Job.populate(jobs, { path: "company" });
    // console.log("Jobs after populate:", populatedJobs);

    if (!jobs) {
      return res.status(400).json({ message: "No jobs found" });
    }
    return res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
  }
};

export { createJob, getAllJob, getJobById, getAdminJobs };

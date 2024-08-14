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

    if (!jobs) {
      return res.status(404).json({ message: "Jobs not found" });
    }
    return res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
  }
};

//User job
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
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
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(400).json({ message: "No jobs found" });
    }
    return res.status(200).json(jobs);
  } catch (error) {
    console.log(error);
  }
};

export { createJob, getAllJob, getJobById, getAdminJobs };

import { Company } from "../models/companyModel.js";

const registerCompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).json({ message: "Company name is required" });
    }

    let company = await Company.findOne({ name: name });
    if (company) {
      return res.status(400).json({ message: "Company already exists" });
    }
    company = await Company.create({
      name: name,
      userId: req.id,
    });
    res
      .status(201)
      .json({ message: "Company registered successfully", company });
  } catch (error) {
    console.log(error);
  }
};

const getCompany = async (req, res) => {
  try {
    const userId = req.id; //loggedin user id
    const company = await Company.find({ userId });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json(company);
  } catch (error) {
    console.log(error);
  }
};

const getcompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({ message: "Company not found" });
    }
    return res.status(200).json(company);
  } catch (error) {
    console.log(error);
  }
};

const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { name, description, website, location } = req.body;
    const file = req.file;
    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(400).json({ message: "Company not found" });
    }
    return res
      .status(200)
      .json({ message: "Comapny information update successfully" });
  } catch (error) {
    console.log(error);
  }
};

export { registerCompany, getCompany, getcompanyById, updateCompany };

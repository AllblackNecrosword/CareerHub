import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "react-toastify";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const UpdateProfile = ({ isOpen, onClose }) => {
  const { user } = useSelector((store) => store.auth);
  const { loading } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: user?.profile?.resume || "", // Initialize as null for file uploads
  });

  // console.log(input);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const Updatehandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", input.username);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    // Debug: Log FormData entries
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "http://localhost:5000/api/updateprofile",
        formData,
        {
          // Remove "Content-Type" to allow axios to set it automatically
          withCredentials: true, // Retain this if needed for authentication
        }
      );
      // Check if the response status is 200
      if (response.status === 200) {
        dispatch(setUser(response.data.user)); // Update redux state
        toast.success(response.data.message);
        console.log(response.data.user);
        onClose(); // Close the dialog on success
      } else {
        // If not successful, display an error
        console.error("Update failed:", response.data);
        toast.error(response.data.message || "Failed to update profile");
      }

    } catch (error) {
      // Log errors if the request fails
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }finally{
      dispatch(setLoading(false));
    }
  };

  console.log("resume:", input.file.name || "No file uploaded");

  return (
    <div className="mt-20">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={Updatehandler} className="grid gap-4 py-4">
            {/* Username */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right">
                Name
              </label>
              <input
                id="username"
                name="username"
                value={input.username}
                className="col-span-3"
                onChange={inputHandler}
                required
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={input.email}
                className="col-span-3"
                onChange={inputHandler}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="number" className="text-right">
                Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={input.phoneNumber}
                className="col-span-3"
                onChange={inputHandler}
                required
              />
            </div>

            {/* Bio */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bio" className="text-right">
                Bio
              </label>
              <input
                id="bio"
                name="bio"
                type="text"
                value={input.bio}
                className="col-span-3"
                onChange={inputHandler}
              />
            </div>

            {/* Skills */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="skills" className="text-right">
                Skills
              </label>
              <input
                id="skills"
                name="skills"
                type="text"
                value={input.skills}
                className="col-span-3"
                onChange={inputHandler}
                placeholder="Enter skills separated by commas"
              />
            </div>

            {/* Resume */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="file" className="text-right">
                Resume
              </label>
              <input
                id="file"
                type="file"
                name="file"
                accept="application/pdf"
                className="col-span-3"
                onChange={fileHandler}
              />
            </div>

            {/* Submit Button */}
            <DialogFooter>
              {loading ? (
                <button className="bg-gray-700 w-full p-3 rounded-2xl text-white font-semibold flex justify-center items-center gap-2">
                 Please wait <Loader2 className="animate-spin" />
                </button>
              ) : (
                <Button type="submit">Save changes</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;

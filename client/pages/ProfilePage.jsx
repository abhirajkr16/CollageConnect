import { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../services/userService";

const ProfilePage = () => {
  const [form, setForm] = useState({
    bio: "",
    skills: "",
    college: "",
    profilePicture: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      const data = await getMyProfile();
      setForm({
        bio: data.bio || "",
        skills: (data.skills || []).join(", "),
        college: data.college || "",
        profilePicture: data.profilePicture || "",
      });
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Could not load profile");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      await updateMyProfile(form);
      setMessage("Profile updated successfully");
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Could not update profile");
    }
  };

  return (
    <div className="container page-center">
      <form className="glass-card form-card" onSubmit={handleSubmit}>
        <h2>Your Profile</h2>
        <textarea
          placeholder="Bio"
          value={form.bio}
          onChange={(event) => setForm({ ...form, bio: event.target.value })}
          rows={3}
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={(event) => setForm({ ...form, skills: event.target.value })}
        />
        <input
          type="text"
          placeholder="College"
          value={form.college}
          onChange={(event) => setForm({ ...form, college: event.target.value })}
        />
        <input
          type="url"
          placeholder="Profile picture URL (optional)"
          value={form.profilePicture}
          onChange={(event) => setForm({ ...form, profilePicture: event.target.value })}
        />
        {message && <p className="success-text">{message}</p>}
        {error && <p className="error-text">{error}</p>}
        <button className="gradient-btn" type="submit">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;

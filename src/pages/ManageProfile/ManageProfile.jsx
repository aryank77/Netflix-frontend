import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar/Navbar";
import backendApi from "../../services/backendApi";
import "./ManageProfile.css";

// A small set of preset Netflix-style avatar colors, since there's no
// file-upload/avatar-hosting feature in this project. ui-avatars.com
// generates a real, always-valid image from initials + a background color.
const AVATAR_OPTIONS = [
  "https://ui-avatars.com/api/?name=N&background=E50914&color=fff&size=128&bold=true",
  "https://ui-avatars.com/api/?name=N&background=221F1F&color=E50914&size=128&bold=true",
  "https://ui-avatars.com/api/?name=N&background=0F4C81&color=fff&size=128&bold=true",
  "https://ui-avatars.com/api/?name=N&background=2E7D32&color=fff&size=128&bold=true",
  "https://ui-avatars.com/api/?name=N&background=6A1B9A&color=fff&size=128&bold=true",
];

function ManageProfile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [name, setName] = useState(storedUser?.name || "");
  const [avatar, setAvatar] = useState(
    storedUser?.profilePic || AVATAR_OPTIONS[0]
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name can't be empty.");
      return;
    }

    setSaving(true);
    const updatedUser = { ...storedUser, name: name.trim(), profilePic: avatar };

    try {
      // Try syncing with the backend first.
      const res = await backendApi.put("/users/profile", {
        name: name.trim(),
        profilePic: avatar,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...storedUser, ...res.data.user })
      );
      toast.success("Profile updated!");
    } catch (err) {
      // Backend may not be redeployed with the new endpoint yet — fall
      // back to a local-only update so the UI still works for the demo,
      // and let the user know it's local-only.
      console.log("Profile sync failed, saving locally:", err);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated on this device.");
    } finally {
      setSaving(false);
      navigate("/account");
    }
  };

  return (
    <>
      <Navbar />

      <div className="manage-profile-page">
        <h1>Manage Profile</h1>

        <label className="mp-label" htmlFor="mp-name">
          Display Name
        </label>
        <input
          id="mp-name"
          type="text"
          className="mp-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p className="mp-label">Choose an Avatar</p>
        <div className="mp-avatar-grid">
          {AVATAR_OPTIONS.map((url) => (
            <button
              key={url}
              className={`mp-avatar-btn ${avatar === url ? "selected" : ""}`}
              onClick={() => setAvatar(url)}
              aria-label="Select avatar"
              aria-pressed={avatar === url}
            >
              <img src={url} alt="" />
            </button>
          ))}
        </div>

        <button className="mp-save-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </>
  );
}

export default ManageProfile;

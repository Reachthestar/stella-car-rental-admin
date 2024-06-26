import React, { useState } from "react";
import Swal from "sweetalert2";

const initialSettings = [
  { key: "siteName", label: "Site Name", value: "My Website" },
  { key: "adminEmail", label: "Admin Email", value: "admin@example.com" },
  { key: "itemsPerPage", label: "Items Per Page", value: "10" },
];

function Settings() {
  const [settings, setSettings] = useState(initialSettings);

  const handleSave = (settingKey, value) => {
    const newSettings = settings.map((setting) =>
      setting.key === settingKey ? { ...setting, value } : setting
    );
    setSettings(newSettings);

    Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Your settings have been saved successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Settings</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {settings.map((setting) => (
          <div key={setting.key} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {setting.label}
            </label>
            <div className="flex">
              <input
                type="text"
                value={setting.value}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => handleSave(setting.key, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Settings;

import React, { useState } from "react";
import PasswordRequirements from "./PasswordRequirements";

export default function PasswordInput({
  value,
  onChange,
  placeholder,
  id,
  label,
  required = false,
  showRequirements = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRequirementsList, setShowRequirementsList] = useState(false);
  const MIN_PASSWORD_LENGTH = 9;

  const handleFocus = () => {
    if (showRequirements && value.length < MIN_PASSWORD_LENGTH) {
      setShowRequirementsList(true);
    }
  };

  const handleBlur = () => {
    setShowRequirementsList(false);
  };

  const handleChange = (e) => {
    onChange(e);
    if (e.target.value.length >= MIN_PASSWORD_LENGTH) {
      setShowRequirementsList(false);
    } else if (document.activeElement === e.target) {
      setShowRequirementsList(true);
    }
  };

  const requirementsClass =
    value.length >= MIN_PASSWORD_LENGTH ? "password-requirements--hidden" : "";

  return (
    <div className="form-field">
      <div>
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        {showRequirements && showRequirementsList && (
          <div className={`password-requirements-wrapper ${requirementsClass}`}>
            <PasswordRequirements />
          </div>
        )}
      </div>
      <div className="password-input-container">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          className="form-input"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle-btn"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "Hide password" : "Show password"}
        </button>
      </div>
    </div>
  );
}

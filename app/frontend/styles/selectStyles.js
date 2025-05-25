export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "44px",
    border: `1px solid #e5e7eb`,
    borderRadius: "4px",
    fontSize: "inherit",
    fontFamily: "inherit",
    backgroundColor: "white",
    "&:hover": {
      borderColor: "#999",
    },
    ...(state.isFocused && {
      borderColor: "#007bff",
      boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
    }),
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "8px 12px",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0",
    padding: "0",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};

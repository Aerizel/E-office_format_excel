import React from "react";

const FileInput = ({ onFileSelect }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileSelect(file);
  };
  return <input type="file" onChange={handleFileChange} />;
};

export default FileInput;

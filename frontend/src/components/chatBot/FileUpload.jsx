"use client";
import React from "react";
import classes from "../../styles/FileUpload.module.css";
import { FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const FileUpload = ({ setFile, selectedImage, setSelectedImage }) => {
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    const reader = new FileReader();
    const newfile = e.target.files[0];
    if (newfile) {
      reader.onload = (e) => {
        setSelectedImage(e.target?.result);
      };
      reader.readAsDataURL(newfile);
    }
  };

  return (
    <div className={classes.file_input_wrapper}>
      <input
        type="file"
        id="file"
        name="file"
        className={classes.file_input}
        onChange={handleFileChange}
      />
      <label htmlFor="file" className={classes.fileLabel}>
        <FiUpload size={24} />
      </label>
      <div className={classes.fileImage}>
        {selectedImage && (
          <div
            className={classes.delete}
            onClick={() => {
              setSelectedImage(null);
              setFile(null);
            }}
          >
            <MdDelete size={15} />
          </div>
        )}
        {selectedImage && <img src={selectedImage} alt="file" />}
      </div>
    </div>
  );
};

export default FileUpload;

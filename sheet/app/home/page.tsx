"use client";
import React, { useState, useEffect } from "react";
import { FileUpload } from "primereact/fileupload";
import FileuploadHome from "./Fileupload";
import { ProgressBar } from "primereact/progressbar";
import { ProgressSpinner } from "primereact/progressspinner";

function Home() {
  const [value, setValue] = useState(0);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => (prevValue >= 100 ? 100 : prevValue + 5)); // Stop at 100
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      {/* <ProgressSpinner /> */}
      <FileuploadHome />
    </div>
  );
}

export default Home;

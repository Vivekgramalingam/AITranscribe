import React, { useState } from "react";
import axios from 'axios';
import { saveAs } from 'file-saver';

const VideoTosrt = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");
  const [download, setDownloadStatus] = useState<true | false>(false);
  const [srtFilename, setsrtFilename] = useState<string>("");
  const [srtFile, setsrtFile] = useState<Blob>(new Blob([], { type: 'application/octet-stream' }));
  const [videoUrl, setVideoUrl] = useState<string>(""); // State to hold video URL

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setStatus("initial");
      setFile(selectedFile);
      setVideoUrl(URL.createObjectURL(selectedFile)); // Create URL for the video preview
    }
  };

  const downloadSrtFile = () => {
    saveAs(srtFile, srtFilename + ".srt"); // Specify the filename as needed
  };

  const handleUpload = async () => {
    if (file) {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("video", file);
      formData.append("title", file.name);

      try {
        const response = await axios.post('http://127.0.0.1:5000/generate_subtitle', formData, {
          responseType: 'blob',
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const responseBlob = new Blob([response.data], { type: response.headers['content-type'] });

        setStatus("success");
        setDownloadStatus(true);
        setsrtFile(responseBlob);
        setsrtFilename(file.name);
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };

  return (
    <>
      <div className="input-group">
        <h1> Video to Srt </h1>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" accept="video/*" onChange={handleFileChange} />
      </div>

      <VideoPlayer videoUrl={videoUrl} fileType={file?.type} />

      {file && (
        <section>
          <h2>File details:</h2>
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button onClick={handleUpload} className="submit">
          Upload File
        </button>
      )}

      <Result status={status} />

      {download && (
        <button id="downloadBtn" className="download-btn" onClick={downloadSrtFile} value="download">
          Download Subtitle
        </button>
      )}
    </>
  );
};

const VideoPlayer = ({ videoUrl, fileType }: { videoUrl: string; fileType?: string }) => {
  return (
    <div className="video-container">
      <h2>Video Preview:</h2>
      <video width="400" controls>
        {videoUrl ? (
          <source src={videoUrl} type={fileType || "video/mp4"} />
        ) : (
          <p>No video selected</p>
        )}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const Result = ({ status }: { status: string }) => {
  if (status === "success") {
    return <p>✅ Subtitle generated successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ generating subtitle for the video...</p>;
  } else {
    return null;
  }
};

export default VideoTosrt;

import React, { useState } from "react";
import axios from 'axios';
import { saveAs } from 'file-saver';

const VideoToTranscript = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");
  const [download, setDownloadStatus]=useState<true | false>(false);
  const [transcriptFilename, settranscriptFilename]=useState<string>("");
  const [transcriptFile,settranscriptFile]=useState<Blob>(new Blob([], { type: 'application/octet-stream' }));
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
    }
  };
  const downloadtranscriptFile = () => {
    saveAs(transcriptFile, transcriptFilename+".txt"); // Specify the filename as needed
  };
  const handleUpload = async () => {
    if (file) {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("video", file);
      formData.append("title",file.name)

      try {
        const response = await axios.post('http://127.0.0.1:5000/generate_transcript', formData, {
          responseType: 'blob',
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // Create a new Blob object from the response data
     const responseBlob = new Blob([response.data], { type: response.headers['content-type'] });

    // Use file-saver to save the file locally
    // saveAs(responseBlob, file.name+".srt"); // Specify the filename as needed

        console.log(response);
        setStatus("success");
        setFile(null)
        setDownloadStatus(true);
        settranscriptFile(responseBlob)
        settranscriptFilename(file.name)
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };

  return (
    <>
      <div className="input-group">
      <h1> Video to Transcript </h1>
        <label htmlFor="file" >
          Upload the Video File
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
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
    {download && 
      (<button id="downloadBtn" className="download-btn" onClick={downloadtranscriptFile} value="download">Download Transcript</button>)}
    </>
  );
};

const Result = ({ status }: { status: string }) => {
  if (status === "success") {
    return <p>✅ Transcript generated successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ generating transcript for the video...</p>;
  } else {
    return null;
  }
};

// const Download = ({download}:{download: string}) =>{

//   if (download === "success"){
//     <button id="downloadBtn" onClick={downloadtranscriptFile} value="download">Download</button>
//   }
// }

export default VideoToTranscript;
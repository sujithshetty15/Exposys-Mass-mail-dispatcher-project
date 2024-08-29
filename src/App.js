import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [emails, setEmails] = useState({ valid: [], invalid: [] });
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    const chosenFile = e.target.files[0];
    setFile(chosenFile);
    setFileName(chosenFile ? chosenFile.name : ''); 
    setEmails({ valid: [], invalid: [] });
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setEmails(response.data);
      setUploadStatus('Upload successful!');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file.');
    }
  };

  return (
    <div className="container">
      <h1>Mass-Mail Dispatcher</h1>
      <div className="file-upload-wrapper">
        <div className="file-upload">
          <label htmlFor="file-upload" className="custom-file-upload">
            Choose File
          </label>
          <input id="file-upload" type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} className="upload-button">Upload CSV</button>
        </div>
        {fileName && <p className="file-name">Selected file: {fileName}</p>}
        {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      </div>
  
      <div className="email-list">
        <div className="email-section">
          <h2>Valid Emails ({emails.valid.length})</h2>
          <ul className="email-ul">
            {emails.valid.map((email, index) => (
              <li key={index} className="email-li">{email}</li>
            ))}
          </ul>
        </div>
        
        <div className="email-section">
          <h2>Invalid Emails ({emails.invalid.length})</h2>
          <ul className="email-ul">
            {emails.invalid.map((email, index) => (
              <li key={index} className="email-li">{email}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
}

export default App;

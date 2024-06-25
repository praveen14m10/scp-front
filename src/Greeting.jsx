// src/Greeting.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Greeting = () => {
  const location = useLocation();
  const { username } = location.state || { username: 'Guest' };
  const [fileUploads, setFileUploads] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/fileuploads/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setFileUploads(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadMessage('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('http://127.0.0.1:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setUploadMessage('File uploaded successfully');

      // Fetch updated data after upload
      const response = await axios.get('http://127.0.0.1:8000/fileuploads/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setFileUploads(response.data);
    } catch (error) {
      setUploadMessage('Error uploading file');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Hello, {username}!</h1>

      <form onSubmit={handleFileUpload} className="mb-4">
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <button type="submit" className="px-4 py-2 bg-teal-400 text-white rounded">Upload File</button>
      </form>
      {uploadMessage && <p>{uploadMessage}</p>}

      <table className="table-auto border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">Name</th>
            <th className="border border-gray-500 px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {fileUploads.map((upload) => (
            <tr key={upload.id}>
              <td className="border border-gray-500 px-4 py-2">{upload.first_name} {upload.last_name}</td>
              <td className="border border-gray-500 px-4 py-2">{upload.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Greeting;

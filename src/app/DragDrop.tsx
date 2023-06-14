'use client'

import React, { useEffect, ChangeEvent, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useRouter } from 'next/navigation';

const fileTypes = [
  'aac',
  'flac',
  'mp3',
  'mp4',
  'mpeg',
  'ogg',
  'wav',
  'webm',
];

const DragDrop: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    if (selectedFile) {
      handleUpload();
      router.push('/visual');
    }
  }, [selectedFile]);

  const handleUpload = async () => {
    console.log("handleUpload function is called");
    console.log(selectedFile);
    
    if(selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
      
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Server response:', data);
        } 
        else {
          throw new Error('File upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleFileChange = (file: File) => {
    if (file) {
      setSelectedFile(file);
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div>
      <FileUploader 
        handleChange={handleFileChange} 
        name="file" 
        types={fileTypes} 
      />
    </div>
  );
};

export default DragDrop;

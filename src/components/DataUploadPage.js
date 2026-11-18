import React from 'react';
import UploadForm from './UploadForm';

export default function DataUploadPage({ onDataUploaded }) {
  return (
    <div className="data-upload-page">
      {/* <h2>Upload Campaign Data</h2> */}
      {/* ✅ UploadForm ko function bheja */}
      <UploadForm onDataUploaded={onDataUploaded} />
    </div>
  );
}


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../CareerAssessmentTool.jsx'; 
    
// NOTE: In a real project, we would also import a main CSS file here.
// Since the Tailwind styles are applied using the included CSS link/script in the original file, 
// we don't need a separate CSS import for this setup.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App.jsx'
import Modal from 'react-modal';
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // <-- Required for collapse/toggle



Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

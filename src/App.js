import React, { useState } from 'react';
import './App.css';

function App() {
  // State for form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });
  
  // State for tracking interactions
  const [clickCount, setClickCount] = useState(0);
  const [submittedData, setSubmittedData] = useState(null);
  const [livePreview, setLivePreview] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Live preview for message field
    if (name === 'message') {
      setLivePreview(value);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Store submitted data
    setSubmittedData({ ...formData, timestamp: new Date().toLocaleString() });
    
    // Show alert
    alert(`Form submitted successfully!\nUsername: ${formData.username}\nEmail: ${formData.email}`);
    
    // Optional: Reset form after submission
    // setFormData({ username: '', email: '', message: '' });
    // setLivePreview('');
  };

  // Handle button clicks
  const handleClick = (buttonName) => {
    setClickCount(prevCount => prevCount + 1);
    console.log(`${buttonName} clicked! Total clicks: ${clickCount + 1}`);
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({ username: '', email: '', message: '' });
    setLivePreview('');
    setSubmittedData(null);
    alert('Form has been reset!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Event Handling Demo</h1>
        <p>Demonstrating Click, Change, and Submit Events</p>
      </header>

      <main className="App-main">
        {/* Button Click Events Section */}
        <section className="section">
          <h2>🖱️ Click Events</h2>
          <div className="button-group">
            <button 
              onClick={() => handleClick('Primary Button')}
              className="btn btn-primary"
            >
              Click Me!
            </button>
            <button 
              onClick={() => handleClick('Secondary Button')}
              className="btn btn-secondary"
            >
              Another Button
            </button>
            <button 
              onClick={handleReset}
              className="btn btn-danger"
            >
              Reset Form
            </button>
          </div>
          <p className="click-counter">
            Total clicks: <strong>{clickCount}</strong>
          </p>
        </section>

        {/* Change Events Section - Form Inputs */}
        <section className="section">
          <h2>✏️ Change Events (Form Inputs)</h2>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
              {formData.username && (
                <span className="live-feedback">
                  Typing: {formData.username}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              {formData.email && (
                <span className="live-feedback">
                  Typing: {formData.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                rows="4"
              />
              {livePreview && (
                <div className="live-preview">
                  <strong>Live Preview:</strong> {livePreview}
                </div>
              )}
            </div>

            {/* Submit Event Section */}
            <div className="form-actions">
              <button type="submit" className="btn btn-success">
                📤 Submit Form (Submit Event)
              </button>
              <button 
                type="button" 
                onClick={handleReset}
                className="btn btn-warning"
              >
                🗑️ Clear Form
              </button>
            </div>
          </form>
        </section>

        {/* Submitted Data Display */}
        {submittedData && (
          <section className="section submitted-data">
            <h2>✅ Submitted Data (After Submit Event)</h2>
            <div className="data-card">
              <p><strong>Username:</strong> {submittedData.username}</p>
              <p><strong>Email:</strong> {submittedData.email}</p>
              <p><strong>Message:</strong> {submittedData.message}</p>
              <p><strong>Submitted at:</strong> {submittedData.timestamp}</p>
            </div>
          </section>
        )}

        {/* Event Log Section */}
        <section className="section event-log">
          <h2>📋 Event Log (Console Output)</h2>
          <p className="console-note">
            Check the browser console to see click events being logged!
          </p>
          <div className="log-example">
            <code>
              // Console output example:<br/>
              → "Primary Button clicked! Total clicks: 1"<br/>
              → "Secondary Button clicked! Total clicks: 2"<br/>
              → "Form submitted successfully!"
            </code>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
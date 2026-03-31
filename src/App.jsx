import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const EventDemoApp = () => {
  // State for various event demonstrations
  const [mouseEventLog, setMouseEventLog] = useState([]);
  const [keyEventLog, setKeyEventLog] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusStatus, setFocusStatus] = useState({});
  const [touchLog, setTouchLog] = useState([]);
  const [clipboardData, setClipboardData] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Interactive response states
  const [clickCount, setClickCount] = useState(0);
  const [lastClickType, setLastClickType] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hoverEffect, setHoverEffect] = useState('');
  const [wheelDirection, setWheelDirection] = useState('');
  const [wheelValue, setWheelValue] = useState(0);
  const [keyPressed, setKeyPressed] = useState('');
  const [lastKey, setLastKey] = useState('');
  const [rippleEffect, setRippleEffect] = useState({ show: false, x: 0, y: 0 });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const scrollDivRef = useRef(null);
  const touchAreaRef = useRef(null);
  const mouseAreaRef = useRef(null);

  // Helper function to add logs and show notifications
  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 2000);
  };

  const addLog = (type, eventName, details = '') => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${type}: ${eventName} ${details}`;
    
    switch(type) {
      case 'Mouse':
        setMouseEventLog(prev => [logEntry, ...prev].slice(0, 10));
        break;
      case 'Keyboard':
        setKeyEventLog(prev => [logEntry, ...prev].slice(0, 10));
        break;
      case 'Touch':
        setTouchLog(prev => [logEntry, ...prev].slice(0, 10));
        break;
      default:
        break;
    }
  };

  // Mouse Events with Visual Feedback
  const handleClick = (e) => {
    setClickCount(prev => prev + 1);
    setLastClickType('Single Click');
    addLog('Mouse', 'onClick', `- Target: ${e.target.tagName}`);
    showNotification('✓ Single click detected!', 'success');
    
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRippleEffect({ show: true, x, y });
    setTimeout(() => setRippleEffect({ show: false, x: 0, y: 0 }), 500);
  };
  
  const handleContextMenu = (e) => {
    e.preventDefault();
    setLastClickType('Right Click');
    addLog('Mouse', 'onContextMenu', '- Right click detected!');
    showNotification('⚠️ Right click detected! (Context menu prevented)', 'warning');
    return false;
  };
  
  const handleDoubleClick = (e) => {
    setClickCount(prev => prev + 2);
    setLastClickType('Double Click');
    addLog('Mouse', 'onDoubleClick', '- Double click!');
    showNotification('✨ Double click detected! ✨', 'success');
    
    // Flash effect
    e.currentTarget.style.transform = 'scale(0.98)';
    setTimeout(() => {
      if (e.currentTarget) e.currentTarget.style.transform = '';
    }, 150);
  };
  
  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    addLog('Mouse', 'onMouseDown', `- Button: ${e.button}`);
    showNotification(`⬇️ Mouse button ${e.button === 0 ? 'left' : e.button === 2 ? 'right' : 'middle'} pressed`, 'info');
  };
  
  const handleMouseUp = (e) => {
    setIsMouseDown(false);
    addLog('Mouse', 'onMouseUp', `- Button released: ${e.button}`);
    showNotification(`⬆️ Mouse button released`, 'info');
  };
  
  const handleMouseEnter = (e) => {
    setHoverEffect('enter');
    addLog('Mouse', 'onMouseEnter', `- Entered: ${e.target.tagName}`);
    showNotification('🐭 Mouse entered the area', 'info');
  };
  
  const handleMouseLeave = (e) => {
    setHoverEffect('leave');
    setIsMouseDown(false);
    addLog('Mouse', 'onMouseLeave', `- Left: ${e.target.tagName}`);
    showNotification('🚪 Mouse left the area', 'info');
    setTimeout(() => setHoverEffect(''), 300);
  };
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x: Math.round(x), y: Math.round(y) });
    
    if (Math.random() > 0.95) {
      addLog('Mouse', 'onMouseMove', `- Position: (${Math.round(x)}%, ${Math.round(y)}%)`);
    }
  };
  
  const handleMouseOut = (e) => {
    addLog('Mouse', 'onMouseOut', `- Out of: ${e.target.tagName}`);
  };
  
  const handleMouseOver = (e) => {
    addLog('Mouse', 'onMouseOver', `- Over: ${e.target.tagName}`);
  };
  
  const handleWheel = (e) => {
    const direction = e.deltaY > 0 ? 'down ⬇️' : 'up ⬆️';
    setWheelDirection(direction);
    setWheelValue(prev => prev + (e.deltaY > 0 ? 1 : -1));
    addLog('Mouse', 'onWheel', `- Delta: ${e.deltaY > 0 ? 'down' : 'up'}`);
    showNotification(`🖱️ Scrolling ${direction}`, 'info');
    
    // Visual feedback on scroll
    const area = e.currentTarget;
    area.style.transform = `scale(${e.deltaY > 0 ? 0.99 : 1.01})`;
    setTimeout(() => {
      if (area) area.style.transform = '';
    }, 100);
  };

  // Keyboard Events with Visual Feedback
  const handleKeyDown = (e) => {
    setKeyPressed(e.key);
    setLastKey(`Pressed: ${e.key}`);
    addLog('Keyboard', 'onKeyDown', `- Key: ${e.key} (${e.code})`);
    showNotification(`⌨️ Key Down: ${e.key}`, 'info');
    
    // Visual feedback
    e.target.style.transform = 'scale(0.99)';
    setTimeout(() => {
      if (e.target) e.target.style.transform = '';
    }, 100);
  };
  
  const handleKeyPress = (e) => {
    setLastKey(`Pressed & Released: ${e.key}`);
    addLog('Keyboard', 'onKeyPress', `- Key pressed: ${e.key}`);
  };
  
  const handleKeyUp = (e) => {
    setKeyPressed('');
    setLastKey(`Released: ${e.key}`);
    addLog('Keyboard', 'onKeyUp', `- Key released: ${e.key}`);
    showNotification(`⌨️ Key Up: ${e.key}`, 'info');
  };

  // Form Events
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    addLog('Form', 'onChange', `- ${name}: ${value}`);
    showNotification(`📝 ${name} changed: ${value.substring(0, 30)}`, 'info');
  };
  
  const handleInput = (e) => {
    addLog('Form', 'onInput', `- ${e.target.name}: ${e.target.value}`);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addLog('Form', 'onSubmit', '- Form submitted!');
    showNotification(`✅ Form submitted successfully!`, 'success');
    alert(`Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`);
  };
  
  const handleReset = (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '', message: '' });
    addLog('Form', 'onReset', '- Form reset!');
    showNotification(`🔄 Form has been reset`, 'warning');
  };
  
  const handleSelect = (e) => {
    const selected = e.target.value.substring(e.target.selectionStart, e.target.selectionEnd);
    addLog('Form', 'onSelect', `- Selected: "${selected}"`);
    if (selected) {
      showNotification(`📌 Selected text: "${selected.substring(0, 20)}"`, 'info');
    }
  };

  // Focus Events
  const handleFocus = (e) => {
    setFocusStatus(prev => ({ ...prev, [e.target.name]: true }));
    addLog('Focus', 'onFocus', `- Element: ${e.target.name || e.target.tagName}`);
    showNotification(`🎯 Focused on ${e.target.name || e.target.tagName}`, 'success');
  };
  
  const handleBlur = (e) => {
    setFocusStatus(prev => ({ ...prev, [e.target.name]: false }));
    addLog('Focus', 'onBlur', `- Element: ${e.target.name || e.target.tagName}`);
    showNotification(`👋 Lost focus from ${e.target.name || e.target.tagName}`, 'info');
  };

  // Touch Events
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    addLog('Touch', 'onTouchStart', `- Position: (${x}, ${y})`);
    showNotification(`👆 Touch started at (${Math.round(x)}, ${Math.round(y)})`, 'info');
    
    // Visual feedback
    e.currentTarget.style.transform = 'scale(0.98)';
    setTimeout(() => {
      if (e.currentTarget) e.currentTarget.style.transform = '';
    }, 150);
  };
  
  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    if (Math.random() > 0.8) {
      addLog('Touch', 'onTouchMove', `- Moved to: (${x}, ${y})`);
    }
    
    // Update position display
    if (touchAreaRef.current) {
      touchAreaRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3), transparent)`;
    }
  };
  
  const handleTouchEnd = (e) => {
    e.preventDefault();
    addLog('Touch', 'onTouchEnd', '- Touch ended');
    showNotification(`✅ Touch ended`, 'success');
    if (touchAreaRef.current) {
      touchAreaRef.current.style.background = '';
    }
  };
  
  const handleTouchCancel = (e) => {
    e.preventDefault();
    addLog('Touch', 'onTouchCancel', '- Touch cancelled');
    showNotification(`⚠️ Touch cancelled`, 'warning');
  };

  // Clipboard Events
  const handleCopy = (e) => {
    addLog('Clipboard', 'onCopy', '- Content copied');
    showNotification(`📋 Content copied to clipboard!`, 'success');
  };
  
  const handleCut = (e) => {
    addLog('Clipboard', 'onCut', '- Content cut');
    showNotification(`✂️ Content cut to clipboard!`, 'success');
  };
  
  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    addLog('Clipboard', 'onPaste', `- Pasted: "${pastedText.substring(0, 50)}"`);
    showNotification(`📋 Pasted: "${pastedText.substring(0, 30)}"`, 'info');
  };

  // Scroll Event
  const handleScroll = (e) => {
    const position = e.target.scrollTop;
    setScrollPosition(position);
    if (Math.random() > 0.95) {
      addLog('UI', 'onScroll', `- Position: ${position}px`);
    }
  };

  return (
    <div className="event-demo-app">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`notification-toast ${notification.type}`}>
          {notification.message}
        </div>
      )}
      
      <h1>🎮 React Event Handlers Demo</h1>
      <p className="subtitle">Interactive demo with visual feedback for every event!</p>

      <div className="demo-container">
        {/* Mouse Events Section */}
        <section className="event-section">
          <h2>🖱️ Mouse Events - Try All Interactions!</h2>
          <div 
            ref={mouseAreaRef}
            className={`mouse-demo-area ${hoverEffect === 'enter' ? 'hover-effect' : ''} ${isMouseDown ? 'mouse-down' : ''}`}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onMouseOut={handleMouseOut}
            onMouseOver={handleMouseOver}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
          >
            {/* Ripple effect */}
            {rippleEffect.show && (
              <div 
                className="ripple"
                style={{ left: rippleEffect.x, top: rippleEffect.y }}
              />
            )}
            
            <div className="mouse-feedback">
              <div className="feedback-stats">
                <div className="stat">
                  <span className="stat-label">Click Count:</span>
                  <span className="stat-value">{clickCount}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Last Click:</span>
                  <span className="stat-value">{lastClickType || '—'}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Mouse Position:</span>
                  <span className="stat-value">
                    {mousePosition.x > 0 ? `${mousePosition.x}%, ${mousePosition.y}%` : '—'}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Scroll Wheel:</span>
                  <span className="stat-value">{wheelDirection || '—'}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Mouse Status:</span>
                  <span className={`status-badge ${isMouseDown ? 'active' : ''}`}>
                    {isMouseDown ? '⬇️ PRESSED' : '⬆️ RELEASED'}
                  </span>
                </div>
              </div>
              
              <div className="interaction-list">
                <p>✨ Try these interactions:</p>
                <ul>
                  <li>✅ <strong>Click</strong> - Watch the ripple effect!</li>
                  <li>✅ <strong>Right Click</strong> - See warning message</li>
                  <li>✅ <strong>Double Click</strong> - Flash effect!</li>
                  <li>✅ <strong>Hold mouse down</strong> - Button changes color</li>
                  <li>✅ <strong>Move mouse</strong> - See position tracking</li>
                  <li>✅ <strong>Scroll wheel</strong> - Area scales!</li>
                  <li>✅ <strong>Hover</strong> - Glow effect activates</li>
                </ul>
              </div>
              
              <div className="live-indicator">
                <div className={`led ${hoverEffect === 'enter' ? 'on' : ''}`}></div>
                <span>{hoverEffect === 'enter' ? 'Mouse is INSIDE the area!' : 'Mouse is OUTSIDE the area'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Keyboard Events Section */}
        <section className="event-section">
          <h2>⌨️ Keyboard Events - Type Here!</h2>
          <input
            type="text"
            placeholder="Type anything to see keyboard events in action..."
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyPress}
            onKeyUp={handleKeyUp}
            className="keyboard-input"
          />
          <div className="keyboard-feedback">
            <div className="key-display">
              <div className="key-label">Last Key Event:</div>
              <div className="key-value">{lastKey || 'Press any key'}</div>
            </div>
            {keyPressed && (
              <div className="key-animation">
                <div className="key-big">{keyPressed}</div>
              </div>
            )}
          </div>
          <p className="hint">💡 Focus on the input above and press any key - see live feedback!</p>
        </section>

        {/* Form Events Section */}
        <section className="event-section">
          <h2>📝 Form Events - Fill This Form!</h2>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onSelect={handleSelect}
                placeholder="Enter your name"
              />
              {focusStatus.name && <span className="focus-indicator">✨ Focused - Type something!</span>}
            </div>
            
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onSelect={handleSelect}
                placeholder="Enter your email"
              />
              {focusStatus.email && <span className="focus-indicator">✨ Focused - Type something!</span>}
            </div>
            
            <div className="form-group">
              <label>Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onSelect={handleSelect}
                rows="3"
                placeholder="Type your message here..."
              />
              {focusStatus.message && <span className="focus-indicator">✨ Focused - Select text to trigger onSelect!</span>}
            </div>
            
            <div className="form-buttons">
              <button type="submit">🚀 Submit Form</button>
              <button type="reset">🔄 Reset Form</button>
            </div>
          </form>
          <div className="form-preview">
            <strong>Live Preview:</strong> {formData.name || '—'} | {formData.email || '—'} | {formData.message.substring(0, 30) || '—'}
          </div>
        </section>

        {/* Touch Events Section */}
        <section className="event-section touch-section">
          <h2>📱 Touch Events - Touch Here (Mobile/Tablet)</h2>
          <div 
            ref={touchAreaRef}
            className="touch-demo-area"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
          >
            <div className="touch-icon">👆👇🖐️</div>
            <p>Touch, drag, and release here!</p>
            <p className="touch-hint">✨ Touch events will create visual effects ✨</p>
            <div className="touch-instruction">
              💡 On mobile: Try single tap, long press, and drag
            </div>
          </div>
        </section>

        {/* Clipboard Events Section */}
        <section className="event-section">
          <h2>📋 Clipboard Events - Copy/Cut/Paste Here!</h2>
          <textarea
            value={clipboardData}
            onChange={(e) => setClipboardData(e.target.value)}
            onCopy={handleCopy}
            onCut={handleCut}
            onPaste={handlePaste}
            placeholder="Select text and use Ctrl+C (Copy), Ctrl+X (Cut), or Ctrl+V (Paste) here..."
            rows="4"
            className="clipboard-area"
          />
          <div className="clipboard-hint">
            💡 Try: Select text → Copy/Cut → Paste in another area!
          </div>
        </section>

        {/* Scroll Events Section */}
        <section className="event-section">
          <h2>📜 Scroll Event - Scroll This Area!</h2>
          <div 
            ref={scrollDivRef}
            className="scroll-demo-area"
            onScroll={handleScroll}
          >
            <div className="scroll-content">
              <div className="scroll-header">
                <span>📊 Scroll Position: {scrollPosition}px</span>
                <div className="scroll-bar-indicator" style={{ width: `${(scrollPosition / 500) * 100}%` }}></div>
              </div>
              <p>👇 Scroll down to see the onScroll event in action! 👇</p>
              {[...Array(25)].map((_, i) => (
                <p key={i} className="scroll-line">
                  {i === 0 ? '✨ Start scrolling! ✨' : `Line ${i + 1}: Scrolling content line`}
                  {i === 24 && '🎉 You reached the bottom! 🎉'}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Event Logs */}
        <section className="event-section logs-section">
          <h2>📊 Live Event Logs</h2>
          
          <div className="logs-container">
            <div className="log-column">
              <h3>🖱️ Mouse & Wheel Events</h3>
              <div className="log-area">
                {mouseEventLog.map((log, index) => (
                  <div key={index} className="log-entry">{log}</div>
                ))}
                {mouseEventLog.length === 0 && <div className="log-empty">No mouse events yet - interact above!</div>}
              </div>
            </div>
            
            <div className="log-column">
              <h3>⌨️ Keyboard Events</h3>
              <div className="log-area">
                {keyEventLog.map((log, index) => (
                  <div key={index} className="log-entry">{log}</div>
                ))}
                {keyEventLog.length === 0 && <div className="log-empty">No keyboard events yet - type in the input!</div>}
              </div>
            </div>
            
            <div className="log-column">
              <h3>📱 Touch Events</h3>
              <div className="log-area">
                {touchLog.map((log, index) => (
                  <div key={index} className="log-entry">{log}</div>
                ))}
                {touchLog.length === 0 && <div className="log-empty">No touch events yet - touch on mobile!</div>}
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => {
              setMouseEventLog([]);
              setKeyEventLog([]);
              setTouchLog([]);
              setClickCount(0);
              setWheelValue(0);
              showNotification('✨ All logs cleared!', 'success');
            }}
            className="clear-logs-btn"
          >
            🧹 Clear All Logs
          </button>
        </section>
      </div>

      <div className="event-summary">
        <h3>🎯 All Events Demonstrated with Live Feedback:</h3>
        <div className="summary-grid">
          <div>✓ 10 Mouse Events - with ripple & hover effects</div>
          <div>✓ 3 Keyboard Events - with key display</div>
          <div>✓ 5 Form Events - with live preview</div>
          <div>✓ 2 Focus Events - with indicators</div>
          <div>✓ 4 Touch Events - with touch tracking</div>
          <div>✓ Wheel Event - with direction detection</div>
          <div>✓ 3 Clipboard Events - with notifications</div>
          <div>✓ Scroll Event - with position tracking</div>
        </div>
      </div>
    </div>
  );
};

export default EventDemoApp;
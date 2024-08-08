import React, { useState } from 'react';

function App() {
  const [isActive, setIsActive] = useState(false);

  const toggleMode = () => {
    setIsActive(!isActive);
    chrome.runtime.sendMessage({ mode: !isActive ? 'activate' : 'deactivate' });
  };

  return (
    <div>
      <h1>Toggle Mode</h1>
      <button onClick={toggleMode}>
        {isActive ? 'Deactivate Mode' : 'Activate Mode'}
      </button>
    </div>
  );
}

export default App;

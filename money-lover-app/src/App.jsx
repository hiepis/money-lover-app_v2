import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Money Lover</h1>
        <p>Personal Expense Tracker</p>
      </header>
      
      <main>
        <div className="welcome-card">
          <h2>Foundation Setup Complete!</h2>
          <p>React 19 + Vite 7 development environment ready</p>
          
          <div className="test-section">
            <h3>HMR Test</h3>
            <button onClick={() => setCount((count) => count + 1)}>
              Count: {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test Hot Module Replacement
            </p>
          </div>
          
          <div className="next-steps">
            <h3>Next Steps</h3>
            <ul>
              <li>✅ Vite React project created</li>
              <li>✅ Development server tested</li>
              <li>✅ Build process verified</li>
              <li>🔄 Ready for additional dependencies</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

import { useState } from 'react'
import './App.css'

function App() {
  const [spinner, setSpinner] = useState(false);
  const [sumDisplay, setSumDisplay] = useState(false);
  const exOutput = ["test1", "test2", "test3"]

  return (
    <>
      <h1>T.L.D.R.T.</h1>
      <div className="card">
        <button onClick={() => {setSumDisplay(!sumDisplay); setSpinner(!spinner);}}>
          Summarize This Page Teto!
        </button>
        {
          sumDisplay && (<ul>
            {exOutput.map(output => (
              <li>{output}</li>
            ))}
          </ul>)
        }

      </div>
    </>
  )
}

export default App

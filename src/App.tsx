import { useState } from 'react'
import './App.css'

function App() {
  const [spinner, setSpinner] = useState(false);
  const [sumDisplay, setSumDisplay] = useState(false);
  const exOutput = ["test1", "test2", "test3"]

  const fetchSummary = async () => {
    console.log("Hi ME");
    //grab url of page
    setSpinner(!spinner);
    const res =  await fetch('/api/test',{
      method: 'GET'
    });

    const filtered = await res.json();
    setSpinner(!spinner);
    setSumDisplay(!sumDisplay);
    console.log(filtered);
  }

  console.log("HI");
  return (
    <>
      <h1>T.L.D.R.T.</h1>
      <div className="card">
        <button onClick={() => fetchSummary()}>
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

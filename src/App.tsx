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
    //const tab = await chrome.tabs.query({active: true, lastFocusedWindow: true})
    const tab = "https://gamerant.com/omori-best-ending-guide/"
    //we might need a dotenv here
    //const fetchURL = 'https://tl-drt.netlify.app/.netlify/functions/summarize'
    const fetchURL = '.netlify/functions/summarize'
    const res =  await fetch(fetchURL,{
      method: 'POST',
      body: JSON.stringify({
        url:tab
      })
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

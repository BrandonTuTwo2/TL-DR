import { useState } from 'react'
import './App.css'

function App() {
  const [spinner, setSpinner] = useState(false);
  const [sumDisplay, setSumDisplay] = useState(false);
  const [bulletPoints, setPoints] = useState([])

  const fetchSummary = async () => {
    console.log("Hi ME");
    const header = new Headers(); // I love cors
    header.append('access-control-allow-credentials', 'true');
    header.append('Content-Type', 'application/json; charset=utf-8')

    //grab url of page
    setSpinner(!spinner);
    //const tab = await chrome.tabs.query({active: true, lastFocusedWindow: true})
    const tab = "https://gamerant.com/omori-best-ending-guide/"
    //we might need a dotenv here
    //const fetchURL = 'https://tl-drt.netlify.app/.netlify/functions/summarize'
    //const fetchURL = 'http://localhost:8888/.netlify/functions/summarize'
    const fetchURL = 'http://localhost:3000/summarize' //r
    const res = await fetch(fetchURL, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({
        url: tab
      })
    });

    const filtered = await res.json();
    let points = filtered.body.split("*")

    // eslint-disable-next-line no-useless-escape
    points = points.map((point: string) => point.replace(/[\t\n+]/g, '').trim());
    setPoints(points)
    setSpinner(!spinner);
    setSumDisplay(!sumDisplay);
    console.log("HI ME");
    console.log(filtered);
    console.log(points);
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
            {bulletPoints.map((output: string) => (
              <li>{output}</li>
            ))}
          </ul>)
        }

      </div>
    </>
  )
}

export default App

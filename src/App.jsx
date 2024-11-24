
import './styles/App.css'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import { useState, useEffect } from 'react'
import { fetchData } from './util/persistence'

function App() {

  const [persons, setPersons] = useState([])

  const APIURL = "http://localhost:3000/api"

  function getPersons(callback) {
    // Fetch data
    fetchData(APIURL, callback)

  }

  useEffect(() => {
   // hente alle persons med getPersons
   getPersons((data) => setPersons(data))

  }, []);

  return (
    <div>
      <h1>Person DB</h1>
      <p>NU skal der kodes!! xD</p>
      <PersonList persons={persons} />
      <PersonForm />
    </div>
  )
}

export default App

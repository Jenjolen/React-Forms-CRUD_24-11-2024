
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

  function deletePersonbyId (personId) { // vi smider denne funktion med som prop til PersonList (dvs. vi bruger lifting state - da vi har state i App.jsx men at vi bruger den som prop i vores andre components), men funktionen bliver faktisk udført her i App.jsx (vi bruger dette som callback funktion - aka vi sender funktionen med som argument, men den bliver udført i App.jsx - parent component), 
    // da vi således kan opdatere persons state i App.jsx også - fordi vi har persons state og setPersons i App.jsx
  
  // Fjern via API - JSON Server
  fetchData(`${APIURL}/${personId}`, () => {}, "DELETE") // vi sender DELETE request til API, og vi sender ingen callback funktion med, da vi ikke skal bruge data fra API, vi skal bare slette personen fra API
  // Fjern fra Persons array via setPersons
  setPersons([... persons.filter(p => p.id != personId)]) // vi opdaterer persons state ved at filtrere alle persons fra persons state, som ikke har det slettede person.id, og så opdaterer vi persons state med dette nye array uden den slettede person

  
  
  }

  useEffect(() => {
   // hente alle persons med getPersons
   getPersons((data) => setPersons(data))

  }, []);

  return (
    <div>
      <h1>Person DB</h1>
      <p>NU skal der kodes!! xD</p>
      <PersonList persons={persons} deletePersonbyId={deletePersonbyId} />
      <PersonForm />
    </div>
  )
}

export default App

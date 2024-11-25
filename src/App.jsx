
import './styles/App.css'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import { useState, useEffect } from 'react'
import { fetchData } from './util/persistence'

const blankPerson = {id: "", age: "", name: "", email: "", gender: ""
}



function App() {

  const [persons, setPersons] = useState([])
  const [personToEdit, setPersonToEdit] = useState(blankPerson)

  const APIURL = "http://localhost:3000/api"

  function editPerson(person) {
  setPersonToEdit(person)
  }

  function mutatePerson(person) {
    if (person.id != "") {
      // PUT
     updatePerson(person)
    } else {
      // POST
      createPerson(person)
    }
  }

  function updatePerson(person) {
    console.log("update")
    fetchData(`${APIURL}/${person.id}`, 
      setPersons(persons.map(p => p.id == person.id ? {...person} : p)), // dette er vores callback funktion, som vi sender med til fetchData, og som vi bruger til at opdatere persons state i App.jsx
      // dvs. hvis person.id matcher en persons (p's) id, så opdaterer vi personen i persons state med den nye person, ellers beholder vi personen som den er
     'PUT', person); // vi henter vores persons state fra API, og sender en opdateret person med som argument (via PUT request), og opdaterer persons state med dette nye array, som inkluderer den opdaterede person
  
  }

  function createPerson(person) {
    console.log('create');
    const { id, ...personWithoutId } = person; // Exclude id field for new persons
    fetchData(
      APIURL,
      (person) => setPersons([...persons, person]), // dette er vores callback funktion, som vi sender med til fetchData, og som vi bruger til at opdatere persons state i App.jsx
      'POST',
      personWithoutId // vi sender en ny person med som argument (via POST request), og opdaterer persons state med dette nye array, som inkluderer den nye person
    );
    }

  function getPersons(callback) {
    // Fetch data
    fetchData(APIURL, callback)

  }

  function deletePersonbyId (personId) { // vi smider denne funktion med som prop til PersonList (dvs. vi bruger lifting state - da vi har state i App.jsx men at vi bruger den som prop i vores andre components), men funktionen bliver faktisk udført her i App.jsx (vi bruger dette som callback funktion - aka vi sender funktionen med som argument, men den bliver udført i App.jsx - parent component), 
    // da vi således kan opdatere persons state i App.jsx også - fordi vi har persons state og setPersons i App.jsx
  
  // Fjern via API - JSON Server
  fetchData(`${APIURL}/${personId}`, () => {}, 'DELETE') // vi sender DELETE request til API, og vi sender ingen callback funktion med, da vi ikke skal bruge data fra API, vi skal bare slette personen fra API
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
      <PersonForm blankPerson={blankPerson} personToEdit={personToEdit} mutatePerson={mutatePerson} />
      <PersonList persons={persons} deletePersonbyId={deletePersonbyId} editPerson={editPerson} />
      
    </div>
  )
}

export default App

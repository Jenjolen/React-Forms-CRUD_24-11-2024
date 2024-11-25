import { useState, useEffect } from 'react'



function PersonForm({blankPerson, personToEdit, updatePerson, mutatePerson}) { 

const [person, setPerson] = useState({...personToEdit})

function handleChange(event) { // denne funktion håndterer ændringer i input felterne, og opdaterer person state med de nye værdier - mens der tastes (aka vi bruger controlled components)
    const value = event.target.value
    const name = event.target.id
    setPerson({...person, [name]: value})
}
function handleSubmit(event) {
    event.preventDefault() // vi stopper event bubbling, så at vi kan håndtere submit her i stedet for at siden bliver genindlæst
    console.log("submit", person);
    mutatePerson(person)
    // callback funktion fra App.jsx, der enten sender en ny person (hvis id er tom) eller opdaterer (hvis id != "")

}

useEffect(() => {
    setPerson(personToEdit)
}, [personToEdit]);

return (
    <div>
      <h1>Add/Edit Person</h1>
      {JSON.stringify(person)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Id</label>
        <input
          id="id"
          type="text"
          readOnly
          placeholder="id"
          value={person.id}
        />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="name"
          value={person.name}
          onChange={handleChange}
        />
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          min="1"
          max="120"
          placeholder="age"
          value={person.age}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="email"
          value={person.email}
          onChange={handleChange}
        />
        <label htmlFor="gender">Gender</label>
        <select id="gender" value={person.gender} onChange={handleChange}>
          <option defaultChecked>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button className="m-2 btn btn-outline-success btn-sm">Update</button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => setPerson(blankPerson)}
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default PersonForm;
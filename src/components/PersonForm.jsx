import { useState, useEffect } from 'react'



function PersonForm({blankPerson, personToEdit}) {

const [person, setPerson] = useState({...personToEdit})

function handleChange(event) { // denne funktion håndterer ændringer i input felterne, og opdaterer person state med de nye værdier - mens der tastes (aka vi bruger controlled components)
    const value = event.target.value
    const name = event.target.name
    setPerson({...person, [name]: value})
}
function handleSubmit(event) {
    event.preventDefault() // vi stopper event bubbling, så at vi kan håndtere submit her i stedet for at siden bliver genindlæst
    alert("submit", person)
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
    <input name="id" id="id" type="number" readOnly placeholder="id" value={person.id} />
    <label htmlFor="name">Name</label>
    <input name="name" id="name" type="text" placeholder="name" value={person.name} onChange={handleChange} />
    <label htmlFor="age">Age</label>
    <input name="age" id="age" type="number" min="1" max="120" placeholder="age" value={person.age} onChange={handleChange} />
    <label htmlFor="email">Email</label>
    <input name="email" id="email" type="email" placeholder="email" value={person.email} onChange={handleChange} />
    <label htmlFor="gender">Gender</label>
    <select name="gender" id="gender" value={person.gender} onChange={handleChange}>
        <option defaultChecked>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
    </select>
    <button>Update</button>
    <button onClick={() => setPerson(blankPerson)}>Reset</button>
    
</form>

        </div>
     );
}

export default PersonForm;
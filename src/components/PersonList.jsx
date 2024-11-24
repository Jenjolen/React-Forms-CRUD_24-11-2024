function PersonList() {
    return ( <div>

        <h1>List of persons</h1>
        <table className="table table-striped">
    <thead>
        <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Age</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td>1</td>
        <td>Bingo</td>
        <td>34</td>
        <td>bingo@gmail.com</td>
        <td>Male</td>
        <td>
            <button>Edit</button>
            <button>Delete</button>
        </td>
        </tr>
    </tbody>
    </table>

    </div> 
    );
}

export default PersonList;
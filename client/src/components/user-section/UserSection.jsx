import Search from "../search/Search";
import Pagination from "../pagination/Pagination";
import UserList from "./user-list/UserList";
import { use, useEffect, useState } from "react";
import AddUser from "./add-user/AddUser";

const baseUrl = 'http://localhost:3030/jsonstore';

export default function UserSection() {

    const [users, setUsers] = useState([]);
    const [showAddUserForm, setShowUserForm] = useState(false);

    useEffect(() => {
        fetch(`${baseUrl}/users`)
            .then(res => res.json())
            .then(users => setUsers(Object.values(users)))
            .catch(err => console.log(err.message));
    }, []);


    function addUserClickHandler() {
        setShowUserForm(true);
    }

    function hideAddUserForm() {
        setShowUserForm(false);
    }

    return (
        <section className="card users-container">

            < Search />

            < UserList users={users} />

            {showAddUserForm && < AddUser onClose={hideAddUserForm} />}

            <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

            < Pagination />
        </section>
    );
}
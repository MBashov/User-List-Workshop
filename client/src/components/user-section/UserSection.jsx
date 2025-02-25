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
            .then(response => response.json())
            .then(users => setUsers(Object.values(users)))
            .catch(err => console.log(err.message));
    }, []);


    function addUserClickHandler() {
        setShowUserForm(true);
    }

    function hideAddUserFormHandler() {
        setShowUserForm(false);
    }

    function addUserSaveHandler(e) {
        // prevent default
        e.preventDefault();

        // get user data
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        // make post request
        fetch(`${baseUrl}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(userData),
        })
            // update local state   
            .then(response => response.json())  
            .then(user => setUsers(oldUsers => [...oldUsers, user]))
            .catch(err => console.log(err.message));


        // close modal
        setShowUserForm(false);
    }

    return (
        <section className="card users-container">

            < Search />

            < UserList users={users} />

            {showAddUserForm && (
                <AddUser
                    onClose={hideAddUserFormHandler}
                    onSave={addUserSaveHandler}
                />
            )}

            <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

            < Pagination />
        </section>
    );
}
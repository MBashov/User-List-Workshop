import { useEffect, useState } from "react";
import Search from "../search/Search";
import Pagination from "../pagination/Pagination";
import UserList from "./user-list/UserList";
import AddUser from "./add-user/AddUser";
import ShowUserInfo from "./show-user-info/ShowUserInfo";
import DeleteUser from "./delete-user/DeleteUser";

const baseUrl = 'http://localhost:3030/jsonstore';

export default function UserSection() {

    const [users, setUsers] = useState([]);
    const [showAddUserForm, setShowUserForm] = useState(false);
    const [showUserInfo, setShowUserInfo] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);

    useEffect(() => {
        fetch(`${baseUrl}/users`)
            .then(response => response.json())
            .then(users => setUsers(Object.values(users)))
            .catch(err => console.log(err.message));
    }, []);


    function addUserClickHandler() {
        setShowUserForm(true);
    }

    function showUserInfoClickHandler(user) {
        setShowUserInfo(user);
    }

    function hideShowUserInfo() {
        setShowUserInfo(null);
    }

    function addUserSaveHandler(e) {
        // prevent default
        e.preventDefault();

        // get user data
        const formData = new FormData(e.currentTarget);
        const userData = {
            ...Object.fromEntries(formData.entries()),
            address: {
                country: formData.get('country'),
                city: formData.get('city'),
                street: formData.get('street'),
                streetNumber: formData.get('streetNumber')
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

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

    function userDeleteClickHandler(userId) {
        setDeleteUser(userId);
    }

    function onDeleteUserHandler() {

        fetch(`${baseUrl}/users/${deleteUser}`, {
            method: 'DELETE',
        })
            .catch(err => console.log(err.message));

        setUsers(oldUsers => oldUsers.filter(user => user._id !== deleteUser));
        setDeleteUser(null);
    }

    return (
        <section className="card users-container">

            < Search />

            < UserList
                users={users}
                onUserShowInfoClick={showUserInfoClickHandler}
                onUserDeleteClick={userDeleteClickHandler}
            />

            {showAddUserForm && (
                <AddUser
                    onClose={() => setShowUserForm(false)}
                    onSave={addUserSaveHandler}
                />
            )}

            {showUserInfo && <ShowUserInfo onClose={hideShowUserInfo} user={showUserInfo} />}

            {deleteUser && (
                <DeleteUser
                    onCancel={() => setDeleteUser(false)}
                    onDelete={onDeleteUserHandler}
                />
            )}

            <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

            < Pagination />
        </section>
    );
}
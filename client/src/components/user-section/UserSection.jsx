import { useEffect, useState } from "react";

import Search from "../search/Search";
import Pagination from "../pagination/Pagination";
import UserList from "./user-list/UserList";
import AddUser from "./add-user/AddUser";
import ShowUserInfo from "./show-user-info/ShowUserInfo";
import DeleteUser from "./delete-user/DeleteUser";
import userService from "../../services/userService";


export default function UserSection() {

    const [users, setUsers] = useState([]);
    const [showAddUserForm, setShowUserForm] = useState(false);
    const [showUserInfo, setShowUserInfo] = useState(null);
    const [deleteUserById, setDeleteUserById] = useState(null);

    useEffect(() => {
        userService.getAll()
            .then(users => {
                setUsers(users);
            });
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

    async function addUserSaveHandler(e) {
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
        const newUser = await userService.create(userData);
        setUsers(oldUsers => [...oldUsers, newUser]);

        // close modal
        setShowUserForm(false);
    }

    function userDeleteClickHandler(userId) {
        setDeleteUserById(userId);
    }

    async function onDeleteUserHandler() {
        await userService.delete(deleteUserById);
        
        setUsers(oldUsers => oldUsers.filter(user => user._id !== deleteUserById));
        
        setDeleteUserById(null);
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

            {deleteUserById && (
                <DeleteUser
                    onCancel={() => setDeleteUserById(null)}
                    onDelete={onDeleteUserHandler}
                />
            )}

            <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

            < Pagination />
        </section>
    );
}
import { useEffect, useState } from "react";

import Search from "../search/Search";
import Pagination from "../pagination/Pagination";
import UserList from "./user-list/UserList";
import AddUser from "./add-user/AddUser";
import ShowUserInfo from "./show-user-info/ShowUserInfo";
import DeleteUser from "./delete-user/DeleteUser";
import userService from "../../services/userService";
import formatUserData from "../../utils/userDataUtils";

export default function UserSection() {

    const [users, setUsers] = useState([]);
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [showUserInfoById, setShowUserInfoById] = useState(null);
    const [deleteUserById, setDeleteUserById] = useState(null);

    useEffect(() => {
        userService.getAll()
            .then(users => {
                setUsers(users);
            });
    }, []);


    function addUserClickHandler() {
        setShowAddUserForm(true);
    }

    function closeAddUserClickHandler() {
        setShowAddUserForm(false);
    }

    function showUserInfoClickHandler(userId) {
        setShowUserInfoById(userId);
    }

    function closeUserInfoClickHandler() {
        setShowUserInfoById(null);
    }

    async function addUserSaveHandler(e) {
        // prevent default
        e.preventDefault();

        // get user data
        const formData = new FormData(e.currentTarget);
        const userData = formatUserData(formData);

        // make post request
        const newUser = await userService.create(userData);

        // Update local state
        setUsers(oldUsers => [...oldUsers, newUser]);

        // close modal
        setShowAddUserForm(false);
    }

    function deleteUserClickHandler(userId) {
        setDeleteUserById(userId);
    }

    function cancelDeleteUserClickHandler() {
        setDeleteUserById(null);
    }

    async function deleteUserHandler() {
        await userService.delete(deleteUserById);

        setUsers(oldUsers => oldUsers.filter(user => user._id !== deleteUserById));

        setDeleteUserById(null);
    }

    return (
        <section className="card users-container">

            < Search />

            < UserList
                users={users}
                onInfoClick={showUserInfoClickHandler}
                onUserDeleteClick={deleteUserClickHandler}
            />

            {showAddUserForm && (
                <AddUser
                    onClose={closeAddUserClickHandler}
                    onSave={addUserSaveHandler}
                />
            )}

            {showUserInfoById && (
                <ShowUserInfo
                    onClose={closeUserInfoClickHandler}
                    userId={showUserInfoById}
                />
            )}

            {deleteUserById && (
                <DeleteUser
                    onCancel={cancelDeleteUserClickHandler}
                    onDelete={deleteUserHandler}
                />
            )}

            <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

            < Pagination />
        </section>
    );
}
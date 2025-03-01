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

    function closeAddUserClickHandler() {
        setShowUserForm(false);
    }

    function showUserInfoClickHandler(user) {
        setShowUserInfo(user);
    }

    function closeUserInfoClickHandler() {
        setShowUserInfo(null);
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
        setShowUserForm(false);
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
                onShowUserInfo={showUserInfoClickHandler}
                onUserDeleteClick={deleteUserClickHandler}
            />

            {showAddUserForm && (
                <AddUser
                    onClose={closeAddUserClickHandler}
                    onSave={addUserSaveHandler}
                />
            )}

            {showUserInfo && <ShowUserInfo onClose={closeUserInfoClickHandler} user={showUserInfo} />}

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
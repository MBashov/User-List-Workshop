import { useEffect, useState } from "react";

import transformUserData from "../../utils/userDataUtils.js";
import userService from "../../services/userService.js";

import Search from "../search/Search";
import Pagination from "../pagination/Pagination";
import UserList from "./user-list/UserList";
import AddUser from "./add-user/AddUser";
import ShowUserInfo from "./show-user-info/ShowUserInfo";
import DeleteUser from "./delete-user/DeleteUser";

export default function UserSection() {

    const [users, setUsers] = useState([]);
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [showUserInfoById, setShowUserInfoById] = useState(null);
    const [deleteUserById, setDeleteUserById] = useState(null);
    const [editUserById, setEditUserById] = useState(null);
    const [spinner, setSpiner] = useState(true);
    const [failToFetch, setFailToFetch] = useState(false);

    useEffect(() => {
        userService.getAll()
            .then(users => {
                setUsers(users);
                setSpiner(false);
            })
            .catch(err => {
                setSpiner(false);
                setFailToFetch(true);
                console.log(err.message);
            });
    }, []);


    function showAddEditUserForm() {
        setShowAddUserForm(true);
    }

    function closeAddUserForm() {
        setShowAddUserForm(false);
        setEditUserById(null);
    }

    function showUserInfoModal(userId) {
        setShowUserInfoById(userId);
    }

    function closeUserInfoModal() {
        setShowUserInfoById(null);
    }

    async function addUserSaveHandler(e) {
        // prevent default
        e.preventDefault();

        setSpiner(true);
        // get user data
        const formData = new FormData(e.target.parentElement.parentElement);
        const userData = transformUserData(formData);

        try {
            // make post request
            const newUser = await userService.create(userData);

            // Update local state
            setUsers(users => [...users, newUser]);

            // close modal
            setShowAddUserForm(false);
            setSpiner(false);

        } catch (err) {
            setSpiner(false);
            setFailToFetch(true);
            console.log(err.message);
        }

    }

    function showUserDeleteDialog(userId) {
        setDeleteUserById(userId);
    }

    function closeUserDeleteDialog() {
        setDeleteUserById(null);
    }

    async function deleteUserHandler() {
        setSpiner(true);

        try {
            await userService.delete(deleteUserById);
            setUsers(users => users.filter(user => user._id !== deleteUserById));

            setDeleteUserById(null);
            setSpiner(false);

        } catch (err) {
            setSpiner(false);
            setFailToFetch(true);
            console.log(err.message);
        }
    }

    function showUserEditForm(userId) {
        setEditUserById(userId);
    }

    async function editUserSaveHandler(e) {
        setSpiner(true);
        const userId = editUserById;
        // prevent default
        e.preventDefault();

        // get user data
        const formData = new FormData(e.target.parentElement.parentElement);
        const userData = transformUserData(formData);

        try {
            // make put request
            const updatedUser = await userService.edit(userId, userData);

            // Update local state
            setUsers(users => users.map(user => user._id === updatedUser._id ? updatedUser : user));

            // close modal
            setEditUserById(null);
            setSpiner(false);

        } catch (err) {
            setSpiner(false);
            setFailToFetch(true);
            console.log(err.message);
        }
    }
    
    function showSearchedUsers(users) {
        setUsers(users);
    }
    
    return (
        <section className="card users-container">

            < Search onSearch={showSearchedUsers} />

            < UserList
                users={users}
                onInfoClick={showUserInfoModal}
                onDeleteClick={showUserDeleteDialog}
                onEditClick={showUserEditForm}
                spinner={spinner}
                failToFetch={failToFetch}
            />

            {showAddUserForm && (
                <AddUser
                    onClose={closeAddUserForm}
                    onSave={addUserSaveHandler}
                />
            )}

            {showUserInfoById && (
                <ShowUserInfo
                    onClose={closeUserInfoModal}
                    userId={showUserInfoById}
                />
            )}

            {deleteUserById && (
                <DeleteUser
                    onCancel={closeUserDeleteDialog}
                    onDelete={deleteUserHandler}
                />
            )}

            {editUserById && (
                <AddUser
                    userId={editUserById}
                    onClose={closeAddUserForm}
                    onSave={addUserSaveHandler}
                    onEdit={editUserSaveHandler}
                />
            )}

            <button className="btn-add btn" onClick={showAddEditUserForm}>Add new user</button>

            < Pagination />
        </section>
    );
}
import Search from "../search/Search";
import Pagination from "../pagination/Pagination";
import UserList from "./user-list/UserList";
import { use, useEffect, useState } from "react";

const baseUrl = 'http://localhost:3030/jsonstore';



export default function UserSection() {

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetch(`${baseUrl}/users`)
            .then(res => res.json())
            .then(users => setUsers(Object.values(users)))
            .catch(err => console.log(err.message));
    }, []);

    return (
        <section className="card users-container">

            < Search />

            < UserList users={users}/>

            <button className="btn-add btn">Add new user</button>

            < Pagination />
        </section>
    );
}
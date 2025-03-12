import UserListItem from "./user-list-item/UserListItem";
import LoadingShade from "../../loading-shade/LoadingShade";
import { useEffect, useState } from "react";

export default function UserList({
    users,
    onInfoClick,
    onDeleteClick,
    onEditClick,
    spinner,
    failToFetch,
    noMatches
}) {
    let noUsersYet = false;
    if (users.length === 0) {
        noUsersYet = true;
    }

    const [dataIcon, setDataIcon] = useState({
        key: '',
        asc: false,
    });

    const [sortedUsers, setSortedUsers] = useState(users);

    function sortListHandler(key) {
        const asc = dataIcon.key === key ? !dataIcon.asc : true; // Toggle asc only if clicking the same column
        setDataIcon({ key, asc });

        const sorted = [...users];
        if (key === 'firstName') {
            sorted.sort((a, b) =>
                asc
                    ? a.firstName.localeCompare(b.firstName)
                    : b.firstName.localeCompare(a.firstName)
            );
        } else if (key === 'lastName') {
            sorted.sort((a, b) =>
                asc
                    ? a.lastName.localeCompare(b.lastName)
                    : b.lastName.localeCompare(a.lastName)
            );
        } else if (key === 'email') {
            sorted.sort((a, b) =>
                asc
                    ? a.email.localeCompare(b.email)
                    : b.email.localeCompare(a.email)
            );
        } else if (key === 'created') {
            sorted.sort((a, b) =>
                asc
                    ? new Date(a.createdAt) - new Date(b.createdAt)
                    : new Date(b.createdAt) - new Date(a.createdAt)
            );
        }

        setSortedUsers(sorted); // Update the sorted users list
    }

    useEffect(() => {
        // Update sortedUsers if the users array changes
        setSortedUsers(users);
    }, [users]);

    return (
        <div className="table-wrapper">
            {(spinner || noUsersYet || failToFetch || noMatches) && (
                <LoadingShade
                    spinner={spinner}
                    noUsersYet={noUsersYet}
                    failToFetch={failToFetch}
                    noMatches={noMatches}
                />
            )}

            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th onClick={() => sortListHandler('firstName')}>
                            First name
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon={dataIcon.asc ? "arrow-up" : "arrow-down"}
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                style={dataIcon.asc ? { transform: "rotate(0deg)" } : { transform: "rotate(180deg)" }}
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"></path>
                            </svg>
                        </th>
                        <th onClick={() => sortListHandler('lastName')}>
                            Last name
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon={dataIcon.asc ? "arrow-up" : "arrow-down"}
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                style={dataIcon.asc ? { transform: "rotate(0deg)" } : { transform: "rotate(180deg)" }}
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"></path>
                            </svg>
                        </th>
                        <th onClick={() => sortListHandler('email')}>
                            Email
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon={dataIcon.asc ? "arrow-up" : "arrow-down"}
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                style={dataIcon.asc ? { transform: "rotate(0deg)" } : { transform: "rotate(180deg)" }}
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"></path>
                            </svg>
                        </th>
                        <th>Phone</th>
                        <th onClick={() => sortListHandler('created')}>
                            Created
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon={dataIcon.asc ? "arrow-up" : "arrow-down"}
                                className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                style={dataIcon.asc ? { transform: "rotate(0deg)" } : { transform: "rotate(180deg)" }}
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path fill="currentColor"
                                    d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"></path>
                            </svg>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user) => (
                        <UserListItem
                            key={user._id}
                            user={user}
                            onInfoClick={onInfoClick}
                            onDeleteClick={onDeleteClick}
                            onEditClick={onEditClick}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

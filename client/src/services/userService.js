const baseUrl = 'http://localhost:3030/jsonstore/users';

export default {
    async getAll(filter = {}) {
        let users;
        const response = await fetch(baseUrl);
        const result = await response.json();

        users = Object.values(result);

        if (filter.search && (filter.criteria === 'Not selected')) {
            return users = users.filter(user => {
                return user.firstName.toLowerCase().includes(filter.search.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(filter.search.toLowerCase()) ||
                    user.email.toLowerCase().includes(filter.search.toLowerCase()) ||
                    user.phoneNumber.includes(filter.search)
            });
        }
        
        if (filter.search && (filter.criteria !== 'Not selected')) {
        switch (filter.criteria) {
            case 'First Name':
                return users.filter(user => user.firstName.toLowerCase().includes(filter.search.toLowerCase()));
            case 'Last Name':
                return users.filter(user => user.lastName.toLowerCase().includes(filter.search.toLowerCase()));
            case 'Email':
                return users.filter(user => user.email.toLowerCase().includes(filter.search.toLowerCase()));
            case 'Phone':
                return users.filter(user => user.phoneNumber.includes(filter.search));
            default:
                return users;
        }
    }

        return users
    },

    async getOne(userId) {
        const response = await fetch(`${baseUrl}/${userId}`);
        const result = await response.json();

        return result;
    },

    async create(userData) {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(userData),
        });
        const result = await response.json();

        return result;
    },

    async edit(userId, userData) {
        const response = await fetch(`${baseUrl}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({ _id: userId, ...userData }),
        });
        const result = await response.json();

        return result;
    },

    async delete(userId) {
        const response = await fetch(`${baseUrl}/${userId}`, {
            method: 'DELETE',
        });
        const result = await response.json();

        return result;
    }
}

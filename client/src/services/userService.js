const baseUrl = 'http://localhost:3030/jsonstore/users';


export default {
    async getAll() {
        const response = await fetch(baseUrl);
        const result = await response.json();
        const users = Object.values(result);

        return users
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

    async delete(userId) {
        const response = await fetch(`${baseUrl}/${userId}`, {
            method: 'DELETE',
        });
        const result = await response.json();

        return result;
    }
}

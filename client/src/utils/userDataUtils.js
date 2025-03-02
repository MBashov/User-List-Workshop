export default function transformUserData(formData) {
    const userData = Object.fromEntries(formData.entries());

    const { country, city, street, streetNumber, ...formatedData } = userData;
    formatedData.address = {
        country,
        city,
        street,
        streetNumber,
    }
    formatedData.createdAt = new Date().toISOString();
    formatedData.updatedAt = new Date().toISOString();

    return formatedData;
}


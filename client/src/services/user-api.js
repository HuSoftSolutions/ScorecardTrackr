const baseUrl = "http://localhost:8080/user";

export async function fetchAllRoles() {
    const init = {
        method: "GET"
    }
    const response = await fetch(`${baseUrl}/role`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch roles.");
}

export async function getUserByUserId(userId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/${userId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch user.");
}

export async function getUserByEmail(email) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/email/${email}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch score.");
}

export async function getUserByFirstName(firstName) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/firstName/${firstName}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch score.");
}

export async function getUserByLastName(lastName) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/lastName/${lastName}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch score.");
}

export async function createUser(user) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    }
    const response = await fetch(`${baseUrl}/create`, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 400) {
        const messages = await response.json();
        return Promise.reject({ status: response.status, messages });
    }
    return Promise.reject({ status: response.status });
}

export async function updateUser(user) {
    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(user)
    }
    const response = await fetch(`${baseUrl}/update`, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 500) {
        return Promise.reject("Could not update user.");
    }
    return Promise.reject({ status: response.status });
}
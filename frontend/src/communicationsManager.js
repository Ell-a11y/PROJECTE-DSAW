export const SERVER_URL = "http://localhost:8000"

export async function register(formData) {
    const response = await fetch(`${SERVER_URL}/api/register/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
}

export async function login(formData) {
    const response = await fetch(`${SERVER_URL}/api/login/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
}

export async function objectsList() {
    const response = await fetch(`${SERVER_URL}/objectes/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
    });
    const data = await response.json();
    return data;
}

export async function createOneObject(formData) {
    const response = await fetch(`${SERVER_URL}/objectes/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify(formData),
    });
}

export async function updateOneObject(formData) {
    const response = await fetch(`${SERVER_URL}/objectes/${formData.id}/`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify(formData),
    });
}

export async function deleteOneObject(id) {
    const response = await fetch(`${SERVER_URL}/objectes/${id}/`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
    });
}

export async function createOneComment(formData) {
    const response = await fetch(`${SERVER_URL}/comentaris/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify(formData),
    });
}


export async function commentsByObject(objecte) {
    const response = await fetch(`${SERVER_URL}/comentaris/?objecte=${objecte}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
    });
    const data = await response.json();
    return data;
}

export async function createTransaction(formData) {
    const response = await fetch(`${SERVER_URL}/transaccions/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify(formData),
    });
}

export async function finishTransaction(id) {
    const response = await fetch(`${SERVER_URL}/transaccions/${id}/`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify({ finished: true }),
    });
}

export async function getCategories() {
    const response = await fetch(`${SERVER_URL}/categories/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
    });
}


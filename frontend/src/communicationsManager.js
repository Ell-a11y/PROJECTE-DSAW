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
export const SERVER_URL = "http://localhost:8000"

export async function register(formData) {
    // Crea un nuevo usuario enviando los datos del formulario al endpoint de registro.
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
    console.log(formData);
    // Autentica al usuario con sus credenciales y mantiene la sesión con cookies.
    const response = await fetch(`${SERVER_URL}/api/login/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    console.log(response)
    const data = await response.json();
    console.log(data)
    return data;
}

export async function objectsList() {
    // Obtiene la lista de objetos disponibles para el usuario autenticado.
    const response = await fetch(`${SERVER_URL}/objectes/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}

export async function createOneObject(formData) {
    // Crea un nuevo objeto en el sistema con los datos proporcionados.
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
    // Actualiza un objeto existente usando su id y los nuevos datos del formulario.
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
    // Elimina un objeto concreto identificado por su id.
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
    // Publica un nuevo comentario asociado a un objeto.
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
    // Recupera todos los comentarios filtrados por el id del objeto indicado.
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
    // Inicia una transacción/intercambio entre usuarios con los datos enviados.
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
    // Marca una transacción concreta como finalizada.
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
    // Consulta el listado de categorías disponibles para clasificar objetos.
    const response = await fetch(`${SERVER_URL}/categories/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
}
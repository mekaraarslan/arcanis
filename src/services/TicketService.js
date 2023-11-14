import APImanager from '../apiManager';

/* UsersDataGet */
export async function fetchTicketsGet(url) {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            }
        });
        if (!response.ok) {
            throw new Error('API request failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
/* UsersDataGet */

/* DeleteRocket */

export async function deleteTicket(id) {
    const baseUrl = APImanager.getBaseURL();
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(`${baseUrl}/ticket-sales/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            },
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

/* DeleteRocket */

/* putExpedition */

export async function putTicket(ticketSalesData) {
    const baseUrl = APImanager.getBaseURL();
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await fetch(`${baseUrl}/ticket-sales`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            },
            body: JSON.stringify(ticketSalesData),
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

/* putExpedition */
import APImanager from '../apiManager';
import axios from 'axios';

/* FetchPlanetsGet */

export async function fetchPlanetsGet(url) {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

/* FetchPlanetsGet */

/* FetchPlanetsPost */

export async function fetchPlanetsPost(valuesPlanets, url) {
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await axios.post(url, valuesPlanets, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

/* FetchPlanetsPost */

/* putPlanet */

export async function putPlanet(planets) {
    const baseUrl = APImanager.getBaseURL();
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await axios.put(`${baseUrl}/planets`, planets, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

/* PutPlanet */

/* DeletePlanet */

export async function deletePlanet(id) {
    const baseUrl = APImanager.getBaseURL();
    try {
        const localStorageToken = localStorage.getItem('access-token');
        const response = await axios.delete(`${baseUrl}/planets/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorageToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

/* DeletePlanet */

/* LookupsPlanet */

export async function fetchLookupsPlanetsGet(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
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

/* LookupsPlanet */
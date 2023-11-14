import React, { useEffect } from 'react'
import "./Planets.css";
import { PlanetCard } from '../../components/PlanetCard/PlanetCard';
import { checkToken } from '../../services/authService';

export default function SpaceShips() {

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <container className='planetsAdminContainer'>
            <article className='planetsAdminBody'>
                <h1 id='planetsTitle'>Planets</h1>
                <div className='planetList'>
                    <PlanetCard />
                </div>
            </article>
        </container>
    )
}


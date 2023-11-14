import React, { useEffect, useState } from 'react';
import "./AdminPanel.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineRocket, AiOutlineUser } from "react-icons/ai";
import { BiExit, BiPlanet, BiMenu } from "react-icons/bi";
import { BsFillArrowRightSquareFill, BsTicketPerforated } from "react-icons/bs";
import { GiPathDistance } from "react-icons/gi";
import UsersList from '../Users/UsersList';
import MainPage from "../main/MainPage";
import SpaceShips from '../SpaceShips/SpaceShips';
import PlanetsAdmin from '../PlanetsAdmin/PlanetsAdmin';
import Expedition from "../Expedition/Expedition";
import { PageButton } from '../../components/pageButton/PageButton';
import { checkToken } from '../../services/authService';
import { fetchUsersDataGet } from '../../services/userService';
import TicketAdmin from '../TicketAdmin/TicketAdmin';
import APImanager from '../../apiManager';

export default function AsideHeader() {
    const [activeButton, setActiveButton] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const baseUrl = APImanager.getBaseURL();

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
        localStorage.setItem("activeButton", buttonText);
    };

    const handleLogout = () => {
        localStorage.removeItem('access-token');
    };

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        async function getUser() {
            const url = `${baseUrl}/users/info`;
            const data = await fetchUsersDataGet(url)
                .catch(error => {
                    console.error('API request failed:', error);
                    return [];
                })
            setUserInfo(data);
        }
        getUser();
    }, []);

    useEffect(() => {

        const isFirstLogin = localStorage.getItem("isFirstLogin") === "true";

        debugger;
        if (isFirstLogin) {
            localStorage.setItem("activeButton", "Anasayfa");
            localStorage.setItem("isFirstLogin", "false");
            setActiveButton("Anasayfa");
        } else {
            const savedActiveButton = localStorage.getItem("activeButton");
            setActiveButton(savedActiveButton);
        }
    }, []);


    return (
        <container id='adminPanelContainer'>
            <div className='adminPanelBody'>
                <div className='adminNavigateBar'>
                    <div className='arcanisLogoAndTitle'>
                        <img alt="logo" className='arcanisImg' src='/images/rocket-img.png' />
                        <h1>Arcanis</h1>
                    </div>
                    <div className='adminBtnGroup'>
                        <div className='adminBtnPosition'>
                            <PageButton to="mainpage" className={`adminPanelButton ${activeButton === "Anasayfa" ? 'active' : ''}`} icon={<AiOutlineHome />} onClick={() => handleButtonClick("Anasayfa")} text="Anasayfa" />
                            <PageButton to="userlist" className={`adminPanelButton ${activeButton === "Kullanıcılar" ? 'active' : ''}`} icon={<AiOutlineUser />} onClick={() => handleButtonClick("Kullanıcılar")} text="Kullanıcılar" />
                            <PageButton to="spaceships" className={`adminPanelButton ${activeButton === "Uzay Araçları" ? 'active' : ''}`} icon={<AiOutlineRocket />} onClick={() => handleButtonClick("Uzay Araçları")} text="Uzay Araçları" />
                            <PageButton to="planetsadmin" icon={<BiPlanet />} onClick={() => handleButtonClick("Gezegenler")} text="Gezegenler" className={`adminPanelButton ${activeButton === "Gezegenler" ? 'active' : ''}`} />
                            <PageButton to="expedition" icon={<GiPathDistance />} onClick={() => handleButtonClick("Seferler")} text="Seferler" className={`adminPanelButton ${activeButton === "Seferler" ? 'active' : ''}`} />
                            <PageButton to="ticketadmin" icon={<BsTicketPerforated />} onClick={() => handleButtonClick("Ticket")} text="Biletler" className={`adminPanelButton ${activeButton === "Ticket" ? 'active' : ''}`} />
                        </div>
                        <div className='adminBtnExitBody'>
                            <PageButton to="/" className="adminBtnExit" icon={<BiExit />} onClick={handleLogout} text="Çıkış" />
                        </div>
                    </div>
                </div>
                <article className='adminHeaderbar'>
                    <div className='adminHeaderPosition'>
                        <div className='customerPageBtn'>
                            <Link className='customerInfoBtn' to={"/"} alt={"Customer Page"}><BsFillArrowRightSquareFill /></Link>
                            <p className='customerInfo'>Müşteri Sayfası</p>
                        </div>
                        <div className='adminResponseHeader'>
                            <div className="adminResponseButtons">
                                <div class="adminResponseMenu">
                                    <button class="adminResponseMenuButton"><BiMenu /></button>
                                    <div class="adminResponseDropdownContent">
                                        <Link to="mainpage">Anasayfa</Link>
                                        <Link to="userlist">Kullanıcılar</Link>
                                        <Link to="spaceships">Uzay Araçları</Link>
                                        <Link to="planetsadmin">Gezegenler</Link>
                                        <Link to="expedition">Seferler</Link>
                                        <Link to="ticketadmin">Biletler</Link>
                                        <Link to="/">Müşteri Sayfası</Link>
                                        <Link to="/" onClick={handleLogout} >Çıkış</Link>
                                    </div>
                                </div>
                            </div>
                            <div className='adminInfoResponse'>
                                <div className='adminInfo'>
                                    <h1>{userInfo.name} {userInfo.surname}</h1>
                                    <span>Admin</span>
                                </div>
                                <div className='headerAdminImg'>
                                    <img alt='admin' className='adminImg' src='/images/AdminPP.avif' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Routes>
                            <Route path="/*" element={<MainPage />} />
                            <Route exact path="mainpage" element={<MainPage />} />
                            <Route exact path="userlist" element={<UsersList />} />
                            <Route exact path="spaceships" element={<SpaceShips />} />
                            <Route exact path="planetsadmin" element={<PlanetsAdmin />} />
                            <Route path="expedition" element={<Expedition />} />
                            <Route path="ticketadmin" element={<TicketAdmin />} />
                        </Routes>
                    </div>
                </article>
            </div>
        </container>
    )
}
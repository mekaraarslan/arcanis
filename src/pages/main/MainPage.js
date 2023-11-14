import React, { useEffect, useState } from 'react';
import "./MainPage.css";
import { checkToken } from '../../services/authService';
import { TfiStatsUp } from 'react-icons/tfi';
import { FiDollarSign } from 'react-icons/fi';
import { LiaUserSolid } from 'react-icons/lia';
import { BiCube } from 'react-icons/bi';
import { BiRefresh } from 'react-icons/bi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { Popover, Progress, Space } from 'antd';
import { fetchUsersDataGet } from "../../services/userService";
import { fetchPlanetsGet } from '../../services/PlanetService';
import { fetchExpenditionsGet } from '../../services/ExpeditionService';
import APImanager from '../../apiManager';

export default function MainPage() {

    const [usersMostTicketsData, setUsersMostTicketsData] = useState([]);
    const [planetsMostPopulerData, setPlanetsMostPopulerData] = useState([]);
    const [expeditionsTotalCompleted, setExpeditionsTotalCompleted] = useState([]);
    const [totalAmountsCompleted, setTotalAmountsCompleted] = useState([]);
    const baseUrl = APImanager.getBaseURL();

    const progresColor = [
        { color: '#7366F0' },
        { color: '#00CEE7' },
        { color: '#EA5354' },
        { color: '#29C76F' },
    ];

    const conicColors = {
        '0%': '#87d068',
        '50%': '#ffe58f',
        '100%': '#ffccc7',
    };

    useEffect(() => {
        checkToken();
        fetchTotalMostTicketsData();
        fetchUsersMostTicketsData();
        fetcTotalExpeditionsData();
        fetchUsersMostPlanetsData();
    }, []);

    /* Total */
    async function fetchTotalMostTicketsData() {
        const url = `${baseUrl}/statistics/total-amounts`;
        const data = await fetchUsersDataGet(url)
            .catch(error => {
                console.error('API request failed:', error);
                return [];
            })
        setTotalAmountsCompleted(data);
    }
    /* Total */
    /* Ticket */
    async function fetchUsersMostTicketsData() {
        const url = `${baseUrl}/statistics/users-who-purchased-most-tickets`;
        const data = await fetchUsersDataGet(url)
            .catch(error => {
                console.error('API request failed:', error);
                return [];
            })
        setUsersMostTicketsData(data);
    }

    const handleRefreshUsersMostTickets = async () => {
        const url = `${baseUrl}/statistics/users-who-purchased-most-tickets`;
        const data = await fetchUsersDataGet(url).catch((error) => {
            console.error('API request failed:', error);
            return [];
        });
        setUsersMostTicketsData(data);
    };
    /* Ticket */
    /* Expedetion */
    async function fetcTotalExpeditionsData() {
        const url = `${baseUrl}/statistics/completed-expeditions`;
        const data = await fetchExpenditionsGet(url)
            .catch(error => {
                console.error('API request failed:', error);
                return [];
            })
        setExpeditionsTotalCompleted(data);
    }

    const handleRefreshExpeditions = async () => {
        const url = `${baseUrl}/statistics/completed-expeditions`;
        const data = await fetchExpenditionsGet(url).catch((error) => {
            console.error('API request failed:', error);
            return [];
        });
        setExpeditionsTotalCompleted(data);
    };
    /* Expedetion */
    /* Planet */
    async function fetchUsersMostPlanetsData() {
        const url = `${baseUrl}/statistics/most-traveled-planet`;
        const data = await fetchPlanetsGet(url)
            .catch(error => {
                console.error('API request failed:', error);
                return [];
            })
        setPlanetsMostPopulerData(data);
    }

    const handleRefreshPlanetsMostPopular = async () => {
        const url = `${baseUrl}/statistics/most-traveled-planet`;
        const data = await fetchPlanetsGet(url).catch((error) => {
            console.error('API request failed:', error);
            return [];
        });
        setPlanetsMostPopulerData(data);
    };
    /* Planet */

    return (
        <container className='mainPageContainer' >
            <div className='mainPageBody'>
                <div className='mainPageTitle'>
                    <h3>Anasayfa</h3>
                    <p>1 ay önce güncellendi</p>
                </div>
                <div className='mainPageBodyContent'>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-1 svgColor-1'>
                            <TfiStatsUp />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>{totalAmountsCompleted.numberOfSpaceVehicles}</h1>
                            <p>Toplam Uzay Araçları</p>
                        </div>
                    </div>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-2 svgColor-2'>
                            <LiaUserSolid />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>{totalAmountsCompleted.numberOfUsers}</h1>
                            <p>Toplam Kullanıcılar</p>
                        </div>
                    </div>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-3 svgColor-3'>
                            <BiCube />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>{totalAmountsCompleted.numberOfTickets}</h1>
                            <p>Toplam Biletler</p>
                        </div>
                    </div>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-4 svgColor-4'>
                            <FiDollarSign />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>{totalAmountsCompleted.totalRevenueAmount}</h1>
                            <p>Toplam Gelir</p>
                        </div>
                    </div>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-1 svgColor-1'>
                            <TfiStatsUp />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>{totalAmountsCompleted.numberOfPlanets}</h1>
                            <p>Toplam Gezegenler</p>
                        </div>
                    </div>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-1 svgColor-1'>
                            <TfiStatsUp />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>{totalAmountsCompleted.numberOfExpenditions}</h1>
                            <p>Toplam Seferler</p>
                        </div>
                    </div>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-4 svgColor-4'>
                            <FiDollarSign />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>{totalAmountsCompleted.montlyTotalRevenueAmount}</h1>
                            <p>Toplam Aylık Gelir</p>
                        </div>
                    </div>
                    <div className='mainPageBodyContentBox'>
                        <div className='mainPageBodyContentSvg bg-4 svgColor-4'>
                            <FiDollarSign />
                        </div>
                        <div className='mainPageBodyContentTitle'>
                            <h1>{totalAmountsCompleted.dailyTotalRevenueAmount}</h1>
                            <p>Toplam Günlük Gelir</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mainPageBoxContainer'>
                <div className='mainPageBox1'>
                    <div className='mainPageBoxTitle'>
                        <h5>En Çok Seyahat Eden 5 Kullanıcı</h5>
                        <div className='mainPageBoxInfoContainer'>
                            <Popover content="Bu liste en çok seyahat eden 5 kullanıcımızın listesidir.">
                                <div><AiOutlineQuestionCircle /></div>
                            </Popover>
                            <i onClick={handleRefreshUsersMostTickets}><BiRefresh className='mainPageSvg' /></i>
                        </div>
                    </div>
                    <div className='mainPageBoxUsersInfoContainer'>
                        {usersMostTicketsData.map(ticketData => (
                            <div className='mainPageBoxUsersInfo' key={ticketData.id}>
                                <h5>{ticketData.name}</h5>
                                <div className='mainPageBoxUsersInfoSpinner'>
                                    <p>{ticketData.value}-</p>
                                    <Space size={100}>
                                        <Progress type="circle" percent={ticketData.rate.toFixed()} size={45} strokeColor={progresColor} />
                                    </Space>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mainPageBox2'>
                    <div className='mainPageBoxTitle'>
                        <h5>Tamamlanan Seferler</h5>
                        <div className='mainPageBoxInfoContainer'>
                            <Popover content="Bu liste, firmamızın şu ana kadar yaptığı ve tamamladığı bütün seyahatlerin listesidir.">
                                <div><AiOutlineQuestionCircle /></div>
                            </Popover>
                            <i href='#' onClick={handleRefreshExpeditions}><BiRefresh className='mainPageSvg' /></i>
                        </div>
                    </div>
                    <div className='mainPageBoxUsersInfoContainer'>
                        <div className='mainPageExpeditionsBody'>
                            <Space wrap>
                                {expeditionsTotalCompleted && expeditionsTotalCompleted.rate !== undefined ? (
                                    <Progress type="dashboard" size={180} percent={expeditionsTotalCompleted.rate.toFixed(2)} strokeColor={conicColors} />
                                ) : (
                                    <Progress type="dashboard" percent={0} strokeColor={conicColors} />
                                )}
                            </Space>
                        </div>
                    </div>
                    <div className='mainPageExpeditionsFooter'>
                        <div className='mainPageExpeditionsCompleted'>
                            <p>Tamamlanan</p>
                            <h1>{expeditionsTotalCompleted.completedExpeditionCount}</h1>
                        </div>
                        <div className='mainPageExpeditionsProgress'>
                            <p>Devam eden</p>
                            <h1>{expeditionsTotalCompleted.activeExpeditionCount}</h1>
                        </div>
                    </div>
                </div>
                <div className='mainPageBox3'>
                    <div className='mainPageBoxTitle'>
                        <h5>En Çok Ziyaret Edilen 5 Gezegen</h5>
                        <div className='mainPageBoxInfoContainer'>
                            <Popover content="Bu liste en çok seyahat edilen 5 Gezegenin listesidir.">
                                <div><AiOutlineQuestionCircle /></div>
                            </Popover>
                            <i href='#' onClick={handleRefreshPlanetsMostPopular}><BiRefresh className='mainPageSvg' /></i>
                        </div>
                    </div>
                    <div className='mainPageBoxUsersInfoContainer'>
                        {planetsMostPopulerData.map(planetData => (
                            <div className='mainPageBoxUsersInfo' key={planetData.id}>
                                <h5>{planetData.name}</h5>
                                <div className='mainPageBoxUsersInfoSpinner'>
                                    <p>{planetData.value}-</p>
                                    <Space size={30}>
                                        <Progress type="circle" percent={planetData.rate.toFixed()} size={45} strokeColor={progresColor} />
                                    </Space>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </container>
    )
}
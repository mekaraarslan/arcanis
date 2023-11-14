import React, { useEffect } from 'react';
import "./PlanetsAdmin.css";
import { useState } from 'react';
import { checkToken } from '../../services/authService';
import { TableListComp } from '../../components/TableListComp/TableListComp';
import { deletePlanet, fetchPlanetsGet } from '../../services/PlanetService';
import EditModal from '../../components/EditModal/EditUserModal';
import { RiArrowRightSLine } from 'react-icons/ri';
import APImanager from '../../apiManager';
import { Button, Input, Popover, Select } from 'antd';
import buildQuery from 'odata-query';

export default function UsersList() {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [planets, setPlanets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageOdata, setPageOdata] = useState(1);
    const [pageSizeOdata, setPageSizeOdata] = useState(10);

    const [squenceFilter, setSquenceFilter] = useState("");
    const [difficultyLevelFilter, setDifficultyLevelFilter] = useState("");
    const [planetsFilteredData, setPlanetsFilteredData] = useState([]);
    const [totalPageCount, setTotalPageCount] = useState(1);

    const baseUrl = APImanager.getBaseURL();
    const columns = [
        {
            title: '',
            key: 'Id',
            dataIndex: 'Id',
            render: (Id, record) => (
                <button className="editButton" onClick={() => handleEditPlanet(Id)}><RiArrowRightSLine /></button>
            ),
        },
        {
            title: 'GEZEGEN ADI',
            dataIndex: 'Name',
            key: 'user',
        },
        {
            title: 'SIRA',
            dataIndex: 'Sequence',
            key: 'sequence',
        },
        {
            title: 'SEVİYE',
            dataIndex: 'DifficultyLevel',
            key: 'difficultyLevel',
        },
        {
            title: 'DETAYLI AÇIKLAMA',
            key: 'summaryDescription',
            dataIndex: 'summaryDescription',
        },
        {
            title: 'AÇIKLAMA',
            key: 'Description',
            dataIndex: 'Description',
            render: (text) => (
                <div className="table-cell">
                    <Popover content={text}>
                        {text}
                    </Popover>
                </div>
            ),
        },
    ];

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        handleFilterButtonClick();
    }, [pageOdata, pageSizeOdata]);

    const handleDeletePlanet = (Id) => {
        const confirmDelete = window.confirm('Kullanıcıyı silmek istediğine emin misin?');
        if (!confirmDelete) {
            return;
        }
        deletePlanet(Id)
            .then(() => {
                setPlanets((prevPlanetsData) =>
                    prevPlanetsData.filter((planet) => planet.Id !== Id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    const handleEditPlanet = (Id) => {
        const planetEdit = planets.find(planet => planet.Id === Id);
        setSelectedPlanet(planetEdit);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedPlanet(null);
        setIsModalOpen(false);
    };

    async function handleFilterButtonClick() {
        const Sequence = parseInt(squenceFilter);
        const DifficultyLevel = parseInt(difficultyLevelFilter);

        const filters = {};
        if (Sequence) {
            filters.Sequence = Sequence;
        }
        if (DifficultyLevel) {
            filters.DifficultyLevel = DifficultyLevel;
        }

        const queryWithPaging = buildQuery({ filter: filters });
        const url = `${baseUrl}/planets${queryWithPaging}`;
        const data = await fetchPlanetsGet(url)
            .catch(err => {
                console.log("API request failed", err);
            })
        const totalPageCount = Math.ceil(data["@odata.count"]);
        setTotalPageCount(totalPageCount);
        setPlanetsFilteredData(data.value);
    };

    return (
        <container className='planetsContainer'>
            <div className='searchBarPlanetsContainer'>
                <div className='searchBarTitle'>
                    <h1>Gezegen Filtrele</h1>
                </div>
                <div className='SelectRolePosition'>
                    <Input
                        className='SearchBarSpaceShipsInput'
                        value={squenceFilter}
                        onChange={(e) => setSquenceFilter(e.target.value)}
                        placeholder="Sıra Numarası"
                    />
                    <Input
                        className='SearchBarSpaceShipsInput'
                        value={difficultyLevelFilter}
                        onChange={(e) => setDifficultyLevelFilter(e.target.value)}
                        placeholder="Zorluk Seviyesi"
                    />
                    <Button className='SearchBarFilterBtn' onClick={handleFilterButtonClick}>Filtrele</Button>
                </div>
            </div>
            <article className='planetsBody'>
                <TableListComp props={{ columns: columns, dataSource: planetsFilteredData.length ? planetsFilteredData : planets }} text="planets" pageSearchType={"planets"} addButtonLabel={"Gezegen Ekle"} addFilterName={"Gezegen Filtreleme"} setPageOdata={setPageOdata} setPageSizeOdata={setPageSizeOdata} pageOdata={pageOdata} pageSizeOdata={pageSizeOdata} totalPageCount={totalPageCount} />
                {isModalOpen && (
                    <EditModal planet={selectedPlanet} onCancel={handleModalClose} visible={isModalOpen} pageType={"planets"} addEditTitle={"Gezegen Güncelleme"} planetDelete={handleDeletePlanet} />
                )}
            </article>
        </container>
    )
}
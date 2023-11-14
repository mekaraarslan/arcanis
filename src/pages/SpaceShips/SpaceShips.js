import React, { useEffect, useState } from 'react'
import "./SpaceShips.css";
import { checkToken } from '../../services/authService';
import { TableListComp } from "../../components/TableListComp/TableListComp";
import { deleteRocket, fetchRocketsGet } from '../../services/RocketService';
import EditModal from '../../components/EditModal/EditUserModal';
import { RiArrowRightSLine } from 'react-icons/ri';
import { Button, Input, Popover } from 'antd';
import APImanager from '../../apiManager';
import buildQuery from 'odata-query';

export default function SpaceShips() {
    const [selectedRocket, setSelectedRocket] = useState(null);
    const [spaceShipData, setSpaceShipData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageOdata, setPageOdata] = useState(1);
    const [pageSizeOdata, setPageSizeOdata] = useState(10);
    const [filteredSpaceShipData, setFilteredSpaceShipData] = useState([]);

    const [maxModelYearFilter, setMaxModelYearFilter] = useState("");
    const [maxMaxNumberOfPassengersFilter, setMaxMaxNumberOfPassengersFilter] = useState("");
    const [maxAgeLimitFilter, setMaxAgeLimitFilter] = useState("");
    const [minModelYearFilter, setMinModelYearFilter] = useState("");
    const [minMaxNumberOfPassengersFilter, setMinMaxNumberOfPassengersFilter] = useState("");
    const [minAgeLimitFilter, setMinAgeLimitFilter] = useState("");
    const [search, setSearch] = useState("");
    const [totalPageCount, setTotalPageCount] = useState(1);
    const baseUrl = APImanager.getBaseURL();

    const columns = [
        {
            title: '',
            dataIndex: 'Id',
            key: 'Id',
            render: (Id, record) => (
                <button className="editButton" onClick={() => handleEditRocket(Id)}><RiArrowRightSLine /></button>
            ),
        },
        {
            title: 'Araç Adı',
            dataIndex: 'Name',
            key: 'user',
        },
        {
            title: 'Model Adı',
            dataIndex: 'ModelName',
            key: 'modelName',
        },
        {
            title: 'Model Yılı',
            dataIndex: 'ModelYear',
            key: 'modelYear',
        },
        {
            title: 'Seri Numarası',
            key: 'SerialNumber',
            dataIndex: 'SerialNumber',
        },
        {
            title: 'Koltuk Numarası',
            key: 'MaxNumberOfPassengers',
            dataIndex: 'MaxNumberOfPassengers',
        },
        {
            title: 'Yaş Sınırı',
            dataIndex: 'AgeLimit',
            key: 'ageLimit',
        },
        {
            title: 'Açıklama',
            dataIndex: 'Description',
            key: 'description',
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
        getSpaceVehicles();
    }, [pageOdata, pageSizeOdata]);

    const handleDeleteRocket = (Id) => {
        const confirmDelete = window.confirm('Kullanıcıyı silmek istediğine emin misin?');
        if (!confirmDelete) {
            return;
        }
        deleteRocket(Id)
            .then(() => {
                setSpaceShipData((prevSpaceShipData) =>
                    prevSpaceShipData.filter((rocket) => rocket.Id !== Id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    const handleEditRocket = (Id) => {
        const rocketEdit = spaceShipData.find(rocket => rocket.Id === Id);
        setSelectedRocket(rocketEdit);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedRocket(null);
        setIsModalOpen(false);
    };

    async function getSpaceVehicles() {
        const maxModelYear = parseInt(maxModelYearFilter);
        const maxMaxNumberOfPassengers = parseInt(maxMaxNumberOfPassengersFilter);
        const maxAgeLimit = parseInt(maxAgeLimitFilter);
        const minModelYear = parseInt(minModelYearFilter);
        const minMaxNumberOfPassengers = parseInt(minMaxNumberOfPassengersFilter);
        const minAgeLimit = parseInt(minAgeLimitFilter);

        const filters = {
            ModelYear: {},
            MaxNumberOfPassengers: {}
        };

        const count = true;
        const top = pageSizeOdata;
        const skip = (pageOdata - 1) * pageSizeOdata;

        if (minModelYear > 0) {
            filters.ModelYear["ge"] = minModelYear;
        }

        if (maxModelYear > 0) {
            filters.ModelYear["le"] = maxModelYear;
        }
        if (maxMaxNumberOfPassengers > 0) {
            filters.MaxNumberOfPassengers["le"] = maxMaxNumberOfPassengers
        }

        const queryWithFilters = buildQuery({ count, filter: filters, top, skip });
        const url = `${baseUrl}/space-vehicles${queryWithFilters}`;
        const data = await fetchRocketsGet(url)
            .catch(err => {
                console.log("API request failed", err);
            });

        if (data !== undefined && data.value !== null) {
            const totalPageCount = Math.ceil(data["@odata.count"]);
            setTotalPageCount(totalPageCount);
            setFilteredSpaceShipData(data.value);
        }
        else
        {
            setFilteredSpaceShipData([]);
        }
    }

    return (
        <container className='spaceVehicleContainer'>
            <div className='searchBarSpaceShipsContainer'>
                <div className='searchBarTitle'>
                    <h1>Uzay Aracı Filtrele</h1>
                </div>
                <div className='searchInputPosition'>
                    <div className='searchInput'>
                        <Input
                            type='number'
                            className='SearchBarSpaceShipsInput'
                            value={maxModelYearFilter}
                            onChange={(e) => setMaxModelYearFilter(e.target.value)}
                            placeholder="Max Model Yılı"
                            defaultValue={0}
                            min={0}
                        />
                    </div>
                    <div className='searchInput'>
                        <Input
                            type='number'
                            className='SearchBarSpaceShipsInput'
                            value={minModelYearFilter}
                            onChange={(e) => setMinModelYearFilter(e.target.value)}
                            placeholder="Min Model Yılı"
                            defaultValue={0}
                            min={0}
                        />
                    </div>
                    <div className='searchInput'>
                        <Input
                            type='number'
                            className='SearchBarSpaceShipsInput'
                            value={maxMaxNumberOfPassengersFilter}
                            onChange={(e) => setMaxMaxNumberOfPassengersFilter(e.target.value)}
                            placeholder="Max Koltuk Numarası"
                            defaultValue={0}
                            min={0}
                        />
                    </div>
                    <div className='searchInput'>
                        <Input
                            type='number'
                            className='SearchBarSpaceShipsInput'
                            value={minMaxNumberOfPassengersFilter}
                            onChange={(e) => setMinMaxNumberOfPassengersFilter(e.target.value)}
                            placeholder="Min Koltuk Numarası"
                            defaultValue={0}
                            min={0}
                        />
                    </div>
                    <div className='searchInput'>
                        <Input
                            type='number'
                            className='SearchBarSpaceShipsInput'
                            value={maxAgeLimitFilter}
                            onChange={(e) => setMaxAgeLimitFilter(e.target.value)}
                            placeholder="Max Yaş Sınırı"
                            defaultValue={0}
                            min={0}
                        />
                    </div>
                    <div className='searchInput'>
                        <Input
                            type='number'
                            className='SearchBarSpaceShipsInput'
                            value={minAgeLimitFilter}
                            onChange={(e) => setMinAgeLimitFilter(e.target.value)}
                            placeholder="Min Yaş Sınırı"
                            defaultValue={0}
                            min={0}
                        />
                    </div>
                    <div className='searchInput'>
                        <Input
                            className='SearchBarSpaceShipsInput'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Genel arama"
                        />
                    </div>
                    <Button className='SearchBarFilterBtn' onClick={getSpaceVehicles}>Filtrele</Button>
                </div>
            </div>
            <article className='spaceVehicleBody'>
                <TableListComp props={{ columns: columns, dataSource: filteredSpaceShipData.length ? filteredSpaceShipData : spaceShipData }} filteredSpaceShipData={filteredSpaceShipData} text="spaceShips" pageSearchType={"spaceShips"} addButtonLabel={"Uzay Aracı Ekle"} addFilterName={"Uzay Aracı Filtreleme"} setPageOdata={setPageOdata} setPageSizeOdata={setPageSizeOdata} pageOdata={pageOdata} pageSizeOdata={pageSizeOdata} totalPageCount={totalPageCount} />
                {isModalOpen && (
                    <EditModal rocket={selectedRocket} onCancel={handleModalClose} visible={isModalOpen} pageType={"spaceShips"} addEditTitle={"Uzay Aracı Güncelleme"} rocketDelete={handleDeleteRocket} />
                )}
            </article>
        </container>
    )
}

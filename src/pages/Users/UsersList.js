import "./UsersList.css";
import { useEffect, useState } from 'react';
import { checkToken } from "../../services/authService";
import { TableListComp } from "../../components/TableListComp/TableListComp";
import { deleteUsers, fetchUsersDataGet } from "../../services/userService";
import { RiArrowRightSLine } from 'react-icons/ri';
import EditUserModal from "../../components/EditModal/EditUserModal";
import APImanager from '../../apiManager';
import buildQuery from 'odata-query';
import { Button, Input } from "antd";

export default function UsersList() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [pageOdata, setPageOdata] = useState(1);
    const [pageSizeOdata, setPageSizeOdata] = useState(10);

    const [usersFiltersData, setUsersFiltersData] = useState([]);
    const [userRoleType, setUserRoleType] = useState("");
    const [isActive, setIsActive] = useState("");
    const [totalPageCount, setTotalPageCount] = useState(1);
    const baseUrl = APImanager.getBaseURL();
    const columns = [
        {
            key: 'Id',
            dataIndex: 'Id',
            render: (Id, record) => (
                <button className="editButton" onClick={() => handleEditUser(Id)}><RiArrowRightSLine /></button>
            ),
        },
        {
            title: 'İSİM',
            dataIndex: 'Name',
            key: 'Name',
        },
        {
            title: 'SOYİSİM',
            dataIndex: 'Surname',
            key: 'Surname',
        },
        {
            title: 'E-POSTA',
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: 'TELEFON',
            dataIndex: 'Phone',
            key: 'Phone',
        },
        {
            title: 'KULLANICI ADI',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'AKTİF',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text) => {
                if (text === true) {
                    return 'Aktif';
                } else if (text === false) {
                    return 'Aktif Değil';
                } else {
                    return 'Unknown';
                }
            },
        },
        {
            title: 'ROL',
            dataIndex: 'userRoleType',
            key: 'userRoleType',
            render: (text) => {
                if (text === 1) {
                    return 'Admin';
                } else if (text === 2) {
                    return 'Customer';
                } else {
                    return 'Unknown';
                }
            },
        },
    ];

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        handleFilterButtonClick();
    }, [pageOdata, pageSizeOdata]);

    const handleDeleteUser = (Id) => {
        const confirmDelete = window.confirm('Kullanıcıyı silmek istediğine emin misin?');
        if (!confirmDelete) {
            return;
        }
        deleteUsers(Id)
            .then(() => {
                setUsersData((prevUsersData) =>
                    prevUsersData.filter((user) => user.Id !== Id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    const handleEditUser = (Id) => {
        const userToEdit = usersData.find(user => user.Id === Id);
        setSelectedUser(userToEdit);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    async function handleFilterButtonClick() {
        const isActiveValue = parseInt(isActive);
        const userRoleTypeValue = parseInt(userRoleType);
        const filters = {};
        if (isActiveValue) {
            filters.isActive = isActiveValue;
        }
        if (userRoleTypeValue) {
            filters.userRoleType = userRoleTypeValue;
        }
        const queryWithPaging = buildQuery({
            filter: filters
        });
        const url = `${baseUrl}/users${queryWithPaging}`;
        const data = await fetchUsersDataGet(url)
            .catch(err => {
                console.log("API request failed", err);
            })
        const totalPageCount = Math.ceil(data["@odata.count"]);
        setTotalPageCount(totalPageCount);
        setUsersFiltersData(data.value);
    }

    return (
        <div className='userListContainer'>
            <div className='searchBarUsersContainer'>
                <div className='searchBarTitle'>
                    <h1>Kullanıcı Filtrele</h1>
                </div>
                <div className='SelectRolePosition'>
                    <div className='searchInput'>
                        <Input
                            className='SearchBarSpaceShipsInput'
                            value={userRoleType}
                            onChange={(e) => setUserRoleType(e.target.value)}
                            placeholder="Kullanıcı Rolü"
                        />
                    </div>
                    <div className='searchInput'>
                        <Input
                            className='SearchBarSpaceShipsInput'
                            value={isActive}
                            onChange={(e) => setIsActive(e.target.value)}
                            placeholder="Kullanıcı Durumu"
                        />
                    </div>
                    <Button className='SearchBarFilterBtn' onClick={handleFilterButtonClick}>Filtrele</Button>
                </div>
            </div>
            <div className='userListBody'>
                <TableListComp props={{ columns: columns, dataSource: usersFiltersData && usersFiltersData.length ? usersFiltersData : usersData }} text="users" pageSearchType={"users"} addButtonLabel={"Kullanıcı Ekle"} addFilterName={"Kullanıcı Filtreleme"} setPageOdata={setPageOdata} setPageSizeOdata={setPageSizeOdata} pageOdata={pageOdata} pageSizeOdata={pageSizeOdata} totalPageCount={totalPageCount}/>
                {isModalOpen && (
                    <EditUserModal user={selectedUser} onCancel={handleModalClose} visible={isModalOpen} pageType={"users"} addEditTitle={"Kullanıcı Güncelleme"} userDelete={handleDeleteUser} />
                )}
            </div>
        </div>
    );
}
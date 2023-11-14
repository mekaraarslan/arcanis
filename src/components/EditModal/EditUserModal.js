import "./EditUserModal.css";
import React, { useEffect, useState } from 'react';
import { Modal, Input, Space, Select, Button } from 'antd';
import { putUsers } from '../../services/userService';
import { fetchRocketsGet, putRocket } from '../../services/RocketService';
import { fetchPlanetsGet, putPlanet } from '../../services/PlanetService';
import { putExpedition } from '../../services/ExpeditionService';
import { putTicket } from '../../services/TicketService';
import APImanager from '../../apiManager';

export default function EditUserModal({ user, rocket, planet, ticket, expendition, onSave, onCancel, visible, pageType, addEditTitle, userDelete, rocketDelete, planetDelete, expeditionDelete, ticketDelete }) {
    const [editedData, setEditedData] = useState(user);
    const [editRocket, setEditRocket] = useState(rocket);
    const [editPlanet, setEditPlanet] = useState(planet);
    const [editExpedition, setEditExpedition] = useState(expendition);
    const [editTicket, setEditTicket] = useState(ticket);
    const baseUrl = APImanager.getBaseURL();

    const [errorText, setErrorText] = useState("");
    const [spaceVehicleData, setSpaceVehicleData] = useState([]);
    const [planetData, setPlanetData] = useState([]);

    const [spaceVehicleId, setSelectedSpaceVehicle] = useState("Space Vehicle");
    const [departurePlanetId, setSelectedDeparturePlanet] = useState("Departure Planet");
    const [arrivalPlanetId, setSelectedArrivalPlanet] = useState("Arrival Planet");

    const UserRole = {
        ADMIN: 1,
        CUSTOMER: 2,
    };

    const priceOptions = [];
    for (let price = 100000; price <= 500000; price += 10000) {
        priceOptions.push({
            value: price.toLocaleString(),
            label: `$${price.toLocaleString()}`
        });
    };

    const ageLimitOptions = [];
    for (let age = 1; age <= 100; age++) {
        ageLimitOptions.push({
            value: age.toString(),
            label: age.toString()
        })
    };

    const handleUserRoleChange = (value) => {
        setEditedData((prev) => ({ ...prev, userRole: value }));
    };

    const handleSelectSpaceVehicle = (value) => {
        setSelectedSpaceVehicle(value);
    };

    const handleSelectDeparturePlanet = (value) => {
        setSelectedDeparturePlanet(value);
    };

    const handleSelectArrivalPlanet = (value) => {
        setSelectedArrivalPlanet(value);
    };

    useEffect(() => {
        if (errorText) {
            const timer = setTimeout(() => {
                setErrorText("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorText]);

    const handleSave = async () => {
        try {
            if (pageType === 'users') {
                const requiredFields = ['name', 'surname', 'EmailAddress', 'PhoneNumber', 'username', 'password'];
                for (const field of requiredFields) {
                    if (!editedData[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                await putUsers(editedData);
                onSave(user.id, editedData);
            }
            if (pageType === 'spaceShips') {
                const requiredFields = ['Name', 'ModelName', 'ModelYear', 'SerialNumber', 'Description', 'MaxNumberOfPassengers', 'AgeLimit'];
                for (const field of requiredFields) {
                    if (!editRocket[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                await putRocket(editRocket);
                onSave(rocket.Id, editRocket);
                onCancel();
            }
            if (pageType === 'planets') {
                const requiredFields = ['Name', 'Sequence', 'DifficultyLevel', 'ImageUrl', 'DetailsImageUrl', 'Description', 'summaryDescription'];
                for (const field of requiredFields) {
                    if (!editPlanet[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                await putPlanet(editPlanet);
                onSave(planet.id, editPlanet);
            }
            if (pageType === 'expedition') {
                const requiredFields = ['name', 'expeditionDate', 'arrivalDate', 'ticketPrice', 'spaceVehicleId', 'departurePlanetId', 'arrivalPlanetId'];
                for (const field of requiredFields) {
                    if (!editExpedition[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                await putExpedition(editExpedition);
                onSave(expendition.id, editExpedition);
            }
            if (pageType === 'ticketAdmin') {
                const requiredFields = ['CreatedDate', 'ExpeditionId', 'SeatNumber'];
                for (const field of requiredFields) {
                    if (!editTicket[field]) {
                        setErrorText(`Lütfen ${field} alanını doldurun.`);
                        return;
                    }
                }
                await putTicket(editTicket);
                onSave(ticket.id, editTicket);
            }
        } catch (error) {
            console.error("Güncelleme işlemi başarısız oldu.", error);
        }
    };

    const handleDeleteUser = () => {
        userDelete(user.id);
    };

    const handleDeleteRocket = () => {
        rocketDelete(rocket.Id);
    };

    const handleDeletePlanet = () => {
        planetDelete(planet.Id);
    };

    const handleDeleteExpedition = () => {
        expeditionDelete(expendition.id);
    };

    const handleDeleteTickets = () => {
        ticketDelete(ticket.Id);
    };

    useEffect(() => {
        async function fetchPlanetData() {
            try {
                const url = `${baseUrl}/lookups/planets`;
                const data = await fetchPlanetsGet(url);
                setPlanetData(data);
            } catch (error) {
                console.error('API talebi başarısız oldu: ', error);
            }
        }
        fetchPlanetData();
    }, []);

    useEffect(() => {
        async function fetchRocketData() {
            try {
                const url = `${baseUrl}/lookups/space-vehicles`;
                const data = await fetchRocketsGet(url);
                setSpaceVehicleData(data);
            } catch (error) {
                console.error('API talebi başarısız oldu: ', error);
            }
        }
        fetchRocketData();
    }, []);

    const getPageContent = () => {
        switch (pageType) {
            case 'spaceShips':
                return (
                    <Space direction="vertical">
                        <div className='modalistBody'>
                            <Input
                                value={editRocket.Name}
                                onChange={(e) => setEditRocket({ ...editRocket, Name: e.target.value })}
                                placeholder='Araç Adı'
                                name="Name"
                            />
                            <Input
                                value={editRocket.ModelName}
                                onChange={(e) => setEditRocket({ ...editRocket, ModelName: e.target.value })}
                                placeholder='Model Yılı'
                                name="ModelName"
                            />
                            <Input
                                value={editRocket.ModelYear}
                                onChange={(e) => setEditRocket({ ...editRocket, ModelYear: e.target.value })}
                                placeholder='Model Adı'
                                name="ModelYear"
                            />
                            <Input
                                value={editRocket.SerialNumber}
                                onChange={(e) => setEditRocket({ ...editRocket, SerialNumber: e.target.value })}
                                placeholder='Seri Numarası'
                                name="SerialNumber"
                            />
                            <Input
                                value={editRocket.Description}
                                onChange={(e) => setEditRocket({ ...editRocket, Description: e.target.value })}
                                placeholder='Açıklama'
                                name="Description"
                            />
                            <Input
                                value={editRocket.MaxNumberOfPassengers}
                                onChange={(e) => setEditRocket({ ...editRocket, MaxNumberOfPassengers: e.target.value })}
                                placeholder='Koltuk Numarası'
                                name="MaxNumberOfPassengers"
                            />
                            <Input
                                value={editRocket.AgeLimit}
                                onChange={(e) => setEditRocket({ ...editRocket, AgeLimit: e.target.value })}
                                placeholder='Yaş Sınırı'
                                name="AgeLimit"
                            />
                        </div>
                    </Space>
                );
            case 'users':
                return (
                    <Space direction="vertical">
                        <div className='modalistBody'>
                            <Input
                                placeholder='İsim'
                                name="name"
                                value={editedData.name}
                                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                            />
                            <Input
                                placeholder='Soyisim'
                                name="surname"
                                value={editedData.surname}
                                onChange={(e) => setEditedData({ ...editedData, surname: e.target.value })}
                            />
                            <Input
                                placeholder='E-Posta Adresi'
                                name="emailAddress"
                                value={editedData.EmailAddress}
                                onChange={(e) => setEditedData({ ...editedData, EmailAddress: e.target.value })}
                            />
                            <Input
                                placeholder='Telefon Numarası'
                                name="phoneNumber"
                                value={editedData.PhoneNumber}
                                onChange={(e) => setEditedData({ ...editedData, PhoneNumber: e.target.value })}
                            />
                            <Input
                                placeholder='Kullanıcı Adı'
                                name="username"
                                value={editedData.username}
                                onChange={(e) => setEditedData({ ...editedData, username: e.target.value })}
                            />
                            <Input
                                placeholder='Şifre'
                                name="password"
                                value={editedData.password}
                                onChange={(e) => setEditedData({ ...editedData, password: e.target.value })}
                            />
                            <Select
                                value={editedData.userRole || undefined}
                                onChange={handleUserRoleChange}
                                placeholder="Rol"
                            >
                                {Object.values(UserRole).map((role) => (
                                    <Select.Option key={role} value={role}>
                                        {role === UserRole.ADMIN ? "Admin" : role === UserRole.CUSTOMER ? "Customer" : " "}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                    </Space>
                );
            case 'planets':
                return (
                    <Space direction="vertical">
                        <div className='modalistBody'>
                            <Input
                                onChange={(e) => setEditPlanet({ ...editPlanet, Name: e.target.value })} 
                                value={editPlanet.Name} 
                                placeholder='Gezegen Adı'
                                name="Name"
                            />
                            <Input
                                onChange={(e) => setEditPlanet({ ...editPlanet, Sequence: e.target.value })} 
                                value={editPlanet.Sequence} 
                                placeholder='Sıra' 
                                name="Sequence"
                            />
                            <Input
                                onChange={(e) => setEditPlanet({ ...editPlanet, DifficultyLevel: e.target.value })} 
                                value={editPlanet.DifficultyLevel} 
                                placeholder='Zorluk Seviyesi' 
                                name="DifficultyLevel"
                            />
                            <Input
                                onChange={(e) => setEditPlanet({ ...editPlanet, ImageUrl: e.target.value })} 
                                value={editPlanet.ImageUrl} 
                                placeholder='Resim Url' 
                                name="ImageUrl"
                            />
                            <Input
                                onChange={(e) => setEditPlanet({ ...editPlanet, DetailsImageUrl: e.target.value })} 
                                value={editPlanet.DetailsImageUrl} 
                                placeholder='Detaylı Resim Url' 
                                name="DetailsImageUrl"
                            />
                            <Input
                                onChange={(e) => setEditPlanet({ ...editPlanet, Description: e.target.value })} 
                                value={editPlanet.Description} 
                                placeholder='Açıklama' 
                                name="Description"
                            />
                            <Input
                                onChange={(e) => setEditPlanet({ ...editPlanet, summaryDescription: e.target.value })} 
                                value={editPlanet.summaryDescription} 
                                placeholder='Detaylı Açıklama' 
                                name="summaryDescription"
                            />
                        </div>
                    </Space>
                );
            case 'expedition':
                return (
                    <Space direction="vertical">
                        <div className='modalistBody'>
                            <Input
                                onChange={(e) => setEditExpedition({ ...editExpedition, name: e.target.value })}
                                value={editExpedition.name}
                                placeholder='Sefer Adı'
                                name="name"
                            />
                            <Input
                                onChange={(e) => setEditExpedition({ ...editExpedition, expeditionDate: e.target.value })}
                                value={editExpedition.expeditionDate}
                                placeholder='Sefer Tarihi'
                                name="expeditionDate"
                            />
                            <Input
                                onChange={(e) => setEditExpedition({ ...editExpedition, arrivalDate: e.target.value })}
                                value={editExpedition.arrivalDate}
                                placeholder='Varış Tarihi'
                                name="arrivalDate"
                            />
                            <Select
                                value={editExpedition.ticketPrice}
                                onChange={(value) => setEditExpedition({ ...editExpedition, ticketPrice: value })}
                                placeholder="Bilet Fiyatı"
                                options={priceOptions}
                            />
                            <Select
                                onChange={handleSelectSpaceVehicle}
                                value={spaceVehicleId}
                                placeholder='Uzay Aracı'
                                name="spaceVehicleId"
                            >
                                {spaceVehicleData.map(vehicle => (
                                    <Select.Option key={vehicle.id} value={vehicle.id}>
                                        {vehicle.displayName}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Select
                                onChange={handleSelectDeparturePlanet}
                                value={departurePlanetId}
                                placeholder='Kalkış Gezegeni'
                                name="departurePlanetId"
                            >
                                {planetData.map(planet => (
                                    <Select.Option key={planet.id} value={planet.id}>
                                        {planet.displayName}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Select
                                placeholder="Varış Gezegeni"
                                onChange={handleSelectArrivalPlanet}
                                value={arrivalPlanetId}
                                name="arrivalPlanetId"
                            >
                                {planetData.map(planet => (
                                    <Select.Option key={planet.id} value={planet.id}>
                                        {planet.displayName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                    </Space>
                );
            case 'ticketAdmin':
                return (
                    <Space direction="vertical">
                        <div className='modalistBody'>
                            <Input
                                onChange={(e) => setEditTicket({ ...editTicket, CreatedDate: e.target.value })}
                                value={editTicket.CreatedDate}
                                placeholder='Oluşturma Tarihi'
                                name="CreatedDate"
                            />
                            <Input
                                onChange={(e) => setEditTicket({ ...editTicket, ExpeditionId: e.target.value })}
                                value={editTicket.ExpeditionId}
                                placeholder='Sefer Id'
                                name="ExpeditionId"
                            />
                            <Select
                                value={editTicket.SeatNumber}
                                onChange={(value) => setEditTicket({ ...editTicket, SeatNumber: value })}
                                placeholder="Koltuk Numarası"
                                name="SeatNumber"
                                options={ageLimitOptions}
                            />
                        </div>
                    </Space>
                );
            default:
                return null;
        }
    };

    return (
        <div className='editUserModelContainer'>
            <Modal
                className='modalComponent'
                title={addEditTitle}
                visible={visible}
                onOk={handleSave}
                onCancel={onCancel}
                footer={[
                    <div className='editButtonContainer'>
                        <Button className='editDeleteButton' key="delete" type="danger" onClick={
                            pageType === 'users' ? handleDeleteUser :
                                pageType === 'spaceShips' ? handleDeleteRocket :
                                    pageType === 'planets' ? handleDeletePlanet :
                                        pageType === 'expedition' ? handleDeleteExpedition :
                                            pageType === 'ticketAdmin' ? handleDeleteTickets : null
                        }>
                            Delete
                        </Button>
                        <div>
                            <Button className='editSaveButton' key="save" type="primary" onClick={handleSave}>
                                Save
                            </Button>
                            <Button className='editCancelButton' key="cancel" onClick={onCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                ]}
            >
                {getPageContent()}
                {errorText && <div className='addModalErrorContainer'>{errorText}</div>}
            </Modal>
        </div>
    );
}
import './ModalComponent.css';
import React, { useEffect, useState } from 'react';
import { Space, Input, Button, Modal, Select } from 'antd';
import { AiOutlineSave } from 'react-icons/ai';
import { fetchRocketsGet, fetchRocketsPost } from '../../services/RocketService';
import { fetchPlanetsGet, fetchPlanetsPost } from '../../services/PlanetService';
import { fetchExpeditionPost } from '../../services/ExpeditionService';
import { fetchUsersPost } from '../../services/userService';
import APImanager from '../../apiManager';

export function ModelComponent({ isModalVisible, onCancel, modalContent, addTitle }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [spaceVehicleData, setSpaceVehicleData] = useState([]);
    const [planetData, setPlanetData] = useState([]);
    const baseUrl = APImanager.getBaseURL();

    const [selectedSpaceVehicle, setSelectedSpaceVehicle] = useState("Uzay Araçları");
    const [selectedDeparturePlanet, setSelectedDeparturePlanet] = useState("Kalkış Gezegeni");
    const [selectedArrivalPlanet, setSelectedArrivalPlanet] = useState("Varış Gezegeni");

    const handleUserRoleChange = (value) => {
        SetValuesUsers((prev) => ({ ...prev, userRole: value }));
    };

    const UserRole = {
        ADMIN: 1,
        CUSTOMER: 2,
    };

    const [valuesRockets, setValuesRockets] = useState({
        name: "",
        modelYear: "",
        modelName: "",
        serialNumber: "",
        description: "",
        maxNumberOfPassengers: "",
        ageLimit: ""
    });

    const [valuesUsers, SetValuesUsers] = useState({
        name: "",
        surname: "",
        emailAddress: "",
        phoneNumber: "",
        username: "",
        isActive: true,
        password: "",
        userRole: ""
    });

    const [valuesPlanets, SetValuesPlanets] = useState({
        name: "",
        sequence: "",
        difficultyLevel: "",
        imageUrl: "",
        detailsImageUrl: "",
        description: "",
        summaryDescription: ""
    });

    const [valuesExpeditions, SetValuesExpeditions] = useState({
        name: "",
        expeditionDate: "",
        arrivalDate: "",
        ticketPrice: "",
        spaceVehicleId: "",
        departurePlanetId: "",
        arrivalPlanetId: ""
    });

    const handleSelectSpaceVehicle = (value) => {
        setSelectedSpaceVehicle(value);
    };

    const handleSelectDeparturePlanet = (value) => {
        setSelectedDeparturePlanet(value);
    };

    const handleSelectArrivalPlanet = (value) => {
        setSelectedArrivalPlanet(value);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name) {
            setValuesRockets((prev) => ({ ...prev, [name]: value }));
            SetValuesUsers((prev) => ({ ...prev, [name]: value }));
            SetValuesPlanets((prev) => ({ ...prev, [name]: value }));
            SetValuesExpeditions((prev) => ({ ...prev, [name]: value }));
        } else {
            if (modalContent === 'expedition') {
                if (e.target.name === 'spaceVehicleId') {
                    SetValuesExpeditions((prev) => ({ ...prev, spaceVehicleId: e }));
                } else if (e.target.name === 'departurePlanetId') {
                    SetValuesExpeditions((prev) => ({ ...prev, departurePlanetId: e }));
                } else if (e.target.name === 'arrivalPlanetId') {
                    SetValuesExpeditions((prev) => ({ ...prev, arrivalPlanetId: e }));
                }
            }
        }
    };

    const handleOk = async () => {
        if (modalContent === 'spaceShips') {
            rocketPost();
        }
        if (modalContent === 'users') {
            usersPost();
        }
        if (modalContent === 'planets') {
            planetsPost();
        }
        if (modalContent === 'expedition') {
            expeditionsPost();
        }
        setTimeout(() => {
            setErrorMessage(null);
        }, 3000);
    };

    /* ROCKET */
    const rocketPost = async () => {
        const requiredFields = [
            "name",
            "modelName",
            "modelYear",
            "serialNumber",
            "description",
            "maxNumberOfPassengers",
            "ageLimit"
        ];
        const errors = {};
        requiredFields.forEach(field => {
            if (!valuesRockets[field]) {
                errors[field] = `Lütfen ${field} alanını doldurun.`;
            }
        });
        if (Object.keys(errors).length > 0) {
            for (const field in errors) {
                setErrorMessage(errors[field]);
            }
        } else {
            const url = `${baseUrl}/space-vehicles`;
            try {
                const data = await fetchRocketsPost(valuesRockets, url);
                console.log(data);
            } catch (error) {
                console.error("Hata:", error);
            }
        }
    };

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
    /* ROCKET */

    /* USERS */
    const usersPost = async () => {
        let hasError = false;

        if (!valuesUsers.name) {
            setErrorMessage("Lütfen isim alanını doldurun.");
            hasError = true;
        }

        if (!valuesUsers.surname) {
            setErrorMessage("Lütfen soyisim alanını doldurun.");
            hasError = true;
        }

        if (!valuesUsers.emailAddress) {
            setErrorMessage("Lütfen e-posta adresi alanını doldurun.");
            hasError = true;
        }

        if (!valuesUsers.phoneNumber) {
            setErrorMessage("Lütfen telefon numarası alanını doldurun.");
            hasError = true;
        }

        if (valuesUsers.phoneNumber.length < 11) {
            setErrorMessage("Telefon numarası 11 karakterden az olamaz.");
            hasError = true;
        }

        if (!valuesUsers.username) {
            setErrorMessage("Lütfen kullanıcı adı alanını doldurun.");
            hasError = true;
        }

        if (!valuesUsers.password) {
            setErrorMessage("Lütfen şifre alanını doldurun.");
            hasError = true;
        }

        if (!valuesUsers.userRole) {
            setErrorMessage("Lütfen role alanını doldurun.");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        const url = `${baseUrl}/users`;
        try {
            const data = await fetchUsersPost(valuesUsers, url);
            console.log(data);
        } catch (error) {
            console.error("Hata:", error);
        }
    };
    /* USERS */

    /* PLANET */
    const planetsPost = async () => {
        const requiredFields = [
            "name",
            "sequence",
            "difficultyLevel",
            "imageUrl",
            "detailsImageUrl",
            "description",
            "summaryDescription"
        ];
        const errors = {};
        requiredFields.forEach(field => {
            if (!valuesPlanets[field]) {
                errors[field] = `Lütfen ${field} alanını doldurun.`;
            }
        });
        if (Object.keys(errors).length > 0) {
            for (const field in errors) {
                setErrorMessage(errors[field]);
            }
        } else {
            const url = `${baseUrl}/planets`;
            try {
                const data = await fetchPlanetsPost(valuesPlanets, url);
                console.log(data);
            } catch (error) {
                console.error("Error:", error);
            }
        }
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
    /* PLANET */

    /* EXPEDITION */
    const expeditionsPost = async () => {
        const url = `${baseUrl}/expenditions`;
        const formattedExpeditionDate = new Date(valuesExpeditions.expeditionDate).toISOString();
        const formattedArrivalDate = new Date(valuesExpeditions.arrivalDate).toISOString();

        valuesExpeditions.spaceVehicleId = selectedSpaceVehicle;
        valuesExpeditions.departurePlanetId = selectedDeparturePlanet;
        valuesExpeditions.arrivalPlanetId = selectedArrivalPlanet;

        valuesExpeditions.expeditionDate = formattedExpeditionDate;
        valuesExpeditions.arrivalDate = formattedArrivalDate;

        try {
            const data = await fetchExpeditionPost(valuesExpeditions, url);
            console.log(data);
        } catch (error) {
            console.error("Hata:", error);
        }
    };
    /* EXPEDITION */

    const contentMap = {
        spaceShips: (
            <Space direction="vertical">
                <div className='modalistBody'>
                    <Input
                        value={valuesRockets.name}
                        onChange={handleInput}
                        placeholder='Araç Adı'
                        name="name"
                    />
                    <Input
                        value={valuesRockets.modelName}
                        onChange={handleInput}
                        placeholder='Model Adı'
                        name="modelName"
                    />
                    <Input
                        value={valuesRockets.modelYear}
                        onChange={handleInput}
                        placeholder='Model Yılı'
                        name="modelYear"
                    />
                    <Input
                        value={valuesRockets.serialNumber}
                        onChange={handleInput}
                        placeholder='Seri Numarası'
                        name="serialNumber"
                    />
                    <Input
                        value={valuesRockets.description}
                        onChange={handleInput}
                        placeholder='Açıklama'
                        name="description"
                    />
                    <Input
                        value={valuesRockets.maxNumberOfPassengers}
                        onChange={handleInput}
                        placeholder='Koltuk Numarası'
                        name="maxNumberOfPassengers"
                    />
                    <Input
                        value={valuesRockets.ageLimit}
                        onChange={handleInput}
                        placeholder='Yaş Sınırı'
                        name="ageLimit"
                    />
                </div>
            </Space>
        ),
        users: (
            <Space direction="vertical">
                <div className='modalistBody'>
                    <Input
                        onChange={handleInput}
                        value={valuesUsers.name}
                        placeholder='İsim'
                        name="name"
                    />
                    <Input
                        onChange={handleInput}
                        value={valuesUsers.surname}
                        placeholder='Soyisim'
                        name="surname"
                    />
                    <Input
                        onChange={handleInput}
                        value={valuesUsers.emailAddress}
                        placeholder='E-Posta Address'
                        name="emailAddress"
                    />
                    <Input
                        onChange={handleInput}
                        value={valuesUsers.phoneNumber}
                        placeholder='Telefon Numarası'
                        name="phoneNumber"
                    />
                    <Input
                        onChange={handleInput}
                        value={valuesUsers.username}
                        placeholder='Kullanıcı Adı'
                        name="username"
                    />
                    <Input.Password
                        onChange={handleInput}
                        value={valuesUsers.password}
                        placeholder='Şifre'
                        name="password"
                    />
                    <Select
                        defaultValue={valuesUsers.userRole}
                        onChange={handleUserRoleChange}
                        placeholder="Rol"
                    >
                        {Object.values(UserRole).map(role => (
                            <Select.Option key={role} value={role}>
                                {role === UserRole.ADMIN ? "Admin" : role === UserRole.CUSTOMER ? "Customer" : ""}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </Space>
        ),
        planets: (
            <Space direction="vertical">
                <div className='modalistBody'>
                    <Input
                        onChange={handleInput}
                        value={valuesPlanets.name}
                        placeholder='Gezegen Adı'
                        name="name"
                    />
                    <Input
                        onChange={handleInput}
                        value={valuesPlanets.sequence}
                        placeholder='Sıra'
                        name="sequence"
                    />
                    <Input
                        onChange={handleInput}
                        value={valuesPlanets.difficultyLevel}
                        placeholder='Zorluk Seviyesi'
                        name="difficultyLevel"
                    />
                    <Input
                        onChange={handleInput}
                        value={valuesPlanets.imageUrl}
                        placeholder='Resim URL'
                        name="imageUrl"
                    />
                    <Input
                        onChange={handleInput}
                        value={valuesPlanets.detailsImageUrl}
                        placeholder='Detaylı Resim Url'
                        name="detailsImageUrl"
                    />
                    <Input
                        onChange={handleInput}
                        value={valuesPlanets.description}
                        placeholder='Açıklama'
                        name="description"
                    />
                    <Input
                        onChange={handleInput}
                        value={valuesPlanets.summaryDescription}
                        placeholder='Detaylı Açıklama'
                        name="summaryDescription"
                    />
                </div>
            </Space>
        ),
        expedition: (
            <Space direction="vertical">
                <div className='modalistBody'>
                    <Input
                        onChange={handleInput}
                        value={valuesExpeditions.name}
                        placeholder='Sefer Adı'
                        name="name"
                    />
                    <Input
                        onChange={handleInput}
                        value={valuesExpeditions.expeditionDate}
                        placeholder='Kalkış Tarihi'
                        name="expeditionDate"
                    />
                    <Input
                        onChange={handleInput}
                        value={valuesExpeditions.arrivalDate}
                        placeholder='Varış Tarihi'
                        name="arrivalDate"
                    />
                    <Input
                        onChange={handleInput}
                        value={valuesExpeditions.ticketPrice}
                        placeholder='Bilet Fiyatı'
                        name="ticketPrice"
                    />
                    <Select
                        onChange={handleSelectSpaceVehicle}
                        value={selectedSpaceVehicle}
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
                        value={selectedDeparturePlanet}
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
                        value={selectedArrivalPlanet}
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
        )
    };

    return (
        <div className='modalCompContainer'>
            <Modal
                className='modalComponent'
                visible={isModalVisible}
                title={addTitle}
                onOk={handleOk}
                onCancel={onCancel}
                footer={[
                    <Button style={{ backgroundColor: "#7465F2" }} onClick={handleOk} type='primary' text="Kaydet" key="submit">
                        <AiOutlineSave style={{ color: "white" }} />
                        Kaydet
                    </Button>
                ]}
            >
                <div id='modalBody'>
                    {contentMap[modalContent]}
                    {errorMessage && (
                        <div className='addModalErrorContainer'>
                            {errorMessage}
                        </div>
                    )}
                </div>
            </Modal>
        </div >
    )
}
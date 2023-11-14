import React, { useEffect, useState } from 'react'
import "./TicketAdmin.css";
import { checkToken } from '../../services/authService';
import { TableListComp } from "../../components/TableListComp/TableListComp"
import EditModal from '../../components/EditModal/EditUserModal';
import { RiArrowRightSLine } from 'react-icons/ri';
import { deleteTicket, fetchTicketsGet } from '../../services/TicketService';
import APImanager from '../../apiManager';
import buildQuery from 'odata-query';
import { Button, DatePicker, Input } from 'antd';

export default function TicketAdmin() {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [ticketSalesData, setTicketSalesData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageOdata, setPageOdata] = useState(1);
    const [pageSizeOdata, setPageSizeOdata] = useState(10);

    const [seatNumber, setSeatNumber] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [ticketAdminFilter, setTicketAdminFilter] = useState([]);
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
            title: 'OLUŞTURMA TARİHİ',
            dataIndex: 'CreatedDate',
            key: 'CreatedDate',
            render: (expeditionDate, record) => formatDate(expeditionDate)
        },
        {
            title: 'SEFER ID',
            dataIndex: 'ExpeditionId',
            key: 'ExpeditionId',
        },
        {
            title: 'SİPARİŞ TARİHİ',
            dataIndex: 'OrderDate',
            key: 'OrderDate',
            render: (expeditionDate, record) => formatDate(expeditionDate)
        },
        {
            title: 'KOLTUK NUMARASI',
            key: 'SeatNumber',
            dataIndex: 'SeatNumber',
        },
    ];

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        handleFilterButtonClick();
    }, [pageOdata, pageSizeOdata]);

    const handleDeleteTicket = (Id) => {
        const confirmDelete = window.confirm('Kullanıcıyı silmek istediğine emin misin?');
        if (!confirmDelete) {
            return;
        }
        deleteTicket(Id)
            .then(() => {
                setTicketSalesData((prevSpaceShipData) =>
                    prevSpaceShipData.filter((ticket) => ticket.Id !== Id)
                );
            })
            .catch(error => {
                console.error('Delete request failed:', error);
            });
    };

    const handleEditRocket = (Id) => {
        const ticketEdit = ticketSalesData.find(ticket => ticket.Id === Id);
        setSelectedTicket(ticketEdit);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedTicket(null);
        setIsModalOpen(false);
    };

    const onChangeCreationDate = (date, dateString) => {
        setCreationDate(dateString);
    };

    const onChangeOrderDate = (date, dateString) => {
        setOrderDate(dateString);
    };

    async function handleFilterButtonClick() {
        const SeatNumber = parseInt(seatNumber);
        const CreatedDate = creationDate ? new Date(creationDate).toISOString() : null;
        const OrderDate = orderDate ? new Date(orderDate).toISOString() : null;

        const count = true;
        const top = pageSizeOdata;
        const skip = (pageOdata - 1) * pageSizeOdata;

        const filters = {};
        if (SeatNumber) {

            filters.SeatNumber = SeatNumber;
        }
        if (CreatedDate) {
            filters.CreatedDate = { ge: CreatedDate };
        }
        if (OrderDate) {
            filters.OrderDate = { ge: OrderDate };
        }
        const queryWithPaging = buildQuery({ filter: filters, count, top, skip });
        const url = `${baseUrl}/ticket-sales${queryWithPaging}`;
        const data = await fetchTicketsGet(url)
            .catch(err => {
                console.log("API request failed", err);
            })
        const totalPageCount = Math.ceil(data["@odata.count"]);
        setTotalPageCount(totalPageCount);
        setTicketAdminFilter(data.value);
    };

    return (
        <container className='spaceVehicleContainer'>
            <div className='searchBarTicketsContainer'>
                <div className='searchBarTitle'>
                    <h1>Bilet Filtrele</h1>
                </div>
                <div className='searchBarTicketSelectContainer'>
                    <div className='SelectRolePosition'>
                        <DatePicker onChange={onChangeCreationDate} placeholder='Oluşturma Tarihi' />
                    </div>
                    <div className='SelectRolePosition'>
                        <DatePicker onChange={onChangeOrderDate} placeholder='Sipariş Tarihi' />
                    </div>
                    <div className='SelectRolePosition'>
                        <Input
                            className='SearchBarSpaceShipsInput'
                            value={seatNumber}
                            onChange={(e) => setSeatNumber(e.target.value)}
                            placeholder="Koltuk Numarası"
                        />
                    </div>
                    <Button className='SearchBarFilterBtn' onClick={handleFilterButtonClick}>Filtrele</Button>
                </div>
            </div>
            <article className='spaceVehicleBody'>
                <TableListComp props={{ columns: columns, dataSource: ticketAdminFilter.length ? ticketAdminFilter : ticketSalesData }} text="Ticket" pageSearchType={"ticketAdmin"} addFilterName={"Bilet Filtreleme"} setPageOdata={setPageOdata} setPageSizeOdata={setPageSizeOdata} pageOdata={pageOdata} pageSizeOdata={pageSizeOdata} totalPageCount={totalPageCount} />
                {isModalOpen && (
                    <EditModal ticket={selectedTicket} onCancel={handleModalClose} visible={isModalOpen} pageType={"ticketAdmin"} addEditTitle={"Bilet Güncelleme"} ticketDelete={handleDeleteTicket} />
                )}
            </article>
        </container>
    )
}
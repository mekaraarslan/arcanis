import React, { useState } from 'react';
import './TableListComp.css';
import { Input, Button, Table } from 'antd';
import { ModelComponent } from '../ModalComponent/ModalComponent';

export function TableListComp({ pageSearchType, props, addButtonLabel, setPageOdata, setPageSizeOdata, pageOdata, pageSizeOdata, totalPageCount }) {

    const [modelContent, setModelContent] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModall = (content) => {
        setIsModalVisible(true);
        setModelContent(content);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const modalTitle =
        pageSearchType === 'spaceShips'
            ? 'Uzay Aracı Ekle'
            : pageSearchType === 'users'
                ? 'Kullanıcı Ekle'
                : pageSearchType === 'planets'
                    ? 'Gezegen Ekle'
                    : pageSearchType === 'expedition'
                        ? 'Sefer Ekle'
                        : pageSearchType === 'ticketAdmin'
                            ? 'Yeni Bilet Ekle'
                            : '';

    return (
        <div className='listCompContainer'>
            <div className="listContainer">
                <div className='tableListHead'>
                    <Button className='addBtn' type="text" onClick={() => showModall(pageSearchType)}>{addButtonLabel}</Button>
                </div>
                <div className='tableContainer'>
                    <Table
                        className='tableListBody'
                        columns={props.columns}
                        dataSource={props.dataSource}
                        rowClassName="tableRow"
                        pagination={{
                            total: totalPageCount,
                            current: pageOdata,
                            pageSize: pageSizeOdata,
                            showSizeChanger : true,
                            onChange: (page, pageSize) => {
                                setPageOdata(page);
                                setPageSizeOdata(pageSize);

                            }
                        }}
                    />
                </div>
                <ModelComponent isModalVisible={isModalVisible} onCancel={handleCancel} modalContent={modelContent} addTitle={modalTitle} />
            </div>
        </div>
    )
}
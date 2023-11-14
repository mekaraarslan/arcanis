import React from 'react';
import './PageButton.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

export function PageButton(props) {

    return (
        <div className='navigate'>
            <ul>
                <li>
                    <Link to={props.to}>
                        <Button type='link' className={props.className} id={props.id} icon={props.icon} size="large" onClick={props.onClick}>
                            <a href={props.href}>{props.text}</a>
                        </Button>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

import React from 'react';
import { Input, Tooltip } from 'antd';
import { AiOutlineInfoCircle, AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import "./AuthInput.css";

export function AuthInputEmail(props) {
    return (
        <Input
            className="ınputRegister"
            name="emailAddress"
            value={props.value}
            onChange={props.onChange}
            type="email"
            placeholder=" E-posta adresi"
            prefix={<AiOutlineMail className="site-form-item-icon"/>}
            suffix={
                <Tooltip title="Extra information">
                    <AiOutlineInfoCircle style={{ color: 'white' }} />
                </Tooltip>
            }
        />
    )
};

export function AuthInputUsername(props) {
    return (
        <Input
            name="username"
            className="ınputRegister"
            value={props.value}
            onChange={props.onChange}
            type="text"
            placeholder={props.placeholder}
            prefix={<AiOutlineUser className="site-form-item-icon" />}
        />
    )
};

export function AuthInputPassword(props) {
    return (
        <Input.Password
            className="ınputRegisterPassword"
            name="password"
            value={props.value}
            onChange={props.onChange}
            type="password"
            placeholder="Şifre"
            prefix={<RiLockPasswordLine />}
        />
    )
};

export function AuthInputName(props) {
    return (
        <Input
            className="ınputRegister"
            name="name"
            value={props.value}
            onChange={props.onChange}
            type="text"
            placeholder="Ad"
            prefix={<AiOutlineUser className="site-form-item-icon" />}
        />
    )
};

export function AuthInputSurname(props) {
    return (
        <Input
            className="ınputRegister"
            name="surname"
            value={props.value}
            onChange={props.onChange}
            type="text"
            placeholder="Soyad"
            prefix={<AiOutlineUser />}
        />
    )
};

export function AuthInputPhoneNumber(props) {
    return (
        <Input
            className="ınputRegister"
            name="phoneNumber"
            value={props.value}
            onChange={props.onChange}
            type="text"
            placeholder="Telefon numarası"
            prefix={<AiOutlinePhone className="site-form-item-icon" />}
        />
    )
};
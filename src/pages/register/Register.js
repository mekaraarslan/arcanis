import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import AuthButton from "../../components/buttonLogin/AuthButton";
import { registerUser } from '../../services/authService';
import { ClipLoader } from 'react-spinners';
import { AuthInputEmail, AuthInputUsername, AuthInputPassword, AuthInputName, AuthInputSurname, AuthInputPhoneNumber } from '../../components/authInput/AuthInput';

export default function Register({ setPageAuthType }) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [values, setValues] = useState({
        name: "",
        surname: "",
        emailAddress: "",
        phoneNumber: "",
        username: "",
        password: ""
    });

    const hideErrorMessage = () => {
        setError(null);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const maskPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let errorMessage = "";

        if (!values.emailAddress) {
            errorMessage = "E-posta adresi boş olamaz.";
        } else if (!values.username) {
            errorMessage = "Kullanıcı adı boş olamaz.";
        } else if (!values.password) {
            errorMessage = "Şifre boş olamaz.";
        } else if (!values.name) {
            errorMessage = "İsim boş olamaz.";
        } else if (!values.surname) {
            errorMessage = "Soyisim boş olamaz.";
        } else if (!values.phoneNumber) {
            errorMessage = "Telefon numarası boş olamaz.";
        }

        if (errorMessage) {
            setError(errorMessage);
            setTimeout(hideErrorMessage, 3000);
        } else {
            const registrationError = await registerUser(values);
            if (registrationError) {
                setError(registrationError);
                setTimeout(hideErrorMessage, 3000);
            } else {
                setSuccessMessage("Kullanıcı kaydınız yapıldı.");
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate("/");
                }, 3000);
            }
        }
        setLoading(false);
    };

    const handleRegisterClick = () => {
        setPageAuthType('authLogin');
    };

    const ErrorMessage = ({ message }) => {
        return <div id="errorMessageRegister"><p>{message}</p></div>;
    };

    return (
        <div className='authRegisterContainer'>
            <div className="userRegisterTitle">
                <h1>Üye Ol</h1>
            </div>
            <form className="inputGroupRegister">
                <AuthInputEmail value={values.emailAddress} onChange={handleInput} />
                <br />
                <AuthInputUsername value={values.username} onChange={handleInput} placeholder="Kullanıcı adı" />
                <br />
                <AuthInputPassword value={values.password} onChange={handleInput} />
                <br />
                <AuthInputName value={values.name} onChange={handleInput} />
                <br />
                <AuthInputSurname value={values.surname} onChange={handleInput} />
                <br />
                <AuthInputPhoneNumber value={maskPhoneNumber(values.phoneNumber)} onChange={handleInput} />
                <br />
                <AuthButton text="Üye Ol" onClick={handleSubmit} />
            </form>
            <div className="errorMessageContainer">
                {error && <ErrorMessage message={error} />}
                {successMessage && <div className="successMessage">{successMessage}</div>}
            </div>
            {loading && <ClipLoader color={"#7465F1"} />}
            <Link onClick={handleRegisterClick} className="accountRegister">
                <a href="authLogin">Zaten bir hesabın var mı?</a>
            </Link>
        </div>
    );
}

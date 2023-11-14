import React, {useState } from "react";
import "./ResetPassword.css";
import { AiOutlineInfoCircle, AiOutlineMail } from "react-icons/ai";
import AuthButton from "../../components/buttonLogin/AuthButton"
import { Input, Tooltip } from "antd";
import { ClipLoader } from 'react-spinners';
import { resetPassword } from '../../services/authService';

export default function App({ setPageAuthType }) {
    const [emailAddress, setEmailAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const hideErrorMessage = () => {
        setError(null);
    };

    const handleResetPassword = async () => {
        if (!emailAddress) {
            setError("Email Boş Olamaz.");
            setTimeout(hideErrorMessage, 3000);
            return;
        }
        try {
            setLoading(true);
            await resetPassword(emailAddress);
            setLoading(false);
            setSuccessMessage("Mail adresinize şifre sıfırlama mesajı gönderildi. Lütfen e-mail adresinizi kontrol edin.");
            setTimeout(() => {
                setSuccessMessage("");
                setPageAuthType('authLogin');
            }, 3000);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const ErrorMessage = ({ message }) => {
        return <div id="error-message-reset"><p>{message}</p></div>;
    };

    return (
        <div className="authResetPasswordContainer">
            <div className="userRecover">
                <h1>Şifre Sıfırlama</h1>
                <span id="description">Şifrenizi unuttunuzmu ?
                    <p>Endişelenmeyin, profilinizi oluşturmak için kullandığınız e-posta adresini girin, size yeni bir profil oluşturma talimatlarını göndereceğiz.</p>
                </span>
            </div>
            <div className="inputGroupRecover">
                <Input
                    className="ınputResetPassword"
                    name="emailAddress"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    type="email"
                    placeholder="E-posta"
                    prefix={<AiOutlineMail className="site-form-item-icon" />}
                    suffix={
                        <Tooltip title="Extra information">
                            <AiOutlineInfoCircle style={{ color: 'white' }} />
                        </Tooltip>
                    }
                />
            </div>
            {loading && <ClipLoader color={"#7465F1"} />}
            {successMessage && <div className="successMessage">{successMessage}</div>}
            {error && <ErrorMessage message={error} />}
            <AuthButton text="GÖNDER" onClick={handleResetPassword} />
        </div>
    );
}
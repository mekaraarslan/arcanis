import { Link } from "react-router-dom";
import "./AuthButton.css";

export default function AuthButton(props) {

    return (
        <div>
            <Link to={props.to} id={props.id} className="authBtn">
                <button onClick={props.onClick} type="submit">{props.text}</button>
            </Link>
        </div>
    )
}


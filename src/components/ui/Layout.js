import { Outlet } from "react-router-dom";
import Header2 from "./Header2";
import "../../assets/scss/Layout.scss"; // Thêm tệp SCSS cho layout

export default function Layout() {
    return (
        <div className="layout-container">
            <Header2 />
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
}

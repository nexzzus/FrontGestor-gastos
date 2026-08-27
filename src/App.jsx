import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ProtectedRoute from "./security/ProtectedRoute.jsx";
import './App.css'
import OAuth2RedirectHandler from "./security/OAuth2RedirectHandler.jsx";
import Register from "./pages/Register.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register/>} />
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/auth/callback"} element={<OAuth2RedirectHandler/>}/>

                <Route element={<ProtectedRoute/>}>
                    <Route path="/home" element={<Home/>}/>
                </Route>

                {/* Ruta por defecto */}
                <Route
                    path="*"
                    element={<Navigate to="/home" replace/>}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App

import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import {Route, Routes} from "react-router";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import React from "react";
import NotFoundPage from "./pages/NotFoundPage";

function App({content}) {
    return (
        <>
            <Header/>
            {content}
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path="/reservations" element={<BookingPage/>}/>
                <Route path="/*" element={<NotFoundPage />}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;

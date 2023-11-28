import React from 'react';
import { NavLink } from 'react-router-dom';

export const WatchList = () => {
    return (
        <header>
            <div className="container">
                <div className="inner-content">
                    <NavLink to="/WatchListPage"> WatchList </NavLink>
                </div>

                <ul className="nav-links">
                    <li>
                        <NavLink to="/watched"> Watched </NavLink>
                    </li>
=
                    <li>
                        <NavLink to="/add" className="addBtn">+ Add </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}
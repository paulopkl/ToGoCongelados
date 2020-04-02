import React from 'react';

import Header from '../Header/Header';

import './Main.css';

export default function Main(props) {
    return(
        <React.Fragment>
            <Header {...props} />
            <main className="content container-fluid">
                <div className="p-3 mt-3">
                    {props.children} {/* Tudo que é filho */}
                </div>
            </main>
        </React.Fragment>
    )
}
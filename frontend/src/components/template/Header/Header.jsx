import React from 'react';

import './Header.css';

export default function Header(props) {
    return (
        <header className="header d-none d-sm-flex">
            <div className="d-flex title">
                <h1 className="mt-1">
                    <i className={`${props.iconPrefix}${props.iconSufix}`}></i> {props.title}
                </h1>
                <p className="lead text-muted ml-3">{props.subtitle}</p>
            </div>
            <div className="midias">
                <button className="btn btn-outline-success">
                    <i className="fa fa-whatsapp wpp-icone" aria-hidden="true"></i>
                    <span>Whatsapp</span>
                </button>
                <button className="btn btn-outline-primary">
                    <i className="fa fa-facebook-square face-icone" aria-hidden="true"></i>
                    <span>Facebook</span>
                </button>
                <button className="btn btn-outline-info">
                    <i className="fa fa-twitter twit-icone" aria-hidden="true"></i>
                    <span>Twitter</span>
                </button>
            </div>
        </header>
    )
}   
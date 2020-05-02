import React from 'react';
import Menu from './Menu';
import '../user/styles.css';

// { title } === props.title ok?
// Em vez de ussa {props.title}| Eu uso {title}

const Layout = ({ title = 'Title', description = 'Description', classe, children }) => (
    <div>
        <Menu />
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={classe}>{children}</div>
    </div>
);

export default Layout;
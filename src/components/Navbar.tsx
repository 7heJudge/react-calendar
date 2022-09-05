import {Layout, Menu, Row} from "antd";
import React from 'react';
import {useNavigate} from "react-router-dom";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {RouteNames} from "../routes/constants";

const Navbar = () => {
    const navigate = useNavigate();

    const {logout} = useActions();

    const {isAuth, user} = useTypedSelector(state => state.auth);

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth ?
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <div style={{color: 'white'}}>{user.username}</div>
                        <Menu.Item onClick={logout}>Logout</Menu.Item>
                    </Menu> :
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item onClick={() => navigate(RouteNames.LOGIN)}>Login+</Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;

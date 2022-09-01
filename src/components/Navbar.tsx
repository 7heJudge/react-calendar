import {Layout, Menu, Row} from "antd";
import React from 'react';

const Navbar = () => {
    return (
        <Layout.Header>
            <Row justify="end">
                <Menu theme="dark" mode="horizontal">
                    {/*<Menu.Item key={1}>Login</Menu.Item>*/}
                </Menu>
            </Row>
        </Layout.Header>
    );
};

export default Navbar;

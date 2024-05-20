import React, {useContext} from 'react';
import { Context } from '../index';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from '../utils/consts';
import Button from 'react-bootstrap/Button';
import {observer} from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { Image } from 'react-bootstrap';
import shoplogo from '../assets/shoplogo.png'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
      localStorage.removeItem('token')
      user.setUser({})
      user.setIsAuth(false)
      user.setIsAdmin(false)
      history.push(LOGIN_ROUTE)

    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>
              <Image src={shoplogo}/>
            </NavLink>
            {user.isAuth ?
              user.isAdmin ?
                <Nav className="ms-auto" style={{color: 'white'}}>
                <Button
                    variant={"outline-light"}
                    className="ms-2"
                    onClick={() => history.push(BASKET_ROUTE)}
                  >
                    Корзина
                  </Button>
                  <Button 
                    variant={"outline-light"}
                    className="ms-2"
                    onClick={() => history.push(ADMIN_ROUTE)}
                  >
                    Админ панель
                  </Button>
                  <Button 
                    variant={"outline-light"} 
                    onClick={() => logOut()} 
                    className="ms-2" 
                  >
                    Выйти
                  </Button>
                  
                </Nav>
              :
              <Nav className="ms-auto" style={{color: 'white'}}>
                <Button
                  variant={"outline-light"}
                  className="ms-2"
                  onClick={() => history.push(BASKET_ROUTE)}
                >
                  Корзина
                </Button>
                <Button 
                  variant={"outline-light"} 
                  onClick={() => logOut()} 
                  className="ms-2" 
                >
                  Выйти
                </Button>
              </Nav>
                
            :
              <Nav className="ms-auto" style={{color: 'white'}}>
                <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
              </Nav>
            }
          </Container>
        </Navbar>
    );
});

export default NavBar;
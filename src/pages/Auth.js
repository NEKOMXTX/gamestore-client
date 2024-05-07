import React, { useContext, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import { NavLink, useLocation, useHistory  } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { registration, login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
            if (email === "testuser@gmail.com"){
                user.setIsAdmin(true)
            }
        } catch (e) {
            alert(e.response.data.message)
        }
        
    }
    
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form>
                    <Form.Group className="mt-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Введите ваш email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mt-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Введите ваш пароль..." 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between mt-3">
                        {isLogin ?

                            <Form.Text>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </Form.Text>
                            :
                            <Form.Text>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </Form.Text>
                        }
                        <Button variant="outline-success" onClick={click}>
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </div>

                </Form>
            </Card>

        </Container>
    );
});

export default Auth;
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { getBasket } from '../http/productAPI';

import { Card, Col, Container, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';

//import close from '../assets/close.svg'

const Basket = observer(() => {
    const {product} = useContext(Context)

    useEffect(() => {
        getBasket().then(data => product.setBaskets(data))
    }, [])

    let totalBasketpric = 0;
    {product.basket.map(price =>
        totalBasketpric += Number(price.product.price)
    )}
    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pb-2">Корзина</h1>



            {/* ------- Считаем общую сумму ------- */}

            <Card className="d-flex flex-row  p-2 justify-content-between align-items-center mb-2">
                <h1 className="pr-2">Итого:</h1>
                <h3 className="pl-2">{totalBasketpric}<span className="font-weight-light pl-2">рублей</span></h3>
            </Card>



            {product.basket.map(product =>
                <Card className="d-flex w-100 p-2 justify-content-center mb-2" key={product.id}>
                    <Row className="d-flex w-100">
                        <Col>
                            <div className="d-flex flex-row align-items-center">
                                <img src={process.env.REACT_APP_API_URL + product.product.img} width={50} />
                                <h1 className="pl-3">{product.product.name}</h1>
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                                <h2 className="font-weight-light">{product.product.price} рублей</h2>
                            </div>
                        </Col>
                    </Row>

                </Card>
            )}
        </Container>
    );
});

export default Basket;
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { getBasket } from '../http/productAPI';

import { Card, Col, Container, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";

//import close from '../assets/close.svg'

const Basket = observer(() => {

    const { product } = useContext(Context)
    useEffect(() => {
        getBasket().then(data => product.setBaskets(data))
    }, [])

    let totalBasketprice = 0;
    {
        product.basket.map(price =>
            totalBasketprice += Number(price.product.price)
        )
    }

    return (
        <section className="h-100" style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol md="10">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                                Корзина
                            </MDBTypography>
                            <div>
                                <p className="mb-0">
                                    <span className="text-muted">Сортировка по:</span>
                                    <a href="#!" className="text-body">
                                        цене <i className="fas fa-angle-down mt-1"></i>
                                    </a>
                                </p>
                            </div>
                        </div>

                        {product.basket.map(product =>
                            <MDBCard className="rounded-3 mb-4">
                                <MDBCardBody className="p-4">
                                    <MDBRow className="justify-content-between align-items-center">
                                        <MDBCol md="2" lg="2" xl="2">
                                            <MDBCardImage className="rounded-3" fluid
                                                src={process.env.REACT_APP_API_URL + product.product.img}
                                                alt="ProductIMG" />
                                        </MDBCol>
                                        <MDBCol md="3" lg="3" xl="3">
                                            <p className="lead fw-normal mb-2">{product.product.name}</p>

                                        </MDBCol>
                                        <MDBCol md="3" lg="3" xl="2"
                                            className="d-flex align-items-center justify-content-around">
                                            <MDBBtn color="link" className="px-2">
                                                <MDBIcon fas icon="minus" />
                                            </MDBBtn>

                                            <MDBInput min={0} defaultValue={1} type="number" size="sm" />

                                            <MDBBtn color="link" className="px-2">
                                                <MDBIcon fas icon="plus" />
                                            </MDBBtn>
                                        </MDBCol>
                                        <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                                            <MDBTypography tag="h5" className="mb-0">
                                                {product.product.price} рублей
                                            </MDBTypography>
                                        </MDBCol>
                                        <MDBCol md="1" lg="1" xl="1" className="text-end">
                                            <a href="#!" className="text-danger">
                                                <MDBIcon fas icon="trash text-danger" size="lg" />
                                            </a>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        )}
                    </MDBCol>
                </MDBRow>
                <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                    <MDBTypography tag="h5" className="mb-0">
                        Итого {totalBasketprice} рублей
                    </MDBTypography>
                </MDBCol>
            </MDBContainer>
        </section>
    );
});

export default Basket;
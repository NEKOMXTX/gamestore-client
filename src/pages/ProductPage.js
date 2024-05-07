import React, {useEffect, useState} from "react";
import { Container, Col, Image, Row, Card, Button } from "react-bootstrap";
import bigStar from "../assets/bigStar.png"
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "../http/productAPI";

const ProductPage = () => {
    // const product = { id: 1, name: 'SQUAD', price: 10, rating: 5, img: 'https://placehold.co/300x300' }
    // const description = [ // модель описания подтягивается из моделей сервера
    //     { id: 1, title: 'Описание', description: 'Описание геймплея и тдОписание геймплея и тдОписание геймплея и тдОписание геймплея и тдОписание геймплея и тдОписание геймплея и тдОписание геймплея и тдОписание геймплея и тдОписание геймплея и тдОписание геймплея и тдОписание геймплея и тдОписание геймплея и тд'},
    // ] 

    const [product, setProduct] = useState({info: []})
    const {id} = useParams()

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + product.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2 style={{ textAlign: 'center'}}>{product.name}</h2>
                        <div
                            style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
                            className="d-flex align-items-center justify-content-center"
                        >
                            {product.rating}
                        </div>
                    </Row>

                </Col>
                <Col md={4}>
                    <Card
                    className="d-flex flex-column align-items-center justify-content-around"
                    style={{width:300, height:300, fontSize: 32, border: '5px solid lightray'}}
                    
                    >
                        <h3>{product.price}</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>

                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                
                {product.info.map(info =>
                    <Row key={info.id}>
                        <h1>{info.title}</h1>{info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default ProductPage;
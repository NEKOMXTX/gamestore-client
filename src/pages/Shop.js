import React, { useContext, useEffect } from "react";
import {Container, Row, Col} from "react-bootstrap";
import GenreBar from "../components/GenreBar";
import MarketplaceBar from "../components/MarketplaceBar";
import ProductList from "../components/ProductList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchGenres, fetchMarketplaces, fetchProducts } from "../http/productAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {product} = useContext(Context)

    useEffect(() => {
        fetchGenres().then(data => product.setGenres(data))
        fetchMarketplaces().then(data => product.setMarketplaces(data))
        fetchProducts(null, null, 1, 3).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        }) // rows из-за пагинации
    }, [])

    useEffect(() => {
        fetchProducts(product.selectedGenre.id, product.selectedMarketplace.id, product.page, product.limit).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        }) // rows из-за пагинации
    }, [product.page, product.selectedGenre, product.selectedMarketpalce])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <GenreBar/>
                </Col>
                <Col md={9}>
                    <MarketplaceBar/>
                    <ProductList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});


export default Shop;
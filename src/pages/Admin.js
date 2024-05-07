import React, {useState} from "react";
import { Container, Button } from "react-bootstrap";
import CreateGenre from "../components/modals.js/CreateGenre";
import CreateMarketPlace from "../components/modals.js/CreateMarketPlace";
import CreateProduct from "../components/modals.js/CreateProduct";

const Admin = () => {
    const [marketPlaceVisible, setMarketPlaceVisible] = useState(false)
    const [genreVisible, setGenreVisible] = useState(false)
    const [productVisible, setProductVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setGenreVisible(true)}

            >
            Добавить жанр
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setMarketPlaceVisible(true)}

            >
            Добавить маркетплейс
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setProductVisible(true)}
            >
            Добавить продукт
            </Button>

            <CreateMarketPlace show={marketPlaceVisible} onHide={() => setMarketPlaceVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
            <CreateGenre show={genreVisible} onHide={() => setGenreVisible(false)}/>
        </Container>
    );
};

export default Admin;
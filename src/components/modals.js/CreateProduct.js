import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap';
import {Context} from "../../index";
import { fetchGenres, fetchMarketplaces, createProduct, fetchProducts } from "../../http/productAPI";
import {observer} from "mobx-react-lite";

const CreateProduct = observer(({show, onHide}) => {
  const {product} = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])
  
  useEffect(() => {
    fetchGenres().then(data => product.setGenres(data))
    fetchMarketplaces().then(data => product.setMarketplaces(data))
}, [])
  
  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }
  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }
  const changeInfo = (key, value, number) => [
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  ]

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addProduct = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('genreId', product.selectedGenre.id)
    formData.append('marketplaceId', product.selectedMarketplace.id)
    formData.append('info', JSON.stringify(info))

    createProduct(formData).then(data => onHide())
  }

  return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новую игру
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>{product.selectedGenre.name || "Выберите жанр"}</Dropdown.Toggle>
              <Dropdown.Menu>
              {product.genres.map(genre =>
                <Dropdown.Item 
                      onClick={() => product.setSelectedGenre(genre)} 
                      key={genre.id}
                >
                      {genre.name}
                </Dropdown.Item>)}                
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>{product.selectedMarketplace.name || "Выберите маркетплейс"}</Dropdown.Toggle>
              <Dropdown.Menu>
              {product.marketplaces.map(marketplace =>
                <Dropdown.Item 
                      onClick={() => product.setSelectedMarketplace(marketplace)} 
                      key={marketplace.id}
                >
                      {marketplace.name}
                </Dropdown.Item>)}                
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}              
              className='mt-3'
              placeholder='Введите название игры'
            />
            <Form.Control
              value={price}
              onChange={e => setPrice(Number(e.target.value))}              
              className='mt-3'
              placeholder='Введите стоимость игры'
              type='number'

            />
            <Form.Control
              className='mt-3'
              type='file'
              onChange={selectFile}

            />
            <hr/>
            <Button
            variant='outline-dark'
            onClick={addInfo}
            >
            Добавить новое свойство

            </Button>
            {
              info.map(i => 
              <Row className='mt-4' key={i.number}>
                <Col md={4}>
                  <Form.Control
                    value={i.title}
                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                    placeholder='Введите название описания'
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    value={i.description}
                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                    placeholder='Введите описание'
                  />
                </Col>
                <Col md={4}>
                  <Button variant='outline-danger' onClick={() => removeInfo(i.number)}>Удалить</Button>
                </Col>
              </Row>
              )
            }
        </Form>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
        <Button variant={'outline-success'} onClick={addProduct}>Добавить</Button>
      </Modal.Footer>
    </Modal>
    );
});

export default CreateProduct;
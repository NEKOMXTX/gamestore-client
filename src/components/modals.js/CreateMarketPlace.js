import React, {useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createMarketplace } from '../../http/productAPI';

const CreateMarketPlace = ({show, onHide}) => {
  const [value, setValue] = useState('')
  
  const addMarketplace = () => {
    createMarketplace({name: value}).then(data => {
      setValue('')
      onHide()
    })
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
          Добавить новый маркетплейс
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={'Введите название маркетплейса'}
            />
        </Form>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
        <Button variant={'outline-success'} onClick={addMarketplace}>Добавить</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default CreateMarketPlace;
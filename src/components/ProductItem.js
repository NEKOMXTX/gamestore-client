import React from 'react';
import { Col, Card, Image } from 'react-bootstrap';
import star from '../assets/star.svg'
import {useHistory} from "react-router-dom"
import { PRODUCT_ROUTE } from '../utils/consts';

const ProductItem = ({product, marketplaces}) => {
    const history = useHistory()
    
    return (
        <Col 
        md={4} 
        className={"mt-3"}
        onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}
        >
            <Card 
            style={{width: 220, cursor: 'pointer'}} 
            border={"light"}
            className='mx-2'
            >
                <Image width={220} height={220} src={process.env.REACT_APP_API_URL + product.img}/>
                <div className='mt-1 text-black-50 d-flex justify-content-between align-items-center'>
                    <div>
                        {marketplaces[product.marketplaceId - 1]}
                    </div>
                    <div className='d-flex align-items-center'>
                        <div>{product.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                
                <div className='mt-1 d-flex justify-content-between align-items-center'>
                    <div>
                        <div>{product.name}</div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <div>{product.price} руб.</div>
                    </div>
                </div>
            </Card>
        </Col>
    );
};
export default ProductItem;
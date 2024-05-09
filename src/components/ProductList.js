import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import {Context} from '../index';
import { Row } from 'react-bootstrap';
import ProductItem from './ProductItem';

const ProductList = observer(() => {
    const {product} = useContext(Context)
    // product.marketplaces.map(marketplace => console.log(marketplace.name)) 
    const marketplaces = product.marketplaces.map(marketplace => marketplace.name)
    return (
        <Row className="d-flex">
            {product.products.map(product => 
              <ProductItem key={product.id} product={product} marketplaces={marketplaces}/>  
            )}
        </Row>
    );
});

export default ProductList;
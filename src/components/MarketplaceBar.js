import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import { Card, Row } from 'react-bootstrap';

const MarketplaceBar = observer(() => {
    const { product } = useContext(Context);
    
    return (
        <Row className='d-flex'>
            {product.marketplaces.map(marketplace =>
                <Card
                    style={{ cursor: 'pointer', width: 'auto' }}
                    key={marketplace.id}
                    className="p-3 me-3"
                    onClick={() => {
                        if (marketplace.id === product.selectedMarketplace.id) {
                            product.setSelectedMarketplace({});
                        } else {
                            product.setSelectedMarketplace(marketplace);
                        };
                    }}
                    border={marketplace.id === product.selectedMarketplace.id ? 'danger' : 'light'}
                >
                    {marketplace.name}
                </Card>
            )}
    </Row>
    );
});

export default MarketplaceBar;
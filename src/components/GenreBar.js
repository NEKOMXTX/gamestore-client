import { observer } from "mobx-react-lite";
import { React, useContext, useState } from "react";
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';


const GenreBar = observer(() => {
    const {product} = useContext(Context)

    return (
        <ListGroup>
            {product.genres.map(genre => //делается массив который впоследствии уже возвращается и рендерится
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={genre.id === product.selectedGenre.id} 
                    onClick={() => {
                        if (genre.id === product.selectedGenre.id) {
                            product.setSelectedGenre({});
                        } else {
                            product.setSelectedGenre(genre);
                        };
                    }}
                    key={genre.id}
                >
                    {genre.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default GenreBar;
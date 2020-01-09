import React from 'react';
import MiniaturProduct from './Product/MiniaturProduct'
import { Button, Form, Card, Container } from 'react-bootstrap';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [1, 2, 3]
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container className="home">
                {this.state.products.map((product) => {
                    return (
                        <MiniaturProduct></MiniaturProduct>)
                })}
            </Container >

        )
    }
}

export default Home;
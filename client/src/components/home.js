
import React from 'react';
import MiniaturProduct from './Product/MiniaturProduct'
import productServices from "../services/productService";
import { Button, Form, Card, Container } from 'react-bootstrap';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        productServices.getAll().then((res) => {

            this.setState({
                products: res.data
            })
        })
    }

    render() {
        return (
            <Container className="home">
                {this.state.products.map((product) => {
                    return (
                        <MiniaturProduct onClick={console.log('ok')} product={product}></MiniaturProduct>)
                })}
            </Container >

        )
    }
}

export default Home;
import React from 'react';
import MiniaturProduct from './Product/MiniaturProduct'
import productServices from "../services/productService";
import { Button, Form, Card, Container } from 'react-bootstrap';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [1, 2, 3]
        }
    }

    componentDidMount() {
        productServices.getAll().then((res) => {
            console.log('====>', res)
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
                        <MiniaturProduct></MiniaturProduct>)
                })}
            </Container >

        )
    }
}

export default Home;
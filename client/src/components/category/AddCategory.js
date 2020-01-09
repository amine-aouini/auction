import React from 'react';
import { Button, Form, Alert, Modal } from 'react-bootstrap';
import categoryService from "../../services/categoryService.js";

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',

            show: false,
            alert: 'success',
            message: 'Email already exist',
            showModal: true
        }

        this.onChange = this.onChange.bind(this);


    }

    handleSubmit(e) {
        e.preventDefault();
        categoryService.add(this.state)
            .then((res) => {
                this.setState({
                    show: true,
                    alert: 'success',
                    message: 'Successful'
                })
            })
            .catch((err) => {
                this.setState({
                    show: true,
                    alert: 'danger',
                    message: 'category already exist',
                })
            })

    }

    onChange(e) {
        this.setState({
            name: e.target.value
        });
        console.log(this.state.name)
    }

    render() {
        return (
            <Modal className="signup" show={this.props.showModal} onHide={() => { this.props.onHide() }}>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Alert variant={this.state.alert} show={this.state.show} dismissible>

                        {this.state.message}

                    </Alert>
                    <Form.Row>
                        <Form.Group controlId="formGridName">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Product Name" value={this.state.name} onChange={(e) => { this.onChange(e) }} name="name" />
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit" >
                        Add new Category
			</Button>
                </Form>
            </Modal>
        )
    }
}

export default AddCategory;
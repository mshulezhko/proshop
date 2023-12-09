import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async(item, qty) =>{
dispatch(addToCart({...item, qty}))
  }

  const deleteFromCartHandler = async(id)=>{
    dispatch(removeFromCart(id))

  }

  const checkoutHandler =()=>{
    navigate('/login?redirect=/shipping')
  }

  console.log(cartItems)
  return (
    <Row>
      <Col mb={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((product) => (
              <ListGroup.Item key={product._id}>
                <Row>
                  <Col mb={2}>
                    <Image
                      src={product.image}
                      style={{ width: "100px" }}
                      alt={product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col mb={3}>
                    <Link to={`/products/${product._id}`}>{product.name}</Link>
                  </Col>
                  <Col mb={2}>${product.price}</Col>
                  <Col mb={2}>
                    <Form.Control
                      as="select"
                      value={product.qty}
                      onChange={(e) => addToCartHandler(product, Number(e.target.value))}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => {
                        return (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>
                  <Col mb={2}>
                    <Button onClick={()=>deleteFromCartHandler(product._id)} type="button" variant="light">
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col mb={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (accumulator, currentItem) =>
                    Number(accumulator) + currentItem.qty,
                  0
                )}
                ) items
              </h2>
              ${
                cartItems.reduce((accumulator, currentItem)=> Number(accumulator) + (currentItem.price * currentItem.qty),0).toFixed(2)
              }
            </ListGroup.Item>
                    <ListGroup.Item> 
            <Button
            type='button'
            className="btn-block"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
            >
Proceed To Checkout 
            </Button>
        </ListGroup.Item>
          </ListGroup>
        </Card>

      </Col>
    </Row>
  );
};

export default CartScreen;

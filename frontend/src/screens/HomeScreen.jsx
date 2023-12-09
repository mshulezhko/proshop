import React from 'react';
import {useGetProductsQuery} from '../slices/productsApiSlice'
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
   const {data: products, isLoading, isError} = useGetProductsQuery()

    return (
        <>
        {isLoading ? (<Loader/>): isError ? (<Message variant='danger'>{isError?.error || isError?.data?.message}</Message>) : (<>
        <h1>Latest Products</h1>
            <Row>
                {products.map((product) => {
                    return <Col key={product._id} sm={12} mb={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                })}
            </Row></>)}
            
        </>
    )
}

export default HomeScreen

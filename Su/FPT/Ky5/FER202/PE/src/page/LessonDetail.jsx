import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../api/axios';
import { Container, Row, Col, Image, Button, Badge, CardText } from 'react-bootstrap';

function LessonDetail() {
     const { id } = useParams();
        const navigate = useNavigate();
        const [data, setData] = useState({});
      
        useEffect(() => {
          const fetch = async () => {
            try {
              const { data } = await axiosInstance.get(`/${id}`);
              setData(data);
            } catch (err) {
              console.error('Error fetching data', err);
            }
          };
      
          fetch();
        }, [id]);
      
        
  return (
    <>
            <Button variant="secondary" className="m-3" onClick={() => navigate(-1)}>
              Back To Home
            </Button>
        
            <Container className="py-4">
              <Row
                className="shadow rounded p-4"
                style={{ backgroundColor: '#fff', alignItems: 'center' }}
              >
               
                <Col
                  xs={12}
                  md={5}
                  className="text-center mb-4 mb-md-0"
                  style={{ position: 'relative' }}
                >
        
                  <Image
                    src={data.lessonImage}
                    alt={data.lessonTitle}
                    fluid
                    style={{ borderRadius: '10px', maxHeight: '500px', objectFit: 'contain' }}
                  />
                </Col>
        
                <Col xs={12} md={7}>
                  <h2 className="fw-bold mb-3">{data.lessonTitle}</h2>
        
                  <p>
                    <strong>Level:</strong> {data.level}
                  </p>
                  <p>
                    <strong>IsCompleted:</strong> {data.isCompleted ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>EstimatedTime:</strong> {`${Number(data.estimatedTime).toLocaleString('en-US')} minutes`}
                  </p>
                </Col>
              </Row>
            </Container>
            </>
  )
}

export default LessonDetail
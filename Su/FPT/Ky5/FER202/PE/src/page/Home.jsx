import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../api/axios'
import { Container, Row, Col, Button, Badge, Card} from 'react-bootstrap';

function Home() {
    const [data, setData] = useState([]);
        const navigate = useNavigate();
      
        const fetchData = async () => {
          try {
            const response = await axiosInstance.get("");
            console.log("Data fetched from API:", data);
      
            setData(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        useEffect(() => {
          fetchData();
        }, []);
      
        console.log("Data fetched from API:", data);
  return (
    <Container className='d flex justify-content-center align-items-center' style={{height:'100vh'}}>
    <div style={{ marginTop: '30px' }}>
     <Row>
    {data.filter(item=>item.isCompleted=== false).map((items)=>(
     <Col md={4} className='mb-5' key={items.id}>
        <Card style={{ width: '20rem' , height:'37rem', gap : '6px'  } }>
     <Card.Img onClick={()=>navigate(`/SE182003/${items.id}`)}  style={{height:'21rem',objectFit:'cover', cursor:'pointer'}} variant="top" src={items.lessonImage} />
     <Card.Body>
      <div style={{height:'60px', width:'100%'}}>
       <Card.Title >{items.lessonTitle}</Card.Title>
      </div>

      
       <Card.Text style={{ fontSize: "16px", lineHeight: "1.8", color: "#333" ,marginTop: '35px'}}>
 <span style={{ fontWeight: "600", color: "#d35400" }}>
   Level: {items.level}
 </span>
 <br />

 <span style={{ fontWeight: "600", color: "#2980b9" }}>
 EstimatedTime: {`${Number(items.estimatedTime).toLocaleString('en-US')} minutes`}
 </span>
 <br />
 
 

  
</Card.Text>  
      <Button onClick={()=>navigate(`/SE182003/${items.id}`)} style={{width:"100%",fontWeight:"bold"}}>Lesson Detail</Button> 
     </Card.Body>
   </Card>
     </Col>
    ))}
     </Row>
    </div>
   </Container>
  )
}

export default Home
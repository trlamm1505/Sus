import React from 'react'

import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/Table';
import { axiosInstance } from '../api/axios';
import { useNavigate } from 'react-router-dom';


function CompletedLessons() {
    const navigate = useNavigate();
        const [data, setdata] = useState([]);
        const fetchData = async () => {
            try {
              const response = await axiosInstance.get('');
              const sortDesc = response.data.sort((a, b) => b.id - a.id);
              setdata(sortDesc);
            } catch (error) {
              console.error("Error fetching :", error);
            }
          };
    
           useEffect(() => {
              fetchData();
            }, []);
    
  return (
    <Container>

      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>Id</th>
            <th>lessonTitle</th>
            <th>level</th>
            <th>lessonImage</th>


          </tr>
        </thead>
        <tbody>
          {data.filter(items=>items.isCompleted === true).map((item) => (
            <tr key={item.id}  onClick={() => navigate(`/SE182003/${item.id}`)} style={{cursor:'pointer'}}>
              <td>{item.id}</td>
              <td>{item.lessonTitle}</td>
              <td>{item.level}</td> 
              <td>
                <img
                  onClick={() => handleEdit(item)}
                  style={{ width: '100px', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
                  src={item.lessonImage}
                  alt={item.lessonTitle}
                />
              </td>
             
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default CompletedLessons
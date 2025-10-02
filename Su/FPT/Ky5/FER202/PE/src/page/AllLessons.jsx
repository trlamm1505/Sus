import React from "react";

import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import { axiosInstance } from "../api/axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  lessonTitle: Yup.string()
    .test(
      "more-than-one-word",
      "LessonTitle must have more than 1 word",
      (v) => v && v.trim().split(/\s+/).length > 1
    )
    .required("LessonTitle is required"),
  lessonImage: Yup.string()
    .url("Image must be a valid URL")
    .required("Image is required"),
  isCompleted: Yup.boolean().required("isCompleted is required"),
  level: Yup.string().required("level is required"),
  estimatedTime: Yup.number().required("estimatedTime is required"),
});

function AllLessons() {
  const [show, setShow] = useState(false);

  const [data, setdata] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [ToDelete, setToDelete] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setSelected(null);
  };

  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("");
      const sortDesc = response.data.sort((a, b) => b.id - a.id);
      setdata(sortDesc);
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };

  const handleEdit = (item) => {
    setSelected(item);
    handleShow();
  };

  const handleDelete = (id) => {
    setToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/${ToDelete}`);
      toast.success("deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting :", error);
      toast.error("Failed to delete . Please try again.");
    } finally {
      setShowConfirm(false);
      setToDelete(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <Container>
        <div className="mt-3 text-end">
          <Button variant="primary" onClick={handleShow}>
            Add 
          </Button>
        </div>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>lessonTitle</th>
              <th>level</th>
              <th>estimatedTime</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                
              >
                <td onClick={() => navigate(`/SE182003/${item.id}`)}
                style={{ cursor: "pointer" }}>{item.id}</td>
                <td onClick={() => navigate(`/SE182003/${item.id}`)}
                style={{ cursor: "pointer" }}>{item.lessonTitle}</td>
                <td onClick={() => navigate(`/SE182003/${item.id}`)}
                style={{ cursor: "pointer" }}>{item.level}</td>
                <td onClick={() => navigate(`/SE182003/${item.id}`)}
                style={{ cursor: "pointer" }}>{`${Number(item.estimatedTime).toLocaleString(
                  "en-US"
                )} minutes`}</td>

                <td>
                  <div className="d-flex gap-1">
                    <Button onClick={() => handleEdit(item)}>Edit</Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>{selected ? "Update Lesson" : "Add Lesson"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            enableReinitialize
            initialValues={{
              lessonTitle: selected?.lessonTitle || "",
              lessonImage: selected?.lessonImage || "",
              isCompleted: selected?.isCompleted || false,
              level: selected?.level || "",
              estimatedTime: selected?.estimatedTime || "",
            }}
            validationSchema={Schema}
            onSubmit={async (values, { resetForm }) => {
              const newData = {
                ...values,
                estimatedTime: Number(values.estimatedTime),
              };
              try {
                if (selected) {
                  await axiosInstance.put(`/${selected.id}`, newData);
                  toast.success(" updated successfully!");
                } else {
                  await axiosInstance.post("/", newData);
                  toast.success(" added successfully!");
                }
                resetForm();
                handleClose();
                fetchData();
              } catch (error) {
                console.error("Error saving :", error);
                toast.error("Failed to save . Please try again.");
              }
            }}
          >
            {({ values, setFieldValue, handleSubmit }) => (
              <Form>
                <div className="mb-3">
                  <label className="form-label">LessonTitle</label>
                  <Field
                    name="lessonTitle"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="lessonTitle"
                    component="div"
                    className="invalid-feedback d-block"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <Field
                    name="lessonImage"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="lessonImage"
                    component="div"
                    className="invalid-feedback d-block"
                  />
                </div>

                <div className="form-check form-switch mb-3">
                  <Field
                    name="isCompleted"
                    type="checkbox"
                    className="form-check-input"
                    id="isCompleted"
                  />
                  <label className="form-check-label" htmlFor="glassSurface">
                    isCompleted
                  </label>
                  <ErrorMessage
                    name="isCompleted"
                    component="div"
                    className="invalid-feedback d-block"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">EstimatedTime</label>
                  <Field
                    name="estimatedTime"
                    type="text"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="estimatedTime"
                    component="div"
                    className="invalid-feedback d-block"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Level</label>
                  <Field as="select" name="level" className="form-select">
                    <option value="">Select branch</option>
                    <option value="N1">N1</option>
                    <option value="N2">N2</option>
                    <option value="N3">N3</option>
                    <option value="N4">N4</option>
                    <option value="N5">N5</option>
                  </Field>
                  <ErrorMessage
                    name="level"
                    component="div"
                    className="invalid-feedback d-block"
                  />
                </div>

                <Modal.Footer className="p-0 pt-3">
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <Modal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            No
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AllLessons;

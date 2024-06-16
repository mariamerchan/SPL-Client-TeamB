import React, { useState } from "react";
import { Button, Modal, Form, ToastContainer, Toast } from "react-bootstrap";

import {
  useObtenerOfrecimientos,
  useCrearOfrecimiento,
  useActualizarOfrecimiento,
  useEliminarOfrecimiento,
} from "../hooks/useOfrecimientos";

export const CrudPage = () => {
  const headers = ["ID", "Autor", "Ofrecimiento", "Red social", "Acciones"];
  const {
    ofrecimientos,
    agregarOfrecimiento,
    actualizarOfrecimiento,
    eliminarOfrecimiento,
  } = useObtenerOfrecimientos();
  const { crearOfrecimiento: crear } = useCrearOfrecimiento();
  const { actualizarOfrecimiento: editar } = useActualizarOfrecimiento();
  const { eliminarOfrecimiento: eliminar } = useEliminarOfrecimiento();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOfrecimiento, setSelectedOfrecimiento] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleEditClick = (ofrecimiento) => {
    setSelectedOfrecimiento(ofrecimiento);
    setShowEditModal(true);
  };

  const handleDeleteClick = (ofrecimiento) => {
    setSelectedOfrecimiento(ofrecimiento);
    setShowDeleteModal(true);
  };

  const handleClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedOfrecimiento(null);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const { nombre, descripcion, socialUrl } = e.target.elements;
    try {
      const nuevoOfrecimiento = await crear({
        nombre: nombre.value,
        descripcion: descripcion.value,
        socialUrl: socialUrl.value,
      });
      agregarOfrecimiento(nuevoOfrecimiento);
      setShowAddModal(false);
      setToastMessage("Ofrecimiento creado con éxito");
      setToastVariant("success");
    } catch (error) {
      setToastMessage("Ups, al parecer hay un error");
      setToastVariant("danger");
    } finally {
      setShowToast(true);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { id, nombre, descripcion, socialUrl } = selectedOfrecimiento;
    try {
      const updatedOfrecimiento = await editar(id, {
        nombre,
        descripcion,
        socialUrl,
      });
      actualizarOfrecimiento(id, updatedOfrecimiento);
      setShowEditModal(false);
      setToastMessage("Ofrecimiento actualizado con éxito");
      setToastVariant("success");
    } catch (error) {
      setToastMessage(
        "Ups al parecer tienes un error. ¿Y si miras el código del Back-end?"
      );
      setToastVariant("danger");
    } finally {
      setShowToast(true);
    }
  };

  const handleDeleteConfirm = async () => {
    const { id } = selectedOfrecimiento;
    try {
      await eliminar(id);
      eliminarOfrecimiento(id);
      setShowDeleteModal(false);
      setToastMessage("Ofrecimiento eliminado con éxito");
      setToastVariant("success");
    } catch (error) {
      setToastMessage("Ups, al parecer hay un error");
      setToastVariant("danger");
    } finally {
      setShowToast(true);
    }
  };

  return (
    <div className="crud">
      <h1>CRUD Ofrecimientos</h1>
      <div className="d-flex justify-content-end mb-3">
        <Button
          variant="primary"
          className="create-btn"
          onClick={() => handleAddClick()}
        >
          <i className="bi bi-plus"></i> Agregar ofrecimiento
        </Button>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ofrecimientos && ofrecimientos.length > 0 ? (
              ofrecimientos.map((ofrecimiento) =>
                ofrecimiento && ofrecimiento.id ? (
                  <tr key={ofrecimiento.id}>
                    <td data-label="ID">{ofrecimiento.id}</td>
                    <td data-label="Autor">{ofrecimiento.nombre}</td>
                    <td data-label="Ofrecimiento">
                      {ofrecimiento.descripcion}
                    </td>
                    <td data-label="Red social">{ofrecimiento.socialUrl}</td>
                    <td data-label="Acciones">
                      <div className="d-flex">
                        <Button
                          variant="info"
                          className="update-btn"
                          onClick={() => handleEditClick(ofrecimiento)}
                        >
                          <i className="bi bi-pencil-fill"></i> Editar
                        </Button>
                        <Button
                          variant="danger"
                          className="delete-btn"
                          onClick={() => handleDeleteClick(ofrecimiento)}
                        >
                          <i className="bi bi-trash3-fill"></i> Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ) : null
              )
            ) : (
              <tr>
                <td colSpan="5">No hay ofrecimientos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={showAddModal} onHide={handleClose}>
        <Form onSubmit={handleAddSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Ofrecimiento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formAutor">
              <Form.Label className="strong">Autor</Form.Label>
              <Form.Control type="text" name="nombre" required />
            </Form.Group>
            <Form.Group controlId="formOfrecimiento">
              <Form.Label className="strong">Ofrecimiento</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="descripcion"
                required
              />
            </Form.Group>
            <Form.Group controlId="formRedSocial">
              <Form.Label className="strong">Red social</Form.Label>
              <Form.Control type="text" name="socialUrl" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Guardar cambios
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showEditModal} onHide={handleClose}>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Ofrecimiento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOfrecimiento && (
              <>
                <Form.Group controlId="formAutor">
                  <Form.Label className="strong">Autor</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedOfrecimiento.nombre}
                    onChange={(e) =>
                      setSelectedOfrecimiento({
                        ...selectedOfrecimiento,
                        nombre: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formOfrecimiento">
                  <Form.Label className="strong">Ofrecimiento</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={selectedOfrecimiento.descripcion}
                    onChange={(e) =>
                      setSelectedOfrecimiento({
                        ...selectedOfrecimiento,
                        descripcion: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formRedSocial">
                  <Form.Label className="strong">Red social</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedOfrecimiento.socialUrl}
                    onChange={(e) =>
                      setSelectedOfrecimiento({
                        ...selectedOfrecimiento,
                        socialUrl: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Guardar cambios
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Ofrecimiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOfrecimiento && (
            <div>
              <p>¿Está seguro que desea eliminar el ofrecimiento?</p>
              <p>
                <strong> ID:</strong> {selectedOfrecimiento.id}
              </p>
              <p>
                <strong>Autor:</strong> {selectedOfrecimiento.nombre}
              </p>
              <p>
                <strong>Ofrecimiento:</strong>{" "}
                {selectedOfrecimiento.descripcion}
              </p>
              <p>
                <strong>Red social:</strong>{" "}
                <a href={selectedOfrecimiento.socialUrl}>
                  {selectedOfrecimiento.socialUrl}
                </a>
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Eliminar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          className="text-white"
          bg={toastVariant}
        >
          <Toast.Body className="d-flex justify-content-between">
            {toastMessage}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setShowToast(false)}
            ></button>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default CrudPage;

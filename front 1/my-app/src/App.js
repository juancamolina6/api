import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = 'http://localhost:5000/persona';

class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    form: {
      tipo_documento: '',
      documento: '',
      Nombre: '',
      Apellido: '',
      Hobbie: '',
      tipoModal: ''
    },
  };

  peticionGet = () => {
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPost = async () => {
    await axios
      .post(url, this.state.form)
      .then((response) => {
        this.modalInsertar();
        this.peticionGet();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  peticionPut = ()=>{
    axios.put(url+this.state.form.documento, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }




  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  selecionarpersona=(persona)=>{
    this.setState({
      tipoModal: 'actualizar',
      from:{
        tipo_documento: persona.tipo_documento,
        documento: persona.documento,
        nombre: persona.Nombre,
        apellido:persona.Apellido,
        Hobbie: persona.Hobbie
      }
    })
  }

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const { form } = this.state;
    return (
      <div className='App'>
        <br />
        <button
          type='button'
          class='btn btn-success'
          onClick={() =>{this.setState({from: null, tipoModal:'insertar'}); this.modalInsertar()}}
        >
          Success
        </button>
        <table className='table'>
          <thead>
            <tr>
              <th>Tipo de documento</th>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Hobbie</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((persona) => {
              return (
                <tr>
                  <td>{persona.tipo_documento}</td>
                  <td>{persona.documento}</td>
                  <td>{persona.Nombre}</td>
                  <td>{persona.Apellido}</td>
                  <td>{persona.Hobbie}</td>
                  <td>
                    <button type='button' class='btn btn-primary' onClick={() => {this.selecionarpersona(persona);}}>
                      Primary
                    </button>
                    <button type='button' class='btn btn-danger'>
                      Danger
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: 'block' }}>
            <span
              style={{ float: 'right' }}
              onClick={() => this.modalInsertar()}
            >
              x
            </span>
          </ModalHeader>
          <ModalBody>
            <div className='form-group'>
              <label htmlFor='tipo_documento'>Tipo de documento</label>
              <input
                className='form-control'
                type='text'
                name='tipo_documento'
                id='tipo_documento'
                onChange={this.handleChange}
                value={form ? form.tipo_documento : ''}
              />
              <br />
              <label htmlFor='documento'>Documento</label>
              <input
                className='form-control'
                type='text'
                name='documento'
                id='documento'
                onChange={this.handleChange}
                value={form ? form.documento : ''}
              />
              <br />
              <label htmlFor='Nombre'>Nombre</label>
              <input
                className='form-control'
                type='text'
                name='Nombre'
                id='Nombre'
                onChange={this.handleChange}
                value={form ? form.Nombre : ''}
              />
              <br />
              <label htmlFor='Apellido'>Apellido</label>
              <input
                className='form-control'
                type='text'
                name='Apellido'
                id='Apellido'
                onChange={this.handleChange}
                value={form ? form.Apellido : ''}
              />
              <br />
              <label htmlFor='Hobbie'>Hobbie</label>
              <input
                className='form-control'
                type='text'
                name='Hobbie'
                id='Hobbie'
                onChange={this.handleChange}
                value={form ? form.Hobbie : ''}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal == 'insertar' ? (
              <button
                className='btn btn-success'
                onClick={() => this.peticionPost()}
              >
                Insertar
              </button>
            ) : 
            (
              <button
                className='btn btn-primary'
                onClick={() => this.peticionPut()}
              >
                Actualizar
              </button>
            )}
            <button
              type='button'
              class='btn btn-danger'
              onClick={() => this.modalInsertar()}
            >
              Danger
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar a la empresa {form && form.nombre}
          </ModalBody>
          <ModalFooter>
            <button
              className='btn btn-danger'
              onClick={() => this.peticionDelete()}
            >
              Sí
            </button>
            <button
              className='btn btn-secundary'
              onClick={() => this.setState({ modalEliminar: false })}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;

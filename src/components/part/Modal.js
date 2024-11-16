import React, { Component } from 'react';
import { put, update, delete_el } from '../utils/crud';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      position: '',
      email: '',
      phone: '',
      nameValid: null,
      emailValid: null,
      phoneValid: null,
      positionValid: null,
    };
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.selectedItem !== prevProps.selectedItem) {
      if (this.props.selectedItem) {
        this.setState({ ...this.props.selectedItem });
      } else {
        this.reset();
      }
    }
  }

  reset = () => {
    this.setState({
      id: '',
      name: '',
      position: '',
      email: '',
      phone: '',
      nameValid: null,
      emailValid: null,
      phoneValid: null,
      positionValid: null,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validationCheck();
    });
  };

  validationCheck = () => {
    let nameValid = null;
    let emailValid = null;
    let phoneValid = null;
    let positionValid = null;

    if (this.state.name.length < 2) {
      nameValid = false;
    } else {
      nameValid = true;
    }

    const emailRegex = /@.+\..+/;
    if (!emailRegex.test(this.state.email)) {
      emailValid = false;
    } else {
      emailValid = true;
    }

    const phoneRegex = /^(070|02|0[0-9][0-9])-\d{3,4}-\d{4}$/;
    if (!phoneRegex.test(this.state.phone)) {
      phoneValid = false;
    } else {
      phoneValid = true;
    }

    if (!this.state.position) {
      positionValid = false;
    } else {
      positionValid = true;
    }

    this.setState({
      nameValid,
      emailValid,
      phoneValid,
      positionValid,
    });

    return nameValid && emailValid && phoneValid && positionValid;
  };

  handleAdd = () => {
    if (this.validationCheck()) {
      put(this.state).then(() => {
        const modal = window.bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
        modal.hide();
        this.reset();
        this.handleClose();
      });
    }
  };

  handleUpdate = () => {
    if (!this.state.id) return;

    if (this.validationCheck()) {
      update(this.state).then(() => {
        const modal = window.bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
        modal.hide();
        this.reset();
        this.handleClose();
      });
    }
  };

  handleDelete = () => {
    if (!this.state.id) return;

    delete_el({ id: this.state.id }).then(() => {
      const modal = window.bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
      modal.hide();
      this.reset();
      this.handleClose();
    });
  };

  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const { name, position, email, phone, nameValid, emailValid, phoneValid, positionValid } = this.state;
    return (
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">직원 정보</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.handleClose}></button>
            </div>
            <div className="modal-body">
              <div className="needs-validation px-2 py-4">
                <div className="row mb-3">
                  <div className="col pe-2">
                    <input
                      id="name_v"
                      type="text"
                      name="name"
                      value={name}
                      placeholder="이름"
                      className={`form-control ${nameValid === false ? 'is-invalid' : ''} ${nameValid === true ? 'is-valid' : ''}`}
                      onChange={this.handleChange}
                    />
                    <div className="invalid-feedback">2글자 이상 입력해 주세요</div>
                    <div className="valid-feedback">사용가능 합니다</div>
                  </div>
                  <div className="col ps-2">
                    <input
                      id="position_v"
                      type="text"
                      name="position"
                      value={position}
                      placeholder="분야"
                      className={`form-control ${positionValid === false ? 'is-invalid' : ''} ${positionValid === true ? 'is-valid' : ''}`}
                      onChange={this.handleChange}
                    />
                    <div className="invalid-feedback">필수정보 입니다</div>
                    <div className="valid-feedback">사용가능 합니다</div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      id="email_v"
                      type="email"
                      name="email"
                      value={email}
                      placeholder="이메일"
                      className={`form-control ${emailValid === false ? 'is-invalid' : ''} ${emailValid === true ? 'is-valid' : ''}`}
                      onChange={this.handleChange}
                    />
                    <div className="invalid-feedback">형식을 확인해 주세요 (-----@---.---)</div>
                    <div className="valid-feedback">사용가능 합니다</div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      id="phone_v"
                      type="text"
                      name="phone"
                      value={phone}
                      placeholder="전화번호"
                      className={`form-control ${phoneValid === false ? 'is-invalid' : ''} ${phoneValid === true ? 'is-valid' : ''}`}
                      onChange={this.handleChange}
                    />
                    <div className="invalid-feedback">형식을 확인해 주세요 (0xx-xxxx-xxxx)</div>
                    <div className="valid-feedback">사용가능 합니다</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.handleAdd} style={this.props.selectedItem != null ? { display: 'none' } : { display: 'inline' }}>추가하기</button>
              <button type="button" className="btn btn-primary" onClick={this.handleUpdate} style={this.props.selectedItem != null ? { display: 'inline' } : { display: 'none' }}>수정하기</button>
              <button type="button" className="btn btn-danger" onClick={this.handleDelete} style={this.props.selectedItem != null ? { display: 'inline' } : { display: 'none' }}>삭제하기</button>
              <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={this.handleClose}>취소</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

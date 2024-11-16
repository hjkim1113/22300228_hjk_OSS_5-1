import React, { Component } from 'react';

export default class Header extends Component {

  handleEditDelete = () => {
    alert('삭제할 직원을 선택해 주세요');
  };

  render() {
    return (
      <header className="border-bottom">
        <div id="header_inner" className="d-flex flex-wrap justify-content-center py-3 mx-auto">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none ms-3 float-start">
            <svg className="bi me-2" width="40" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/>
            </svg>
            <span className="fs-4">직원 정보</span>
          </a>
          <ul className="nav nav-pills me-3 float-end">
            <li className="nav-item">
              <button
                className={`nav-link`}
                onClick={this.props.make}
              >
                추가
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link`}
                onClick={this.handleEditDelete}
              >
                편집/삭제하기
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link active`}
                onClick={this.props.loadData}
              >
                목록보기
              </button>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
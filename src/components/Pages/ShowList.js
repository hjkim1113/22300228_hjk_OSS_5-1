import React, { Component } from 'react';
import Header from '../part/Header';
import Footer from '../part/Footer';
import Modal from '../part/Modal';
import { get } from '../utils/crud';

export default class ShowList extends Component {
  state = {
    data: [],
    selectedItem: null,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    get().then((response) => {
      this.setState({ data: response });
    });
  };

  rowClick = (item) => {
    this.setState({ selectedItem: item });
    const modal = new window.bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();
  };

  make = () => {
    this.setState({ selectedItem: null });
    const modal = new window.bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();
  };

  modalClose = () => {
    this.setState({ selectedItem: null });
    this.loadData();
  };

  render() {
    const { data, selectedItem } = this.state;

    return (
      <div className="d-flex flex-column min-vh-100">
        <Header loadData={this.loadData} make={this.make} />

        <div className="container-fluid m-0">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col" id="total">{data.length}명</th>
                <th scope="col">이름</th>
                <th scope="col">분야</th>
                <th scope="col" className="email_hide">이메일</th>
                <th scope="col">전화번호</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => this.rowClick(item)}
                >
                  <th scope="row">{parseInt(item.id) + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.position}</td>
                  <td className="email_hide">{item.email}</td>
                  <td>{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Footer />

        <Modal selectedItem={selectedItem} onClose={this.modalClose} />
      </div>
    );
  }
}

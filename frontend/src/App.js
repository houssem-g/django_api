import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios'; // new
import Table from "./components/Table";
import './App.css'


class App extends Component {
  state = {
    data: [],
    cord: [{id:"1"}, {lon:"12.1"}, {lat:"12.1"}, {altitude:"0"}, {name:"kaab"}]
  };

  // used to initialise the state
  constructor(props) {
    super(props);
    // c'est similaire au concept d'héritrage en python, le bind permet de partager le context (les data)
    // de la fonction getTodos et le composant associé à this (lui mm représente le bouton)
    this.getTodos = this.getTodos.bind(this)
  }
  // we setup the request send here
  componentDidMount() {
    this.setState({ data: [], cord: [{id:"1"}, {lon:"12.1"}, {lat:"12.1"}, {altitude:"0"}, {name:"kaab"}] })
    // this.getTodos() 
    document.getElementById('divButton')
    .addEventListener('click', this.handleClick.bind(this))
  }

  // handle event about button click
  handleClick(e){
    let action = e.target.textContent
    console.log("hey you click me !!", action)
    this.getTodos(action)
  }

  // handle request to backend
  getTodos(url) {
  // axios agit comme un fetch
    
  // https://www.js-tutorials.com/react-js/how-to-create-listing-add-edit-and-delete-api-using-react-axios/
  // https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
    switch (url) {
      case 'GET':
        console.log('We have to get data from database');
        break;
      case 'POST':
        console.log('We have to update database: ', this.state.cord);
        break;
      case 'PUT':
        console.log('We have to POST to database');
        break;
      default:
        console.log('An error occured');
    }
    axios.get('http://127.0.0.1:8000/api/').then(res => {
      this.setState({ data: res.data });
    })
    .catch(err => {
      console.log(err);
    });
  }


  // console.log(this.columns)
  render() {
    return (
      <>
      <div id="title">
        <h1>Mountains peaks !!</h1>
      </div>
      <Table
        header={[
          {
            name: "ID",
            prop: 'id'
          },
          {
            name: "LONGITUDE",
            prop: 'lon'
          },
          {
            name: "Latitude",
            prop: 'lat'
          },
          {
            name: "ALTITUDE",
            prop: 'altitude'
          },
          {
            name: "NAME",
            prop: 'name'
          }
        ]}
        data = {this.state.data}
      />
      <div id="divButton">
        <Button variant="contained" color="primary">GET</Button>
        <Button variant="contained" color="primary">POST</Button>
        <Button variant="contained" color="primary">PUT</Button>
        <Button variant="contained" color="primary">DELETE</Button>
      </div>
    </>
    )
  }
}
// https://www.positronx.io/how-to-build-react-data-table-with-react-table-package/
// https://hackernoon.com/how-to-structure-your-react-app-98c48e102aad
// https://medium.com/@leannezhang/curly-braces-versus-parenthesis-in-reactjs-4d3ffd33128f
// https://vaadin.com/learn/tutorials/using-web-components-in-react?hss_channel=lcp-52231&utm_campaign=Learning%20Center&utm_medium=social&utm_source=linkedin&utm_content=81570794
export default App
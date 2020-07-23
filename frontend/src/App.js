import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios'; // new
import Table from "./components/Table";
import './App.css'
import Requests from './requestHandler.js'

class App extends Component {
  state = {
    data: [],
    cord: {id:"1", lon:"12.1", lat:"12.1", altitude:"0", name:"kaab"},
    id:"1"
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
    this.setState({ data: [], cord: {lon:"12.1", lat:"12.1", altitude:"0", name:"kaab"}, id:"1" })
    // this.getTodos() 
    document.getElementById('divButton')
    .addEventListener('click', this.handleClick.bind(this))
  }

  // handle event about button click
  handleClick(e) {
    let verb = e.target.textContent
    var args = {}
    args.headers= {}
    args.headers.Authorization = 'token d34a596df943a1c86a6f5650475b0ff5da56a007'
    args.method= verb
    switch (verb) {
      case 'POST':
        args.url = 'http://127.0.0.1:8000/api/'
        args.data = this.state.cord
        break;
      case 'PUT':
        args.url = `http://127.0.0.1:8000/api/${this.state.id}`
        args.data = this.state.cord
        break;
      case 'DELETE':
        args.url = `http://127.0.0.1:8000/api/${this.state.id}`
        args.id = this.state.id
        break;
      default:
        args.url = 'http://127.0.0.1:8000/api/'
    }
    const myObjectGet = new Requests(args)
    myObjectGet.getData().then((val) => {
      this.setState({data: val})
    })
  }

  // handle request to backend
  getTodos(options) {
  // axios agit comme un fetch
    console.log('before to send request :', options)
    axios(options
    ).then(res => {
      this.setState({ data: res.data || [] });
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
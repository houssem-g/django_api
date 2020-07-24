import React, { Component } from 'react';
import { Button } from '@material-ui/core';
// import axios from 'axios'; // new
import Table from "./components/Table";
import './App.css'
import Requests from './requestHandler.js'
import Register from "./components/Formulaire"

class App extends Component {
  state = {
    data: [],
    cord: {id:"", lon:"", lat:"", altitude:"", name:""},
    id:"",
    verb:"GET",
    url:"http://127.0.0.1:8000/api/",
    showForm: false,
    hideID: false,
    hideBody: false,
  };

  constructor(props) {
    super();
  }
  componentDidMount() {
    this.state = { 
      data: [], 
      cord: { lon:"12.1", lat:"12.1", altitude:"12", name:"kaab2"}, 
      id:"9",
      verb:"GET",
      url:"http://127.0.0.1:8000/api/",
      showForm: false,
      hideID: false,
      hideBody: false,
    }
    // this.getTodos() 
    document.getElementById('divButton')
    .addEventListener('click', this.handleClick.bind(this))
    
  }


  // handle event about button click
  handleClick(e) {
    let verb = e.target.textContent
    var args = {}
    this.setState({verb: verb})
    
    // args.url = 'http://127.0.0.1:8000/api/'
    switch (verb) {
      case 'POST':
        this.setState({showForm: true, hideID: true})
        break;
      case 'PUT':
        this.setState({showForm: true})
        break;
      case 'DELETE':
        this.setState({showForm: true, hideBody: true})
        break;
      default:
        args.method = this.state.verb
        args.url= this.state.url
        let newObj = new Requests(args)
        newObj.getData().then((val) => {this.setState({data: val})})
        }

  }

  sendRequest(newVal){
    // Object.keys(newVal).map( (val) =>{
    // })
    this.setState({cord: newVal})
    var args = {}
    args.method= this.state.verb
    args.url = 'http://127.0.0.1:8000/api/'
    args.data = newVal
    let newObj = new Requests(args)
    
    switch (this.state.verb) {
      case 'POST':
        delete newVal.id
        args.data = newVal
        newObj = new Requests(args)
        newObj.postData().then((val) => {
          val === "Success" ? window.alert("Success, please refresh page to see your entry") : window.alert("Error")})
        break;
      case 'PUT':
        args.url = `http://127.0.0.1:8000/api/${newVal.id}/`
        let idToRemove = newVal.id
        delete newVal.id
        args.data = newVal
        newObj = new Requests(args)
        newObj.putData().then((val) => {
          val === "Success" ? window.alert("Success, the row "+ idToRemove + " has been updated") : window.alert("Error")})
        break;
      default:
        args.url = `http://127.0.0.1:8000/api/${newVal.id}/`
        args.data = newVal.id
        newObj = new Requests(args)
        newObj.putData().then((val) => {
          val === "Success" ? window.alert("Success, the row "+ newVal.id + " has been updated") : window.alert("Error")})
  }

  }
  render() {
    const { showForm, hideID, hideBody } = this.state;

    return (
      <>
      <div className="motherClass">
        <div id="title">
          <h1>Monuments !!</h1>
        </div>
        <div className='wrapper'>
        <div>
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
        </div>
        <div>
          {/* <Register visibityID={hideID} visibityBody={hideBody} changeData={this.sendRequest.bind(this)}/> */}
          {showForm && (
          <Register visibityID={hideID} visibityBody={hideBody} changeData={this.sendRequest.bind(this)}/>
          )}
        </div>

        
        </div>
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


  // used to initialise the state
  // constructor(props) {
  //   super(props);
  //   // c'est similaire au concept d'héritrage en python, le bind permet de partager le context (les data)
  //   // de la fonction getTodos et le composant associé à this (lui mm représente le bouton)
  //   // this.getTodos = this.getTodos.bind(this)
  // }
  // we setup the request send here
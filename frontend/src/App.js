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
    this.setState({data: []})
    
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
        this.setState({showForm: false})
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
    this.setState({showForm: false})
  }
  cancelTheForm(value){
    this.setState({showForm: value})
  }
  render() {
    // const { showForm, hideID, hideBody } = this.state;

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
          {this.state.showForm && (
          <Register visibityID={this.state.hideID} visibityBody={this.state.hideBody} changeData={this.sendRequest.bind(this)} visibilityForm={this.cancelTheForm.bind(this)}/>
          )}
        </div>

        
        </div>
      </div>
    </>
    )
  }
}

export default App



import React, { Component } from 'react';
// import { render } from 'react-dom';
import './formulaire.css';


class Register extends Component {

  constructor(props) {
    super();
    this.state = {
      id: 0,
      lon: 0,
      lat: 0,
      altitude: 0,
      name: '',

    };
    

  }

  cancelForm() {
    this.props.visibilityForm(false)
  }
  onSendRequest(){
    const arrayToCheck = []
    Object.keys(this.state).map ( inputName => {
      if (document.getElementsByTagName("input")[inputName].hidden === false && document.getElementsByTagName("input")[inputName].value === '') {
        arrayToCheck.push('error')
      };
      return arrayToCheck
    })
    arrayToCheck.length > 0 ? window.alert("Please fill all fields before to send a request.") : this.props.changeData(this.state)
    
    
  }
  handleSubmit = (event) => {
    event.preventDefault();
    
  }
  handleChange = (event) => {
    const { name, value } = event.target;

    
    this.setState({[name]: value});
    
  }
    render() {
        return (
          <div id='wrapper' className='wrapper'>
            <div className='form-wrapper'>
              
              <form id='formId' onSubmit={this.handleSubmit} noValidate>
                
                  <div onSubmit={this.handleSubmit} className='fullName' >
                    <label htmlFor="fullName"  hidden={this.props.visibityID}>Id</label>
                    <input type='text' name='id' required hidden={this.props.visibityID} onChange={this.handleChange}/>
                  </div>
                
                <div className='blockOne'>
                    <div>
                        <label hidden={this.props.visibityBody}>Longitude</label>
                        <input name='lon' required hidden={this.props.visibityBody} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label hidden={this.props.visibityBody}>Latitude</label>
                        <input name='lat' required hidden={this.props.visibityBody} onChange={this.handleChange}/>
                    </div>
                </div>

                <div className='blockOne'>
                    <div>
                        <label hidden={this.props.visibityBody}>Altitude</label>
                        <input name='altitude' required hidden={this.props.visibityBody} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label hidden={this.props.visibityBody}>Name</label>
                        <input name='name'  required hidden={this.props.visibityBody} onChange={this.handleChange}/>
                    </div>
                </div>
 
                <div className='info'>
                </div>
                <div className='submit'>
                  {/* <button type="button" onClick={this.closeWindow()}>Cancel</button> */}
                  <button onClick={this.cancelForm.bind(this)}>Cancel</button>
                  <button id='sendButton' onClick={this.onSendRequest.bind(this)}>Send</button>
                </div>
              </form>
            </div>
          </div>
        );
      }
    }

export default Register
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  state = {
    text: {
      recipient: '',
      textmessage: ''
    },
    country: 'US',
    stateOrProvince: ''
  }

  sendText = _ => {
    const { text } = this.state;
    //pass text message GET variables via query string
    fetch(` http://10.0.0.80:3001/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`)
    .catch(err => console.error(err))
  }

  handleCountryChange = (event) => {
    this.setState({ country: event.target.value });
  }

  handleStateOrProvinceChange = (event) => {
    this.setState({ stateOrProvince: event.target.value });
  }

  render() {
    const { text, country, stateOrProvince } = this.state;
    const spacer = {
      margin: 8
    }
    const textArea = {
      borderRadius: 4
    }

    const US_STATES = [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
      'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
      'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
      'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
      'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
      'Wisconsin', 'Wyoming'
    ];

    const CANADA_PROVINCES = [
      'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario',
      'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Northwest Territories', 'Nunavut', 'Yukon'
    ];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to EmberAlert</h1>
        </header>
        <h1>STAY ALERTED</h1>
        <h4> Opt in to recieve SMS text messages whenever there is a wildfire in your area! </h4>
        <div className="form-container">
          <form>
            <div className="form-group col-md-3">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input 
                type="tel" 
                className="form-control col-md-2" 
                id="phoneNumber" 
                placeholder="123-456-7890"
                pattern="^(\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$"
                required 
                title="Phone number must be a valid US or Canada number"
              />
            </div>
            <div className="form-group col-md-1">
              <label htmlFor="inputAddress">Address</label>
              <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
            </div>
            <div className="form-row">
              <div className="form-group col-md-1">
                <label htmlFor="inputCity">City</label>
                <input type="text" className="form-control" id="inputCity"/>
              </div>
              <div className="form-group col-md-1">
                <label htmlFor="country">Country</label>
                <select id="country" className="form-control" onChange={this.handleCountryChange} value={country}>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                </select>
              </div>
              <div className="form-group col-md-1">
                <label htmlFor="stateOrProvince">State/Province</label>
                <select id="stateOrProvince" className="form-control" onChange={this.handleStateOrProvinceChange} value={stateOrProvince}>
                  {country === 'US' ? US_STATES.map(state => <option key={state} value={state}>{state}</option>) : CANADA_PROVINCES.map(province => <option key={province} value={province}>{province}</option>)}
                </select>
              </div>
              <div class="form-group col-md-1">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip"/>
    </div>
    </div>
            <button type="button" className="btn btn-primary" onClick={this.sendText}>Sign in</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;

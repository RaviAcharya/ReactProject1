import logo from './logo.svg';
import './App.css';
import EmployeePost from './Component/EmployeePost';
import React,{Component} from 'react';


class App extends Component{
  render(){
    return (
      <div className="App">
        <EmployeePost />
      </div>
    );
  }
}

export default App;

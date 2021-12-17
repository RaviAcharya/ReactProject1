import React, {Component} from 'react';
import axios from 'axios'
import EmployeeList from './EmployeeList';



class EmployeePost extends Component{
    constructor(props){
       super(props)
       this.state = {
           employee : {
                employeeId : '',
                name : '',
                age : undefined,
                emailId : '',
                dateOfJoining : ''
           },
           employees :[],
           deleteEmployeeId:''
       }
    }

    employeeIdHandler=(event)=>{
        let temp = this.state.employee;
        temp.employeeId = event.target.value;
        this.setState({employee : temp})
    }

    employeeNameHandler=(event)=>{
        let temp = this.state.employee;
        temp.name = event.target.value;
        this.setState({employee : temp})
    }

    employeeAgeHandler=(event)=>{
        let temp = this.state.employee;
        temp.age = event.target.value;
        this.setState({employee : temp})
    }

    employeeEmailIdHandler=(event)=>{
        let temp = this.state.employee;
        temp.emailId = event.target.value;
        this.setState({employee : temp})
    }

    employeeDateOfBirthHandler=(event)=>{
        let temp = this.state.employee;
        temp.dateOfJoining = event.target.value;
        this.setState({employee : temp})
    }
    employeeDeletehandler=(event)=>{
        let temp = this.state.deleteEmployeeId;
        temp = event.target.value;
        this.setState({deleteEmployeeId : temp})
    }
    componentDidMount(){
        this.getAllEmployees();
    }
    componentDidUpdate(){
        this.getAllEmployees();
    }
    submitHandler= async(event)=>{
        event.preventDefault();
        console.log(this.state.employee);
        if(this.state.employee.employeeId==='')
        {
            /*let temId = this.state.employee;
            temId.employeeId='';
            this.setState({employee : temId})
            //this.getAllEmployees();*/
           this.getAllEmployees();
        }
        else
        {
          await axios.post("http://localhost:8080/addemployee", this.state.employee)
          this.getAllEmployees();
        }

}
getAllEmployees(){
    let temp = this.state.employees;
            axios.get("http://localhost:8080/allemployees").then((response)=>{
            temp = response.data;
            this.setState({employees : temp})
            console.log("employee",this.state.employees);
            })
}

updateEmployeeHandler=async(event)=>{
    event.preventDefault()
    await axios.put(`http://localhost:8080/updateemployee/id/${this.state.employee.employeeId}`, this.state.employee)
  .catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      alert("This employee does not exist");
    }
    else
    {
        this.componentDidUpdate()
    }
  });
   
}
deleteEmployee=async(event)=>{
    event.preventDefault();
    await axios.delete(`http://localhost:8080/deleteemployee/id/${this.state.deleteEmployeeId}`)
    .catch(function (error){
        if(error.response){
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      alert("This employee does not exist");
        }
        else
        {
            this.componentDidUpdate()
        }
    })

}
    render(){
        console.log("hello",this.state.employees)
        return(
            <div>
                
                <form onSubmit={this.submitHandler} >
                      
                    <div className="id">
                        <label>Employee Id : </label>
                       <input type="text"  value={this.state.employee.employeeId} onChange={this.employeeIdHandler}/>
                    </div>
                    <div className="name">
                        <label>Employee Name : </label>
                       <input type="text"  value={this.state.employee.name} onChange={this.employeeNameHandler}/>
                    </div>
                    <div className="age">
                        <label>Employee Age : </label>
                       <input type="number" value={this.state.employee.age} onChange={this.employeeAgeHandler}/>
                    </div>
                    <div>
                        <label className="email">Employee EmailId : </label>
                       <input type="text" value={this.state.employee.emailId} onChange={this.employeeEmailIdHandler}/>
                    </div>
                    <div>
                        <label>Date Of Joining : </label>
                       <input type="date" value={this.state.employee.dateofJoining} onChange={this.employeeDateOfBirthHandler}/>
                    </div>
                    <div>
                       <button type="submit">Submit</button>
                       <button type="submit" onClick={this.updateEmployeeHandler}>Update</button>
                    </div>
                </form>
                <div>
                     <label>Enter employee Id to be deleted</label>
                <input type="text" value={this.state.deleteEmployeeId} onChange={this.employeeDeletehandler}></input>
                <button  type="submit" onClick={this.deleteEmployee}>Delete</button>
                </div>
                <EmployeeList emp={this.state.employees}/>

            </div>
        )
    }
}
export default EmployeePost
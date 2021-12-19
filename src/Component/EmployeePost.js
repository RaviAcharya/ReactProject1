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
       }
       this.updateEmployeeHandler.bind(this);
    }

    employeeIdHandler=(event)=>{
        let temp = this.state.employee;
        temp.employeeId = event.target.value;
        console.log("employeeId",temp.employeeId);
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

    employeeDateOfJoiningHandler=(event)=>{
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
        console.log("object",this.state.employee);
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
            })
}

 updateEmployeeHandler=(emp)=>{
    let temp=this.state.employee;
    temp.employeeId=emp.employeeId;
    temp.name=emp.name;
    temp.age=emp.age;
    temp.emailId=emp.emailId;
    temp.dateOfJoining=emp.dateOfJoining;
    this.setState({employee:temp})
}
deleteEmployee= async (event)=>{
    event.preventDefault();
   console.log("empid",event.target.value);
    await axios.delete(`http://localhost:8080/deleteemployee/id/${event.target.value}`)
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
        return(
            <div className="employee">
                
                <form onSubmit={this.submitHandler} >
                      
                    <div className="form1">
                        <label>Employee Id : </label>
                       <input type="text"  value={this.state.employee.employeeId} onChange={this.employeeIdHandler}/>
                    </div>
                    <div className="form2">
                        <label>Employee Name : </label>
                       <input type="text"  value={this.state.employee.name} onChange={this.employeeNameHandler}/>
                    </div>
                    <div className="form3">
                        <label>Employee Age : </label>
                       <input type="number" value={this.state.employee.age} onChange={this.employeeAgeHandler}/>
                    </div>
                    <div className="form4">
                        <label>Employee EmailId : </label>
                       <input type="text" value={this.state.employee.emailId} onChange={this.employeeEmailIdHandler}/>
                    </div>
                    <div className="form5">
                        <label>Date Of Joining : </label>
                       <input type="date" value={this.state.employee.dateofJoining} onChange={this.employeeDateOfJoiningHandler}/>
                    </div>
                    <div>
                       <button className="submit" type="submit">Submit</button>
                    </div>
                </form>
               {/* <div>
                     <label>Enter employee Id to be deleted</label>
                <input type="text" value={this.state.deleteEmployeeId} onChange={this.employeeDeletehandler}></input>
                <button  type="submit" onClick={this.deleteEmployee}>Delete</button>}
               </div>*/}
                <EmployeeList emps={this.state.employees} deleteEmployee={this.deleteEmployee} updateEmployeeHandler = {this.updateEmployeeHandler}  />
            </div>
        )
    }
}
export default EmployeePost
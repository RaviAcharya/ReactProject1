import React, {Component} from "react";

class EmployeeList extends Component{

    render(){
        return(
            <div>
                <table style ={{width : '80%'}}>
                    <caption><h3 style= {{textAlign : "center"}}>Employee Lists</h3></caption>
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Employee Name</th>
                            <th>Employee Age</th>
                            <th>Employee EmailId</th>
                            <th>Employee dateOfJoining</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.emp.map((employee)=>{ 
                            return (
                                <tr>
                                  <td>{employee.employeeId}   </td>       
                                  <td>{employee.name}</td>
                                  <td>{employee.age}</td>
                                  <td>{employee.emailId}</td>
                                  <td>{employee.dateOfJoining}</td>
                                </tr>      
                                )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EmployeeList
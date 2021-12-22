import React, {Component} from "react";

class EmployeeList extends Component{
    constructor(props){
        super(props)
        this.updateHandler.bind(this)
    }

    updateHandler=(emp)=>{
        console.log("child",emp);
       this.props.updateEmployeeHandler(emp);
    }


    render(){
        return(
            <div>
                <table style ={{width : '80%'}} >
                    <caption><h3 style= {{textAlign : "center"}}>User Lists</h3></caption>
                    <thead>
                        <tr>
                            {/*<th>EmployeeId</th>*/}
                            <th>name</th>
                            <th>Age</th>
                            <th>EmailId</th>
                            <th>DateOfBirth</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.emps.map((emp)=>{ 
                            return (
                                <tr>
                                  {/*<td>{emp.employeeId}   </td>  */  }   
                                  <td>{emp.name}</td>
                                  <td>{emp.age}</td>
                                  <td>{emp.emailId}</td>
                                  <td>{emp.dateOfBirth}</td>
                                
                                  <td><button  type="submit" value={emp.id} onClick={this.props.deleteEmployee}>Delete</button><button type="button" onClick={(event)=>this.updateHandler(emp)}>Edit</button></td>
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
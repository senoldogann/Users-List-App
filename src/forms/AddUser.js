import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from '../contex';
import axios from "axios";
const Animation = posed.div({
    visible : {
        opacity: 1,
        // apply leri yazma sebebimiz form gizleniyordu fakat kapladığı yer hala kalıyordu bu yüzden display block none olayı gerçekleştirdik
        applyAtStart:{
            display: "block"
        }
 
    },
    hidden: {
        opacity: 0,
        applyAtEnd:{
            display: "none"
        }
        
    }
});

class AddUser extends Component {
    
    state = {
        visible: true,
        name : "",
        department : "",
        salary : "",
        error: false
    }

    changeVisibility = (e) => {
        this.setState({
            visible: !this.state.visible
        })
    }

    validateForm = () => {
        // state içinden değerleri aldık
        const {name,salary,department} = this.state;
        if(name === "" || salary === "" || department === ""){
            return false;
        }
        return true;
    }

    changeInput = (e) => {
        this.setState({
            // Aşağıda name inputunu alıyoruz ve içine girilen value ile güncelliyoruz
           [e.target.name] : e.target.value
        })
    }

    addUser = async (dispatch,e) => {
        e.preventDefault();
        // değerleri aldık
        const {name,department,salary} = this.state;
            // yeni obje oluşturuyoruz
            const newUser = {
                name,
                department,
                salary
                }

                // bura false'ise diyoruyz
             if(!this.validateForm()){
                 this.setState({
                     error:true
                 })
                 // alltaki işlemlere geçmemesi için return ile sonlandırdık
                 return;
             }
                const response = await axios.post("http://localhost:3003/users",newUser);

                dispatch({type:"ADD_USER",payload:response.data}); 

                // Redirect yöntemi
                this.props.history.push("/");
       
    
    }


    

    render() {
        // state'den visible değerini alıyoruz
        const {visible,name,salary,department,error} = this.state;


        return <UserConsumer>

            {
                value => {
                    const {dispatch} = value;
                    
                    
             return (

            <div className="col-md-12 mb-4">
                 
                <button onClick={this.changeVisibility} className="btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form"}</button>
                <Animation pose = {visible ? "visible" : "hidden"}>
                <div className="card">
                    <div className="card-header">
                        <h4>Add User Form</h4>
                    
                    </div>
                    <div className="card-body">
                        {
                            error  ? 
                            <div className="alert alert-danger">
                                Please check your information.
                            </div>
                            :null
                        }
                        <form onSubmit={this.addUser.bind(this,dispatch)}>

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="id" placeholder="Enter Name" 
                                className="form-control" value={name} onChange={this.changeInput}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Department</label>
                                <input type="text" name="department" id="id" placeholder="Enter Department" 
                                className="form-control" value={department} onChange={this.changeInput}/>  
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Salary</label>
                                <input type="text" name="salary" id="id" placeholder="Enter Salary" 
                                className="form-control" value={salary} onChange={this.changeInput}/>
                            </div>

                            <button className="btn btn-success btn-block" type="submit">Add User</button>
                             
                        </form>
                    </div>
                </div>
                </Animation>
            </div>
        )

            }
        }

        </UserConsumer>

 
    }
}

export default  AddUser;

import React, { Component } from 'react'
import UserConsumer from '../contex';
import axios from "axios";


class UpdateUser extends Component {
    
    state = {
        name : "",
        department : "",
        salary : ""
    }

    // API İsteği yapacağımız için componentDidMount kullanacağız
    componentDidMount = async () => {
        // id 'iyi alıyoruz
        const {id} = this.props.match.params;
        
        const response = await axios.get(`http://localhost:3003/users/${id}`);

        // data içindeki değerleri alma
        const {name,salary,department} = response.data;

        // inputlara bilgileri gönderme
        this.setState({
            name,
            salary,
            department
        });

 
    }
    

    changeInput = (e) => {
        this.setState({
            // Aşağıda name inputunu alıyoruz ve içine girilen value ile güncelliyoruz
           [e.target.name] : e.target.value
        })
    }

    updateUser = async (dispatch,e) => {
        e.preventDefault();

        // İD'Yi alma
        const {id} = this.props.match.params;
        // State'den değerleri aldık
        const {name,salary,department} = this.state;
        // Update User
        const updateUser = {
            name,
            salary,
            department
        }

        // Güncellemeden sonra gelen veriyi alma
        const response = await axios.put(`http://localhost:3003/users/${id}`,updateUser);

        // ContexApi verileri gönderme ve güncelleme
        dispatch({type:"UPDATE_USER",payload: response.data});
        
        // Redirect yöntemi Anasayfaya geri dönme
        this.props.history.push("/");
    }


    

    render() {
        // state'den visible değerini alıyoruz
        const {name,salary,department} = this.state;


        return <UserConsumer>

            {
                value => {
                    const {dispatch} = value;
                    
                    
             return (

            <div className="col-md-12 mb-4">
              
                <div className="card">
                    <div className="card-header">
                        <h4>Update User Form</h4>
                    
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.updateUser.bind(this,dispatch)}>

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

                            <button className="btn btn-success btn-block" type="submit">Update User</button>
                             
                        </form>
                    </div>
                </div>
            </div>
        )

            }
        }

        </UserConsumer>

 
    }
}

export default  UpdateUser;

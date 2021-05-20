import React, { Component } from 'react'
import PropTypes from 'prop-types';
import UserConsumer from "../contex";
import axios from "axios";
import {Link} from "react-router-dom";
class User extends Component {
    state = {
        isVisible : false
    }
    
    static propTypes = {
        name: PropTypes.string.isRequired,
        salary: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    }
    
    static defaultProps = {
        name:  "Bilgi yok",
        salary: "Bilgi yok",
        department: "Bilgi yok"
    }
     
    onClickEvent = (e) => {
       this.setState({
           isVisible : !this.state.isVisible,

       })
    }

    onDeleteUser = async (dispatch) => {
        const {id} = this.props;

        // * DELETE REQUEST YAPMA dinamik olarak
        await axios.delete(`http://localhost:3003/users/${id}`);
        // Consumer Dispatch
        dispatch({type: "DELETE_USER",payload:id})
    }

    componentWillUnmount() {
        console.log("Component Will Unmount")
    }
    
   
    render() {

        // * Destructing
        const {id,name,department,salary} = this.props;
        const {isVisible} = this.state;
        return (
        <UserConsumer>
        
            {
                value => {
                    const {dispatch} = value;
                    return (
                        <div className="col-md-12 mb-4" >
                            
                           <div className="card" style={isVisible ?{backgroundColor: "#2c3e50",color:"#fff"}: null}>
                            
                               <div className="card-header d-flex justify-content-between">
                                    <h4 className="d-inline"  >{name}</h4>
                                    <i onClick={this.onDeleteUser.bind(this,dispatch)} className="far fa-trash-alt" style={{cursor:"pointer"}}></i>
                               </div>
                                {
                                    isVisible ? <div className="card-body">
                                        <p className="card-text">Salary: ${salary}</p>
                                        <p className="card-text">Department: {department}</p>
                                        <p className="card-text">ID: {id}</p>
                                    </div> : null

                                }
            
                                 <div className="card-body">
                                    <button className={isVisible ? "btn btn-light" : "btn btn-success"} onClick={this.onClickEvent}>
                                        {isVisible ? "Hidden Info" : "Show Info"}
                                    </button>
                                    <Link to = {`edit/${id}`} className="btn btn-danger ml-3">Update User</Link>
                                  
                                </div>
                                                               
                           </div>
                        </div>
                       
                    )
                }

            }
            
        </UserConsumer>
        )
    }
}

export default User;
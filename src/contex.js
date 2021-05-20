import React, { Component } from 'react';
import axios from "axios";
const UserContext = React.createContext();

// Reducer fonksiyonunu yazma
const reducer = (state,action) => {
    switch (action.type) {
        case "DELETE_USER":
            // yeni state'i gönderiyoruz
            return {
                ...state,
                users: state.users.filter(user => action.payload !== user.id)
            }
        case "ADD_USER":
            return {
              // eski state'i gönderiyoruz
              ...state,
              users: [...state.users,action.payload]
            }
        
         case "UPDATE_USER":
            return {
              // eski state'i gönderiyoruz
              ...state,
              // YENİ USERS'LERİ DÖNÜYORUZ
              users: state.users.map(
                  // Aşağıdaki kodda temel mantik eğer updateUser'de gönderdiğim id user.id ye === se
                  // Gönderilen id'yi güncellediğim şekilde düzelt diyorum 
                  user => user.id === action.payload.id ? action.payload : user
                  )
            }   
            
        default:
            // eski state dön
            return state
            
    }
}

export class UserProvider extends Component {
    state = {
    
        users: [],
        dispatch: action => {
            //* reducer için güncellenmeyen state ve yapacağımız işlemi veriyoruz state-action
            this.setState(state => reducer(state,action))
        }
    }

    // * GET REQUEST
    componentDidMount = async () => {
      //* get request yapacağımız adresi verdik
      //* await veri gelene kadar beklememizi sağlaar
     const response =  await axios.get("http://localhost:3003/users");
     this.setState({
       //* usersi response.data göre güncelleyeceğimizi söylüyoruz
       users: response.data
     })
    }
    

    render() {
        return (
          // Provide dönme
          <UserContext.Provider value = {this.state}>
              {
              /*<App/> diyebiliriz */ 
              this.props.children
              }
          </UserContext.Provider>
        )
    }
}

// Valueleri kullanmak için state içerisindeki Consumer oluşturmalyıız
const UserConsumer = UserContext.Consumer;

export default UserConsumer;
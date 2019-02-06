import React, {Component, Fragment} from 'react';
import LkPage from "./LkPage";
import {CreateRequest} from "./CreateRequest";
import {MainPage} from "./MainPage"

export const BASE_PATH = 'https://until-stepuha-server.herokuapp.com'
export const LOGIN_PATH = '/login'
export const ALL_PETITION_PATH = '/requests'
export const ALL_USERS_PATH = '/users'
export const BALANCE_PATH = '/balance'

class App extends Component {
    state = {
        name: '',
        password: '',
        lkPage: true
    }
    handleChangeName = event => {
        this.setState({name: event.target.value});
    }
    handleChangePassword = event => {
        this.setState({password: event.target.value});
    }
    handleSubmit = event => {
        event.preventDefault();
        const userData = {
            name: this.state.name,
            password: this.state.password
        };
        CreateRequest({
            path: `${BASE_PATH}${LOGIN_PATH}`,
            method: "POST"
        }, userData).then(response => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('id', response.id);
            console.log("Пользователь аутентифицирован", response);
            this.setState({lkPage: false})
        })
            .catch(() => {
                console.log("Пользователь не аутентифицирован");
            });
    };

    render() {
        const lk = this.state.lkPage;
        return (
            <Fragment>
                {lk ?
                    <MainPage
                        handleChangeName={this.handleChangeName}
                        handleChangePassword={this.handleChangePassword}
                        handleSubmit={this.handleSubmit}
                    />
                    : <LkPage />
                }
            </Fragment>
        )
    }
}

export default App;

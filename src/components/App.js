import React, {Component, Fragment} from 'react';
import LkPage from "./LkPage";
import {CreateRequest} from "./CreateRequest";

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
            path: `https://until-stepuha-server.herokuapp.com/login`,
            method: "POST"
        }, userData).then(response => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('id', response.id);
            localStorage.setItem('myName', this.state.name);
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
                    <div className="fluid-container main-page">
                        <div className="row">
                            <div className="title-form col-10 col-lg-4">
                                <div className="main-title text-center">
                                    <p>Until Stipuha</p>
                                </div>
                                <div className="auth-form">
                                    <form id="addUser" onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Логин</label>
                                            <input className="form-control" name="name" id="exampleInputEmail1"
                                                   aria-describedby="emailHelp"
                                                   placeholder="Enter login" onChange={this.handleChangeName}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputPassword1">Пароль</label>
                                            <input type="password" className="form-control" name="password"
                                                   id="exampleInputPassword1"
                                                   placeholder="Password" onChange={this.handleChangePassword}/>
                                        </div>
                                        <button type="submit" className="btn btn-outline-success">Войти</button>
                                    </form>
                                </div>
                            </div>
                            <div className="main-page_img col-lg-8 text-center">
                                <img src={require('../img/doshirak.png')} alt="doshirak" width="500px"/>
                            </div>
                        </div>
                    </div>
                    : <LkPage/>
                }
            </Fragment>
        )
    }
}

export default App;

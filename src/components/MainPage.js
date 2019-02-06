import React, {Component} from 'react'

export class MainPage extends Component {
    render() {
        return (
            <div className="fluid-container main-page">
                <div className="row">
                    <div className="title-form col-10 col-lg-4">
                        <div className="main-title text-center">
                            <p>Until Stipuha</p>
                        </div>
                        <div className="auth-form">
                            <form id="addUser" onSubmit={this.props.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Логин</label>
                                    <input className="form-control" name="name" id="exampleInputEmail1"
                                           aria-describedby="emailHelp"
                                           placeholder="Enter login" onChange={this.props.handleChangeName}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Пароль</label>
                                    <input type="password" className="form-control" name="password"
                                           id="exampleInputPassword1"
                                           placeholder="Password" onChange={this.props.handleChangePassword}/>
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
        )
    }
}
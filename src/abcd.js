import React, { Component } from 'react'
import './App.css'

export default class ABCD extends Component{

    state={
        button: [{
                name: "Button-one",
                id: 1
            },
            {
                name: "Button-two",
                id: 2
            }
        ],
        name: -1
    }

    handleClick = (index) => {
       
        this.setState({name: (this.state.name === index ? -1 : index)})
        
    }


    render(){

        const { button } = this.state 

        return (
            <div>
            {button.map((user, key) => {
                return(
                    <div key={key} className={this.state.name === key ? 'show' : ''} >
                        <button onClick={() => this.handleClick(key)} className="button">{user.name}</button>
                        <p className="none">Hello World</p>
                 

                        <br/>
                        <br/>
                    </div>
                )
            })}
            </div>
        )
    }

}
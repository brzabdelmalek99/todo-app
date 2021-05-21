import React, { Component } from "react";
import {TextField, FormGroup, FormControlLabel, Checkbox} from '@material-ui/core'

class TodoFilters extends Component{

    constructor({rafrechirList}){
        super()
        this.state = {
            nouveau: true,
            encours: true,
            terminee: true,
            datedeb: "",
            datefin: ""
        }
    }

    changeChoix = (event) => {
        this.setState({ [event.target.name]: event.target.checked })
    };

    componentDidUpdate(prevProps, prevState){
        if(prevState!==this.state){
            this.props.rafrechirList({
                nouveau: this.state.nouveau,
                encours: this.state.encours,
                terminee: this.state.terminee,
                datedeb: this.state.datedeb,
                datefin: this.state.datefin
            })
        }
    }

    render(){
        return (
        <>
        <h1>Filtrer la liste :</h1>
          <div className="container">
            <div className="row">
                <div className="span6" style={{width: "18rem", margin: "20px", marginLeft:"50px"}}>
                    <h4>Par Etat :</h4>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={this.state.nouveau} onChange={this.changeChoix} name="nouveau" />}
                            label="Nouvelles"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.encours} onChange={this.changeChoix} name="encours" />}
                            label="En cours"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={this.state.terminee} onChange={this.changeChoix} name="terminee" />}
                            label="Terminées"
                        />
                    </FormGroup>
                </div>
                <div className="span6" style={{width: "18rem", margin: "20px"}}>
                    <h4>Par Date :</h4>
                    <div className="container">
                        <div className="row" style={{alignContent: "center", marginTop:"30px"}}>
                            <div className="col-6">
                                <p>Date de debut :</p>
                            </div>
                            <div className="col-6">
                                <TextField type='Date' value={this.state.datedeb} onChange={(e) => {this.setState({ datedeb : e.target.value })}} />
                            </div>
                        </div>
                        <div className="row" style={{alignContent: "center", marginTop:"10px"}}>
                            <div className="col-6">
                                <p>Date de fin :</p>
                            </div>
                            <div className="col-6">
                                <TextField type='Date' value={this.state.datefin} onChange={(e) => {this.setState({ datefin : e.target.value })}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </>
      );
    }
}

export default TodoFilters
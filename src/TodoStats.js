import { PieChart, Pie, Tooltip } from 'recharts';
import React from "react";
import { Component } from 'react';

class TodoStats extends Component {

    constructor(props){
        super(props)
        this.state = {donnees: []}
    }

    updateDonnees = () => {
        const parse = [0,0,0]
        this.props.data.forEach(elem => {
            parse[(elem.etat)-1]++
        })

        this.setState( {
            donnees : [
            { 
                name: "Nouvelles",
                value:  parse[0]
            },
            { 
                name: "En cours",
                value: parse[1]
            },
            { 
                name: "Terminées",
                value: parse[2]
            }
            ]
        })
    } 

    componentDidUpdate(prevProps, prevState){
        if(prevProps.data!==this.props.data){
            this.updateDonnees()
        }
    }

    componentDidMount(){ 
        this.updateDonnees()
    }

    render(){
        return (
            <>
        <h1>Statistique du resultat :</h1>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={this.state.donnees}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
        </>
        )
    }
}

export default TodoStats 

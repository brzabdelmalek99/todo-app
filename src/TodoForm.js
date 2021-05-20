import React, { useState } from "react";
import { TextField } from '@material-ui/core'

const TodoForm = ({addTodo}) => {

    const [Titre, setTitre] = useState('')
    const [Description, setDescription] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!Titre){
            alert("Champs obligatoir")
            return
        }

        addTodo(
            {
                "Titre" : Titre,
                "Description": Description, 
                "Etat": 1, 
                "Date": new Date()
            }
        )
            
        setTitre('')
        setDescription('')
    }
        
    return(
            <div style={{width:"300px"}}>
                <h1>
                    Add todo :
                </h1>
                <form className="add-form" onSubmit={onSubmit}>
                    
                <div className="container">
                        <div className="row" style={{alignContent: "center", marginTop:"30px"}}>
                            <div className="col-6">
                                <p>Titre</p>
                            </div>
                            <div className="col-6">
                            <TextField 
                                    value={Titre}
                                    onChange={(e) => setTitre(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row" style={{alignContent: "center", marginTop:"10px"}}>
                            <div className="col-6">
                                <p>Description</p>
                            </div>
                            <div className="col-6">
                            <TextField 
                                    value={Description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <input type='submit' value='Creer' className='btn btn-success' style={{marginTop:"20px", width: "100%"}}/>
                </form>
            </div>
    )
}

export default TodoForm
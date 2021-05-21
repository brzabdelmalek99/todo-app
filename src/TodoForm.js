import React, { useState } from "react";
import { TextField } from '@material-ui/core'

const TodoForm = ({addTodo}) => {

    const [titre, setTitre] = useState('')
    const [description, setDescription] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!titre){
            alert("Champs obligatoir")
            return
        }

        addTodo(
            {
                titre : titre,
                description : description, 
                etat : 1, 
                date : new Date()
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
                                    value={titre}
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
                                    value={description}
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
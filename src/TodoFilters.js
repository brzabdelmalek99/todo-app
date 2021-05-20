import React, { useState } from "react";
import {TextField, FormControl, FormGroup, FormControlLabel, Checkbox} from '@material-ui/core'

const TodoFilters = ({rafrechirList}) => {

    const [choix, setChoix] = useState({
        un: true,
        deux: true,
        trois: true,
    });

    const [datedeb, setDatedeb] = useState("")
    const [datefin, setDatefin] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        rafrechirList({
            "un": choix.un,
            "deux": choix.deux,
            "trois": choix.trois,
            "deb": datedeb,
            "fin": datefin
        })
    }

    const handleChange = (event) => {
        setChoix({ ...choix, [event.target.name]: event.target.checked });
    };

    return (
        <>
        <h1>Filtrer la liste :</h1>
        <FormControl component="fieldset">
          <form onSubmit={onSubmit}>
          <div className="container">
            <div className="row">
                <div className="span6" style={{width: "18rem", margin: "20px"}}>
                    <h4>Par Etat :</h4>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={choix.un} onChange={handleChange} name="un" />}
                            label="Nouvelles"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={choix.deux} onChange={handleChange} name="deux" />}
                            label="En cours"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={choix.trois} onChange={handleChange} name="trois" />}
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
                                <TextField type='Date' value={datedeb} onChange={(e) => setDatedeb(e.target.value)} />
                            </div>
                        </div>
                        <div className="row" style={{alignContent: "center", marginTop:"10px"}}>
                            <div className="col-6">
                                <p>Date de fin :</p>
                            </div>
                            <div className="col-6">
                                <TextField type='Date' value={datefin} onChange={(e) => setDatefin(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input type='submit' value='Enregistrer' className='btn btn-success' style={{width: "100%"}}/>
          </div>
          </form>
        </FormControl>
        </>
      );
}

export default TodoFilters
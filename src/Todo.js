import { Button } from 'react-bootstrap';

const Todo = ({id, titre, description, etat, date, deleteTodo, incrementerEtat}) => {
    return (
        <div className="span6 card" onDoubleClick={() => incrementerEtat(id)} style={{margin: "10px"}}>
            <div className="card-body">
                <h5 className="card-title">Todo : {titre}</h5>
                <p className="card-text">Description : {description}</p>
                <p className="card-text">
                    Etat :
                    {etat===1 && " Nouvelle " }
                    {etat===2 && " En cours " }
                    {etat===3 && " Terminée " }
                </p>
                <p className="card-text">Date : {(new Date(date).toDateString())}</p>
                <Button className="btn btn-danger" onClick={()=>deleteTodo(id)} style={{width:"100%"}}>Delete</Button>   
            </div>
        </div>
    );
}

export default Todo

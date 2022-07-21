import React from "react"
import { Button, Col } from "react-bootstrap"
import { DeletePlay } from "../api/playsData";

const playCard = (props) => {
    const { id, title, DateTime, cost, Description, Tag, players } = props.plays;

    const renderPlayers = players.map((player, i) => {
        return (
            <div key={player.id} className="d-flex justify-content-center small text-warning mb-2">
                <div key={i + 1} >{player.name}</div>
                <div key={i + 100}>- {player.paid}</div>
            </div>);
    })

    async function deleteMe(id, dateTime) {
        if (id) {
            let text = `Are you sure want to delete play on ${dateTime}?`
            if (window.confirm(text)) {
                // const response = await api.delete(`/Plays/${id}`);
                // if (response.status == "200" || response.status == "201") {
                //     //refresh card
                //      await props.updatePlayList();
                // }

                const response = DeletePlay(id);
                if (response) {
                    //refresh card
                    console.log(response)
                     await props.updatePlayList();
                }
            }
        }
    }

    return (
        <div className="col mb-5">
            <div className="card h-100">
                <Col className="col-md-1">
                    <div style={{cursor:"pointer"}} onClick={(e)=>deleteMe(id, DateTime)}><i className="bi-trash"></i></div>
                </Col>
                <div className="badge bg-dark text-white position-absolute" style={{ "top": "0.5rem", "right": "0.5rem" }}>{DateTime}
                </div>

                {/* <img className="card-img-top" src={imageUrl} /> */}
                <div className="card-body p-4">
                    <div className="text-center">
                        <h5 className="fw-bolder" style={{ marginTop: "1rem" }}>{title}</h5>
                        {
                            renderPlayers
                        }
                        {/* <span className="text-muted text-decoration-line-through">$20.00</span> */}
                        Total cost: ₹{cost}
                    </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Edit</a></div>
                </div>
                {/* <Button bsStyle="link">Link</Button>    */}
            </div>
        </div>

    )
}

export default playCard
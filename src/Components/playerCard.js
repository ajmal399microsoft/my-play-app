import React from "react"
import { Button,Col } from "react-bootstrap"
import api from "../api/config"

const playerCard = (props) => {

    const { id,name, balance, isAdmin, matchPlayed, imageUrl } = props.player

    
    async function deleteMe(id, name) {
        if (id) {
            let text = `Are you sure want to delete the player ${name}?`
            if (window.confirm(text)) {
                const response = await api.delete(`/Users/${id}`);
                if (response.status == "200" || response.status == "201") {
                    //refresh card
                     await props.updatePlayerList();
                }
            }
        }
    }

    return (
        <div className="col mb-5">
            <div className="card h-100">
                <div className="badge bg-dark text-white position-absolute" style={{ cursor: "pointer" }} onClick={(e) => deleteMe(id, name)}><i className="bi-trash"></i></div>
                <div className="badge bg-dark text-white position-absolute" style={{ "top": "0.5rem", "right": "0.5rem" }}>{(isAdmin) ? "Admin" : "Player"}
                </div>
                <img className="card-img-top" src={imageUrl} />
                <div className="card-body p-4">
                    <div className="text-center">
                        <h5 className="fw-bolder">{name}</h5>
                        <div className="d-flex justify-content-center small text-warning mb-2">
                            Match Played: {matchPlayed}
                            {/* <div className="bi-star-fill"></div>
                            <div className="bi-star-fill"></div>
                            <div className="bi-star-fill"></div>
                            <div className="bi-star-fill"></div> */}
                        </div>
                        {/* <span className="text-muted text-decoration-line-through">$20.00</span> */}
                        Balance: ₹{balance}
                    </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center"><a className="btn btn-outline-dark mt-auto" href="#">Details</a></div>
                </div>
                {/* <Button bsStyle="link">Link</Button>    */}
            </div>
        </div>

    )
}

export default playerCard
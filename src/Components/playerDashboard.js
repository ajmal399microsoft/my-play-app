
import React from "react"
import PlayerCard from "./playerCard"
import {Row, Button} from "react-bootstrap"
import {Link} from "react-router-dom"

const playerDashboard = (props) => {

    const renderPlayerCard = props.players.map((player, i) => {
        return <PlayerCard key={player.id} player={player} updatePlayerList={props.updatePlayerList} />
    })

    return (
        <div>
            <Row >
                <div className="col-xs-12" style={{ margin: "3px" }}>
                    <Link to="/createUser">
                        <Button  className="col-md-2 float-right" >Add new user</Button>
                    </Link>
                </div>
            </Row>
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {
                    renderPlayerCard
                }
            </div>

        </div>

    )
}



export default playerDashboard

import React from "react"
import PlayCard from "./playCard"
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'


const playListDashboard = (props) => {

    const renderPlayCard = props.plays.map((play, i) => {
        return <PlayCard key={play.id} plays={play} />
    })

    console.log(props)
    
    return (
        <div>
            <div className="row">
                <div className="col-xs-12" style={{ margin: "3px" }}>
                    <Link to="/createplay">
                        <Button players={props.players} className="col-md-2 float-right" >Add new play</Button>
                    </Link>
                </div>
            </div>
            <div className="row gx-4 gx-lg-5 row-cols-md-3 row-cols-xl-4 justify-content-center">

                {
                    renderPlayCard
                }
            </div>
        </div>
    )
}



export default playListDashboard
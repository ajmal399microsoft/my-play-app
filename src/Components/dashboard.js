import PlayerCard from "./playerCard"
import { Container, Row, Col, Button } from 'react-bootstrap'
import PlayerDashboard from "./playerDashboard"
import PlayListDashboard from "./playListDashboard"

const dashboard = (props) => {

    return (
        <div>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <PlayerDashboard players={props.players} updatePlayerList={props.updatePlayerList} />
                </div>
            </section>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    Plays
                    {<PlayListDashboard updatePlayList={props.updatePlayList} plays={props.plays} players={props.players}/>}
                </div>
            </section>
        </div>
    )
}

export default dashboard;
import { renderMatches } from "react-router-dom"
import { Row, Table,td } from "react-bootstrap"

const playerTable = (props) => {

    const renderPlayerGrid = props.players.map((player, i) => {
        return<tr key={player.id}>    
        <td> {player.name }</td>  
        <td> {player.balance }</td>  
        <td> {player.matchPlayed }</td>  
        </tr>
    })

    return (<>
    <Table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Balance</th>
                <th>MatchPlayed</th>
            </tr>
        </thead>
        <tbody>
           {
            renderPlayerGrid
           }
        </tbody>
    </Table>
    </>)
}

export default playerTable
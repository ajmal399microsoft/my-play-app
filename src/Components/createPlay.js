import { Container, Button, Table, Row, Col, Form } from "react-bootstrap";
import { GetFormatedDate } from "../helper"
import { Link, useNavigate } from "react-router-dom";
import api from "../api/config"
import React, { useState } from "react";
import { v4 as uuid } from "uuid"
import { Toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {ValueNotNull,ReturnValueOrDefaultZeero} from "../helper"


function CreatePlay(props) {
    const [selectedPlayers, setSelectedPlayers] = useState([])
    const [selectedUserPaid, setSelectedUserPaid] = useState(0)
    const [selectUserId, setSelectUserId] = useState(0)
    const [playState, setPlayState] = useState()

    const navigate = useNavigate();

    if (props.lastPlay && !playState) {
        setPlayState({
            playName: props.lastPlay.title,
            playCost: props.lastPlay.cost,
            dateTime: GetFormatedDate(new Date())
        })
    }

    const drpPlayers = () => {
        let pls = props.players.filter(x => {
            return (selectedPlayers.length > 0) ? !(selectedPlayers.some(y => y.id == x.id)) : true
        })

        if (pls.length > 0) {
            return pls.map((player, i) => {
                return <option key={player.id} value={player.id}>{player.name}</option>
                // return <Dropdown.Item key={player.id} id={player.id} eventKey={player.id}>{player.name}</Dropdown.Item>
            })
        }

    };


    const addPlayerToTheList = () => {
        if (playState && playState.playCost <= 0) {
            alert("Please fill the playcost to proceed.")
            return false;
        }

        if (selectUserId) {
            let pr = props.players.filter(x => x.id == selectUserId);
            if (pr.length > 0) {
                pr[0].paid = selectedUserPaid;

                let su = selectedPlayers.filter(y => y.id == pr[0].id);

                if (su.length > 0) {
                    alert("User " + pr[0].name + " already added to the list.");
                    return;
                }
                else {
                    setSelectedPlayers([...selectedPlayers, pr[0]]);
                }
            }
            setSelectUserId(0);
        }

    }

    const deletePlayerRow = (player) => {
        let sp = selectedPlayers.filter(x => x.id != player.id);
        setSelectedPlayers(sp);
    }
    const renderTable = selectedPlayers.map((player, i) => {
        return <tr key={player.id}>
            <td>{i + 1}</td>
            <td>{player.name}</td>
            <td>{player.balance}</td>
            <td>{(playState) ? Math.round(playState.playCost / selectedPlayers.length) : 0}</td>
            <td>{player.paid}</td>
            <td>
                <Button onClick={(e) => deletePlayerRow(player)}>
                    <i className="bi-trash"></i>
                </Button>
            </td>
        </tr>
    });

    const getTotalPaidAmount = () => {
        if (selectedPlayers) {
            let totalPaidAmount = 0;
            selectedPlayers.map(x => {
                totalPaidAmount = Number(x.paid) + totalPaidAmount;
                return x;
            })
            return totalPaidAmount;
        } else {
            return 0;
        }
    }

    const getTotalBalanceAmount = () => {
        let pa = getTotalPaidAmount();
        if (pa) {
            return Number(playState.playCost) - pa;
        } else {
            return 0
        }
    }

    const savePlayInformation = async () => {

        if (!playState || playState.playName === "" || playState.playCost === "") {
            alert("All fields are mandatory.");
            return;
        }

        if (!selectedPlayers) {
            alert("Please select atleast one player.");
            return;
        }

        const playerList = selectedPlayers.map(pl => {
            let toPayAmount = Math.round(playState.playCost / selectedPlayers.length);
            let balance = Number(pl.balance) - (toPayAmount - pl.paid);
            pl.balance = balance;
            pl.matchPlayed = Number(pl.matchPlayed) + 1;
            return pl;
        })


        let playObj = {
            id: uuid(),
            title: playState.playName,
            DateTime: GetFormatedDate(new Date()),
            cost: playState.playCost,
            Description: new Date(),
            Tag: "Paid play",
            players: playerList
        }

        navigate('/');
        // { id: 4, title: "Turf Edavannappara", DateTime: GetFormatedDate(new Date()), cost: 1000, Description: "", Tag: "Paid play", players: players }
        const response = await api.post("/Plays", playObj);
        if (response.status == "200" || response.status == "201") {
            playerList.map(async (player) => {
                await api.put(`/Users/${player.id}`, player);
            })
        }
        await props.updatePlay();
        await props.updatePlayerList();
    }

    return (
        <div className="border">
            <ToastContainer />
            <br />

            <Container>
                Play Description:
                <br />
                <Row>
                    <Col >
                        <Form.Control type="text"
                            placeholder="Title"
                            defaultValue={(props.lastPlay) ? props.lastPlay.title : ""}
                            onChange={e => setPlayState({ ...playState, playName: e.target.value })} />
                    </Col>
                    <Col>
                        <Form.Control type="number"
                            placeholder="Total play cost"
                            defaultValue={
                                ReturnValueOrDefaultZeero(props?.lastPlay?.cost)
                            }
                            onChange={e => { setPlayState({ ...playState, playCost: e.target.value }); }} />
                    </Col>
                    <Col className="col-md-1">
                        {/* <Button onClick={addPlayerToTheList} className="default" variant="outline-dark"><i className="bi bi-person-plus-fill"></i></Button> */}
                    </Col>
                </Row>
            </Container>

            <br /><br />
            <Container>
                Add Players:
                <Row>
                    <Col >
                        <Form.Select aria-label="Default select" onChange={e => { setSelectUserId(e.target.value) }}>
                            <option>Select Player</option>
                            {
                                drpPlayers()
                            }
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Control type="number"
                            placeholder="Paid amount"
                            // defaultValue={selectedUserPaid}
                            onChange={e => {
                                setSelectedUserPaid(e.target.value);
                            }}

                        />
                    </Col>
                    <Col className="col-md-1">
                        <Button onClick={addPlayerToTheList} className="default" variant="outline-dark"><i className="bi bi-person-plus-fill"></i></Button>
                    </Col>
                </Row>
                <br />

                <div className="row">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Balance</th>
                                <th>ToPay</th>
                                <th>Paid</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                renderTable
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>

            <Container>
                <Row>
                    <Col className="text-right">
                        <b> Total Paid: {getTotalPaidAmount()}</b>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-right">
                        <b> Balance amount: {getTotalBalanceAmount()}</b>
                    </Col>
                </Row>
            </Container>
            <Container className="text-center">
                <Link to="/">
                    <Button className="btn-danger">Cancel</Button>
                </Link>
                {
                    (selectedPlayers.length > 0) ?
                        <Button onClick={savePlayInformation} className="btn-success" style={{ marginLeft: "3px" }}>Save changes</Button>
                        : ""
                }
            </Container>

        </div>

    );
}

export default CreatePlay
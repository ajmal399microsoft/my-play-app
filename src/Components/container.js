import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css';

import React,{ useState, useEffect } from "react";
import PlayerCard from "./playerCard"
import { Container, Row, Col, Button } from 'react-bootstrap'
import PlayerDashboard from "./playerDashboard"
import PlayListDashboard from "./playListDashboard"
import { GetFormatedDate } from "../helper"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreatePlay from "./createPlay"
import Dashboard from "./dashboard"
import CreateUser from "./createUser"
import api from "../api/config"
import HeaderContainer from "./headerContainer";
const MainContainer = () => {
    const [players, setPlayers] = useState([]);
    const [plays, setPlay] = useState([]);

    //Retrieve contacts
    const retrieveUsers = async () => {
        const response = await api.get("/users");
        return response.data;
    }

    //Retrieve plays
    const retrievePlayList = async () => {
        const response = await api.get("/plays");
        if(response.data) {
          return  response.data.sort(function(a,b){
                return new Date(b.DateTime) - new Date(a.DateTime);
              })
        }
    }

    useEffect(() => {
        const getAllUsers = async () => {
            const allPlayers = await retrieveUsers();
            
            if (allPlayers)
                setPlayers(allPlayers);
        }

        const getPlayList = async () => {
            const playList = await retrievePlayList();
            
            if (playList)
                setPlay(playList);
        }
        
        getAllUsers();
        getPlayList();

        console.log(players,plays)
    }, [])

    console.log("container")

    return (
        <>
            <BrowserRouter>
                <Container>
                <HeaderContainer></HeaderContainer>
                    <Routes>
                        
                        <Route path="/" element={
                            <Dashboard plays={plays} players={players}></Dashboard>
                        } />

                        <Route path="/createplay" element={
                            <div>
                                {
                                    (plays)?  <CreatePlay
                                    players={players}
                                    lastPlay={(plays.length > 0) ? plays[plays.length - 1] : undefined} />
                       :<Dashboard plays={plays} players={players}></Dashboard>

                                }
                                    </div>
                        } />
                        <Route path="/createUser" element={
                            <div>
                                <CreateUser />
                            </div>
                        } />

                    </Routes>
                </Container>
            </BrowserRouter>

        </>

    )
}


export default MainContainer
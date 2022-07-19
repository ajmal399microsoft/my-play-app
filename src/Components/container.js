import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
// import '.../db.json'

import React, { useState, useEffect } from "react";
import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreatePlay from "./createPlay"
import Dashboard from "./dashboard"
import CreateUser from "./createUser"
import api from "../api/config"
import HeaderContainer from "./headerContainer";
const MainContainer = () => {
    const [players, setPlayers] = useState([]);
    const [plays, setPlay] = useState([]);
    const [allJsonData,setAllJson]=useState([])

    //Retrieve contacts
    const retrieveUsers = async () => {
        const response = await api.get("/users");
        return response.data;
    }

    //Retrieve plays
    const retrievePlayList = async () => {
        const response = await api.get("/plays");
        if (response.data) {
            return response.data.sort(function (a, b) {
                return new Date(b.DateTime) - new Date(a.DateTime);
            })
        }
    }

    const updatePlayList = async () => {
        const playList = await retrievePlayList();

        if (playList)
            setPlay(playList);
    }

    const updatePlayerList = async () => {
        const allPlayers = await retrieveUsers();

        if (allPlayers)
            setPlayers(allPlayers);
    }

    useEffect(() => {
        
        updatePlayerList();
        updatePlayList();
        setAllJsonObject();
    }, [])

    const setAllJsonObject=()=>{
        fetch('db.json'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            return response.json();
          })
          .then(function(myJson) {
            setAllJson(myJson)
          });
      }
   
    return (
        <>
            <BrowserRouter>
                <Container>
                    <HeaderContainer></HeaderContainer>
                    <a href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(allJsonData)
            )}`}
                        download="filename.json">
                        {`Download Json`}
                    </a>
                    <Routes>

                        <Route path="/" element={
                            <Dashboard plays={plays} players={players} updatePlayList={updatePlayList} updatePlayerList={updatePlayerList}></Dashboard>
                        } />

                        <Route path="/createplay" element={
                            <div>
                                {
                                    (plays) ? <CreatePlay  players={players} updatePlay={updatePlayList} updatePlayerList={updatePlayerList} lastPlay={(plays.length > 0) ? plays[plays.length - 1] : undefined} />
                                        : <Dashboard plays={plays} players={players} updatePlayList={updatePlayList}></Dashboard>

                                }
                            </div>
                        } />
                        <Route path="/createUser" element={
                            <div>
                                <CreateUser players={players} />
                            </div>
                        } />

                    </Routes>
                </Container>
            </BrowserRouter>

        </>

    )
}


export default MainContainer
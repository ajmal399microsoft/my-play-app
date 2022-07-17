import React from "react";
import { Container, Form, Row, Button, FormLabel } from "react-bootstrap";
import { v4 as uuid } from "uuid"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/config"


function CreateUser(props) {

    const imageUrls = [
        "https://media.gettyimages.com/photos/cristiano-ronaldo-of-portugal-celebrates-after-scoring-their-sides-picture-id1325105287?s=2048x2048",
        "https://i.insider.com/5fd350fae00bce00188bab82?width=1000&format=jpeg&auto=webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqAOYR-9kcIw6NhA3Kk7-5itNXBi6GIYS3Im_pkTeFyBM32nqwkkix6WBYnXvKKzDmGKg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb10GfAcnCmgGD27E3jwt-IY6HQ3vyu6xxd2SSbm0_oP9yBwWv1egsiSArjoGg5KJ4RzI&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib9vTGZfgGFHe3sl17M3FOFmU9YmHgRinslfWc7G2CoHDuRy8ZMeXMU4-MVMzw9k-wyg&usqp=CAU",
        "https://i.insider.com/5de52117fd9db21511261fba?width=750&format=jpeg&auto=webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTShGHX-oKFv4m1zB6zzbOulNAKiQJ53WyYToSBX1wiCC_ls6Q4ozFjC4dzTXzXsq4UJUY&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp-b55n6Fujlr_OUgWNWDf5k0dJFeEywRQ4Q&usqp=CAU",
        "https://images2.minutemediacdn.com/image/fetch/w_850,h_560,c_fill,g_auto,f_auto/https%3A%2F%2Fbayernstrikes.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2017%2F07%2F1397214245-850x560.jpeg",
    ]
    const user = {
        id: uuid(),
        name: "",
        balance: 0,
        isAdmin: false,
        matchPlayed: 0,
        mobNumber: 0,
        imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)]
    }

    let navigate = useNavigate();
    const saveUser = async () => {
        if (!user || user.name === "" || user.balance === "") {
            alert("All fields are mandatory.");
            return;
        }

        let anyUserWithSameName = false;
        for (var i = 0; i < props.players.length; i++) {
            if (props.players[i].name == user.name) {
                anyUserWithSameName = true;
                break;
            }
        }
        if (anyUserWithSameName) {
            alert(`The user name: ${user.name} not available, please try with different name.`)
            return
        }

        const response = await api.post("/Users", user);
        navigate('/');
    }

    return (
        <Container style={{ padding: "10%" }} className="border">
            <FormLabel>Player Name:</FormLabel>
            <Row>
                <Form.Control type="text" onChange={e => user.name = e.target.value} />
            </Row>
            <FormLabel>Mob Number:</FormLabel>

            <Row>
                <Form.Control type="text" onChange={e => user.mobNumber = e.target.value} />
            </Row>
            <FormLabel>Initial Balance:</FormLabel>

            <Row>
                <Form.Control type="number" defaultValue={0} onChange={e => user.balance = e.target.value} />
            </Row>
            <FormLabel>Match Played:</FormLabel>

            <Row>
                <Form.Control type="number" defaultValue={1} onChange={e => user.matchPlayed = e.target.value} />
            </Row>

            <div className="text-center" style={{ margin: "10px" }}>
                <Link to="/">
                    <Button className="btn-danger">Cancel</Button>
                </Link>

                <Button className="btn-success" style={{ marginLeft: "3px" }} onClick={saveUser}>Save changes</Button>
            </div>
        </Container>
    )
}

export default CreateUser;
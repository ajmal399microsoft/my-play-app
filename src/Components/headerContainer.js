import { Toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Button, Container, Navbar, NavbarBrand,Nav } from "react-bootstrap"

const HeaderContainer = () => {


    return (
        <>
            <ToastContainer />
            <Navbar bg="dark" variant="dark" className="justify-content-center">
                <Container>
                   
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Add Players</Nav.Link>
                        <Nav.Link href="#pricing">Add Play Information</Nav.Link>
                    </Nav>
                    <Navbar.Brand>
                        Turaf players information can handle here.
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}


export default HeaderContainer
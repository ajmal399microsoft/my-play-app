import { Toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Button, Container, Navbar, NavbarBrand, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

const HeaderContainer = () => {


    return (
        <>
            <ToastContainer />
            <Navbar bg="dark" variant="dark" className="justify-content-center">
                <Container>

                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="createuser" >Add Players</Nav.Link>
                        <Nav.Link href="createplay">Add Play Information</Nav.Link>
                    </Nav>
                    {/* <Navbar.Brand>
                        Turaf players information can handle here.
                    </Navbar.Brand> */}
                </Container>
            </Navbar>
        </>
    )
}


export default HeaderContainer
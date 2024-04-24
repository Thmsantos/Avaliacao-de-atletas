import { useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import Logo from "./logo.png";
import Profile from "./profile.png";
import Off from "./off.png";
import "./Header.css";
import { Link } from 'react-router-dom'

//(Para não encher a porra do meu saco)Essa parte do styled-components serve para a responsividade e de como as informações que são ativadas no menu iram aparacer.
const StyledHeader = styled.header`
  background-color: #198754;
  width: 100%;
  padding: 10px 12px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sesi-image {
    width: 190px;
    height: 70px;
  }
  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
  }
  @media screen and (max-width: 968px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
    }
    h1 {
      display: none;
    }
    .main1 {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
  @media screen and (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
    }
    h1 {
      display: none;
    }
    .main1 {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .icons {
      display: flex;
      position: absolute;
      width: 35px;
      height: 35px;
      margin-top: 145px;
      padding-top: 10px;
      justify-content: center;
    }
    .logo {
      display: flex;
      position: absolute;
      align-items: flex-end;
      justify-content: center;
      margin-top: 15px;
    }
    .title h2 {
      margin-top: 30%;
      text-align: center;
      color: #ffffff;
      margin-left: 40px;
    }
    .title p {
      text-align: center;
      color: #ffffff;
      opacity: 1;
      margin-top: 10px;
      margin-right: 15px;
    }
  }
  @media screen and (max-width: 280px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
    }
    h1 {
      display: none;
    }
    .main1 {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .icons {
      display: flex;
      position: absolute;
      width: 35px;
      height: 35px;
      margin-top: 145px;
      padding-top: 10px;
      justify-content: center;
    }
    .logo {
      display: flex;
      position: absolute;
      align-items: flex-end;
      justify-content: center;
      margin-top: 15px;
    }
    .title h2 {
      margin-top: 30%;
      text-align: center;
      color: #ffffff;
      margin-left: 40px;
    }
    .title p {
      width: 261px;
      height: 19px;
      text-align: center;
      color: #ffffff;
      opacity: 1;
      margin-top: 10px;
      margin-right: 15px;
    }
    .sesi-image {
      width: 150px;
      height: 50px;
    }
  }
`;
const NavManu = styled.ul`
  list-style: none;
  display: flex;
  @media screen and (max-width: 968px) {
    display: ${(props) => (props.isToggleOpen ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
  }
`;




const Header = (props) => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };
  return (
    <>
      <StyledHeader>
        <img className="sesi-image" src={Logo} />
        <h1 className="portal">PORTAL ESPORTE</h1>
        <NavManu isToggleOpen={isToggleOpen}>
          <div className="main1">
            <div className="logo">
              <img src={Profile} alt="logo" width="55px" height="57px" />
            </div>
            <div className="title">
              <h2 style={{
                fontSize : 20,
              }}>{props.nome}</h2>
              <p>Perfil : {props.cargo}</p>
            </div>

            <div className="icons">
              <Link to="/">
                <img className="x" src={Off} />
              </Link>
            </div>
          </div>
        </NavManu>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />
      </StyledHeader>
    </>
  );
};

export default Header;
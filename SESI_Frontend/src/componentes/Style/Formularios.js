import styled from "styled-components";

const Formulario = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;
const ContainerButton = styled.div`
  display: flex;
  flex-direction: flex-start;
  align-items: center;
  grid-column: span 2;

  @media (max-width: 800px) {
    grid-column: span 1;
  }
`;



export {
  Formulario,
  ContainerButton,
};

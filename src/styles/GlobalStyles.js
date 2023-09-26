import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    :root{
  --toastify-icon-color-success: white;
  --toastify-icon-color-error: white;
}

    * {
        padding: 0;
        margin: 0;
        outline: none;
        box-sizing: border-box;
    }

    body {
        font-family: sans-serif;
        color: ${colors.primaryDarkColor};
        background-color: ${colors.primaryDarkColor};
    }

    html,body, #root {
        height: 100%;
    }

    button {
      transition: all .3s;
        cursor: pointer;
        background-color:${colors.primaryColor};
        border: none;
        padding: 10px 20px;
        color: #fff;
        border-radius: 4px;
        font-weight: 700;
    }

    button:hover {
      color: yellow;
      opacity: 80%;
    }

    a {
        text-decoration: none;
    }

    ul {
        list-style: none;
    }

    body .Toastify .Toastify__toast-container .Toastify__toast--success {
  background: ${colors.successColor};
  color: white;
}
 
.Toastify__progress-bar--success {
  background: white;
}
 
 
 
body .Toastify .Toastify__toast-container .Toastify__toast--error {
  background: ${colors.errorColor};
  color: white;
}

    .Toastify__progress-bar--error {
  background: white;
}

`;

export const Container = styled.section`
  max-width: 500px;
  background-color: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

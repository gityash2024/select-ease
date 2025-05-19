/* GlobalScrollbarStyles.js */
import { createGlobalStyle } from 'styled-components';

const GlobalScrollbarStyles = createGlobalStyle`
  /* For Webkit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f9fafb;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #026283;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #015272;
  }

  /* For Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #026283 #f9fafb;
  }

  /* For Edge and IE */
  body {
    -ms-overflow-style: none;
  }
`;


export default GlobalScrollbarStyles;
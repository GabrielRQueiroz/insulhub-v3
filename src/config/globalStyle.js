import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
   :root {
   }

   * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;

      font-family: 'Mulish', sans-serif;
   }

   body {
      color: ${({ whiteText }) => (whiteText ? '#A4A6B3' : '#070707')};
   }

   #root {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
   }
`;

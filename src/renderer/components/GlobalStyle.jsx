import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgb(222, 222, 222);
    }
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    ::-webkit-scrollbar-corner {
        background-color: transparent;
    }
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
`

export default GlobalStyle
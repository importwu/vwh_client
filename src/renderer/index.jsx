import React from 'react'
import ReactDOM from 'react-dom'
import OptionsPanel from '@components/optionsPanel/index'
import GlobalStyle from '@components/GlobalStyle'

const options = {
    label: '原材料',
    items: [
        {name: '型材'},
        {name: '隔热条'},
        {name: '胶条'},
        {name: '毛条'},
        {name: '五金件'},
        {name: '型材'},
        {name: '隔热条'},
        {name: '胶条'},
        {name: '毛条'},
        {name: '五金件'},
        {name: '型材'},
        {name: '隔热条'},
        {name: '胶条'},
        {name: '毛条'},
        {name: '五金件'},
    ]
}

ReactDOM.render(
    <>
        <GlobalStyle/>
        <OptionsPanel options={options} onItemClick={(e) => console.log(e)}/>
        <OptionsPanel options={options} onItemClick={(e) => console.log(e)}/>
    </>,
    document.getElementById('app')
)

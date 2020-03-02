import React from './node_modules/react'
import styled from './node_modules/styled-components'


const OptionsPanel= styled(({className, options, onItemClick}) => {

    const Header = styled.div`
        height: 30px;
        background-color: rgb(242, 242, 242);
        border-bottom: 1px solid rgb(219, 219, 219);
    `
    const Title = styled.span`
        margin-left: 15px;
        font-size: 14px;
        font-weight: 400;
        color: rgb(91, 107, 115);
        line-height: 30px;
    `

    const List = styled.div`
        height: 270px;
        font-size: 12px;
        font-weight: 400;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: rgb(91, 107, 115);
        overflow: hidden auto;
    `

    const Item = styled.div`
        height: 25px;
        padding-left: 20px;
        line-height: 25px;
        cursor: pointer;
        &:hover {
            background-color: rgb(242, 242, 242);
        }
    `

    return (<div className={className}>
        <Header>
            <Title>{options.label}</Title>
        </Header>
        <List>
            {options.items.map(item => <Item onClick={onItemClick} >{item.name}</Item>)}
        </List>
    </div>)
}) `
    width: 240px;
    height: 300px;
    border: 1px solid rgb(219, 219, 219);
    user-select: none;
`

export default OptionsPanel
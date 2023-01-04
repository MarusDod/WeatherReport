import styled from 'styled-components';
import React from 'react'

interface PopupProps {
    enabled: boolean,
    color?: string,
    message: string,
}

const Popup = styled.div.attrs((props: PopupProps) => props)`
        top: 20px;
        background-color: ${(props) => props.color ?? "green"};
        width: 100px;
        text-align: center;
`
export default Popup
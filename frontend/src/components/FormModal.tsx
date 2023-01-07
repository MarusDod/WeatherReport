import React, { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styled, { keyframes } from "styled-components"
import OutsideClickHandler from 'react-outside-click-handler';
import { ifProp } from "styled-tools";

const modalElement = document.getElementById('modal-root')!

const slidein = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`

const Modal = styled.div`
    z-index: 10001;
    background-color: rgb(11, 11, 11,0.5);
    width: 100%;
    height: 100%;
    top: 0;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ModalPopup = styled.div.attrs((props: {mounted: boolean}) => props)`
    width: 500px;
    max-width: 90vw;
    max-height: 70vh;
    overflow: hidden;
    padding: 1.5em 1em;
    background: lightgrey;
    border-radius: 3px;
    opacity: ${ifProp('mounted',1,0)};
    box-shadow: 4px 4px 4px black;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1em;
    font-size: 1.3em;

    animation-name: ${slidein};
    animation-duration: .5s;
    animation-timing-function: easein;
`

const FormModal: React.FC<{hide: () => any,children: React.ReactNode}> = ({hide,children}) => {
    const [mounted,setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    },[])

    return createPortal(
        <Modal>
            <OutsideClickHandler onOutsideClick={hide}>
                    <ModalPopup mounted={mounted}>
                        {children}
                    </ModalPopup>
            </OutsideClickHandler>
        </Modal>,
        modalElement,
    )
}

export default FormModal
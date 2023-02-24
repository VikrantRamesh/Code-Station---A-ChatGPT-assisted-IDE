import styled from "styled-components"
import { Header, CloseButton } from '../Modal'
import { IoCloseSharp } from 'react-icons/io5'
import { ModalContext } from '../../context/ModalContext'
import { useContext, useRef, useState } from "react"
import { SmallButton } from "./CodexCLI"
// import { SmallButton } from "../components/ModalTypes/CodexCLI";


const Response = styled.pre`
    border: 2px solid grey;
    height: fit-content;
    width: 95%;
    max-height: 60vh;
    overflow: scroll;
    margin: 3em auto 2em auto;
    padding: 1em;

`



const LookUp = () => {

    const {closeModal} = useContext(ModalContext);
    // const cachedCodexResponse = useRef(() => {
    //     return localStorage.getItem('CachedCodexResponse');
    // })
    const cachedCodexResponse = useRef(localStorage.getItem('CachedCodexResponse'));
    const [copyState, setCopyState] = useState('copy');
// ;    console.log(cachedCodexResponse.current);

    const handleCopy = () => {
        setCopyState('Copied');
        navigator.clipboard.writeText(cachedCodexResponse.current);
        setTimeout(() => {
            setCopyState('Copy');
        }, 1500)
    }



    return(
        <>
            <Header>
                <h2>Cached Response</h2>
                <CloseButton onClick={() => closeModal()}>
                <IoCloseSharp />
                </CloseButton>
            </Header>

           {!cachedCodexResponse.current && <h3>No previously cached responses</h3>}

           {cachedCodexResponse.current && <Response dangerouslySetInnerHTML={{__html : cachedCodexResponse.current}}></Response>}
           {cachedCodexResponse.current && <SmallButton onClick={handleCopy}>{copyState}</SmallButton>}
        </>

    )
}

export default LookUp
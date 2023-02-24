import {useState, useContext} from 'react';
import { Header, CloseButton } from '../Modal'
import { IoCloseSharp } from 'react-icons/io5'
import { ModalContext } from '../../context/ModalContext'
import styled from 'styled-components'
import { useApiCall } from '../../hooks/useAPICall';



const CodexCMD = styled.div`
    width: 80%;
    height: fit-content;
    margin: 2em auto 2em auto;
    display: flex;
    background: #2d323b;
    flex-direction : row;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    padding: 1em;
    
    span{
        color: #14c69a;
        font-family: consolas;
        font-size: 1.2em;
    }
    
    `
    
const Input = styled.input`
    width: 100%;
    background: transparent;
    color : white;
    font-size: 1.2em;
    font-family: consolas;
    outline: none;
    border: none;
    display: inline;

`

const SupportBar = styled.div`
    display: flex;
    flex-direction : row;
    justify-content: space-evenly;
    align-items : center;
    margin: 1em;

    strong{
        font-size: 1.2em;
    }

    span{
        color: #14c69a;
        text-decoration : underline 2px;
        cursor: pointer;
    }
`

const Response = styled.pre`
    width: 85%;
    max-height: 50vh;
    height: fit-content;
    border: 2px solid white;
    overflow: scroll;
    background : white;
    padding: 1em;
    margin: 1em auto 1em auto;
`

export const SmallButton = styled.button`
    background: transparent;
    border-radius: 1.5em;
    border: 2px solid white;
    padding: 0.5em 1em;
    margin-left: 42%;

`



const CodexCLI = () => {
    
    const {openModal, isOpenModal, closeModal} = useContext(ModalContext);
    const [command, setCommand] = useState('');
    const [response, setResponse] = useState('');
    const [isRequesting, setIsRequesting] = useState(false);
    const [copyState, setCopyState] = useState('Copy');
    const makeApiCall = useApiCall();
    
    const handleCLIInputChange = (e) => {
            setCommand(e.target.value);
    }
        
    const runCommand = async (e) => {
        if(response) localStorage.setItem('CachedCodexResponse', response);
        console.log(command);
        setIsRequesting(true);
        const configObj = {
            prompt: command,
            language : isOpenModal.identifiers.language,
            code : isOpenModal.identifiers.code,
            response: ''
        }

        try{

            let res = await makeApiCall(configObj);
            res = res.choices[0].text;
            // res = res.replace(/#/g, ' ');
    
            setResponse(res);
            setIsRequesting(false);
        }catch(err){
            console.log("Possible Expiration of API KEY");
        }
    }

    const handleCopy = () => {
        setCopyState('Copied');
        navigator.clipboard.writeText(response);
        setTimeout(() => {
            setCopyState('Copy');
        }, 1500)
    }

    return(
        <div>
            <Header>
                <h2>Codex CLI</h2>
                <CloseButton onClick={() => {
                        if(response) localStorage.setItem('CachedCodexResponse', response);
                        closeModal();
                    }   
                }>
                <IoCloseSharp />
                </CloseButton>
            </Header>

            <SupportBar>
                <strong>Enter action via command</strong>
                <span onClick={() => 
                    {
                        if(response) localStorage.setItem('CachedCodexResponse', response);
                        closeModal();
                        openModal({
                        show: true,
                        modalType: 8,
                        identifiers: {
                        folderId: isOpenModal.folderId,
                        cardId: isOpenModal.playgroundId,
                        }
                        })}
                    }>
                    Refer Commands
                </span>
            </SupportBar>

            <CodexCMD>
                <span>{"$>"}</span>
                <Input 
                    type = "text" 
                    value = {command}
                    onSubmit = {runCommand}
                    onChange = {(e) => {handleCLIInputChange(e)}}
                    onKeyDown = {(e) => {if(e.key === "Enter") runCommand(e)}}
                >
                </Input>
            </CodexCMD>

            {response && <Response dangerouslySetInnerHTML={{__html : response}}></Response>}
            {response && <SmallButton onClick={handleCopy}>{copyState}</SmallButton>}
            {isRequesting && <h3 style={{textAlign:'center'}}>Loading Response...</h3>}

            <pre 
                style={{textAlign:'center', textDecoration: 'underline'}}
                onClick = {() => 
                    {
                        closeModal();
                        openModal({
                        show: true,
                        modalType: 9,
                        identifiers: {
                        folderId: isOpenModal.folderId,
                        cardId: isOpenModal.playgroundId,
                        }
                        })
                    }}>
                    View previous Response
            </pre>
            
        </div>
    )

}

export default CodexCLI
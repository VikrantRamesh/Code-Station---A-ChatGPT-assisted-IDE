import styled from "styled-components"
import { Header, CloseButton } from '../Modal'
import { IoCloseSharp } from 'react-icons/io5'
import { ModalContext } from '../../context/ModalContext'
import { useContext } from "react"


const Reference = styled.section`
    width: 90%;
    height: fit-content;
    max-height : 55vh;
    margin: 1em auto 1em auto;
    overflow-y: scroll;
`

const CommandDescription = styled.div`
    width: 100%;
    margin: 1em auto 1em auto;

    strong{
        color: #14c69a;
        display: block;
        text-align: center;
        margin: 0.4em;
    }
    
    pre{
        display: block;
        background : #2d323b;
        font-family: consolas;
        padding: 0.5em;
        
        span{
            font-family: consolas;
            color: #14c69a;
        }
    
    }

    p{
        text-align: center;
        margin: 0.2em;
    }

`

const ReferenceCommands = () => {

    const {closeModal} = useContext(ModalContext);


    return(
        <>
            <Header>
                <h2>References</h2>
                <CloseButton onClick={() => closeModal()}>
                <IoCloseSharp />
                </CloseButton>
            </Header>
            

            <Reference>
                <CommandDescription>
                    <strong>Get Code  </strong>
                    <p>Get code about a specific topic</p>
                    <pre><span>{"$>  "}</span>getcode --{'{short-prompt}*'}</pre>
                </CommandDescription>
                <CommandDescription>
                    <strong>Refactor Code  </strong>
                    <p>Refactor your code to make it cleaner</p>
                    <pre><span>{"$>  "}</span>refactor --code</pre>
                </CommandDescription>
                <CommandDescription>
                    <strong>Debug Code  </strong>
                    <p>Debug your code to filter out errors and vulnerabilities</p>
                    <pre><span>{"$>  "}</span>debug --code</pre>
                </CommandDescription>
                <CommandDescription>
                    <strong>Scrutinize Code  </strong>
                    <p>Get a highly trained AI to validate your code</p>
                    <pre><span>{"$>  "}</span>scrutinize --code</pre>
                </CommandDescription>
                <CommandDescription>
                    <strong>Complete Code  </strong>
                    <p>Complete the code from where you've stopped in the editor to attain the desired functionality</p>
                    <pre><span>{"$>  "}</span>complete --{"{functionality}"}</pre>
                </CommandDescription>
                <CommandDescription>
                    <strong>Lookup Docs  </strong>
                    <p>Enter a method and the language (optional) to get appropritate documentation</p>
                    <pre><span>{"$>  "}</span>docs --{"{method*}"} --{"{lang}"}</pre>
                </CommandDescription>
            </Reference>
        
        </>

    )
}

export default ReferenceCommands
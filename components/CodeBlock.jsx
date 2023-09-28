import {CopyBlock , atomOneDark, atomOneLight , paraisoDark, rainbow, dracula} from 'react-code-blocks';

export default function CodeBlock({blockCode, language}){

    return (
        <CopyBlock
        text={blockCode}
        language={language}
        showLineNumbers={true}
        wrapLines={true}
        theme={atomOneDark}
        codeBlock
        /> 
    )
}
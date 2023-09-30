import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({code, language, style}){

    return (
        <SyntaxHighlighter
        language={language}
        style={style}
        >
        {code}    
        </SyntaxHighlighter> 
    )
}
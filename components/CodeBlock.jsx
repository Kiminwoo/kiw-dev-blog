import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atom } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function changeCode(postHtml) {

    return postHtml.replaceAll("<pre>", "")
        .replaceAll("</pre>", "")
        .replaceAll("<code>", "")
        .replaceAll("</code>", "")
        .replaceAll(/<br\/>/ig, "\n")
        .replaceAll(/&lt;/g, '<')
        .replaceAll(/&gt;/g, '>')
        .replaceAll(/&amp;/g, '&')
        .replaceAll(/&quot;/g, '"')
        .replaceAll(/&#039;/g, "'")
        .replaceAll(/&#39;/g, "'");
}

export default function CodeBlock({ code, language, key }) {

    return (
        <SyntaxHighlighter
            language={language}
            style={atom}
            wrapLongLines={true}
            key={key}
        >
            {changeCode(code)}

        </SyntaxHighlighter>
    )
}
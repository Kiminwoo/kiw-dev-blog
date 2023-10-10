export const Inapp = () => {


    const iframe = () => {
        return {
            __html : '<iframe src = "../src/pages/kakao_inapp.html" width=100% height="700px"></iframe>',
        };
    }

    return (

        <div 
            dangerouslySetInnerHTML={iframe()}
        />
    )

}


import dancingBaby from './assets/dancing_baby.gif'; 

function BigWin() {
    return (
        <div>
            <h1 id="bigwin">Bigwin!!</h1>
            <div id="bigwin-content">
                <img src={dancingBaby} alt="Funniest shit ever"/>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/75d64sxbNaU?si=8IppVRreonut2Gwj&autoplay=1&loop=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                <img src={dancingBaby} />
            </div>
        </div>
    )
}

export default BigWin;
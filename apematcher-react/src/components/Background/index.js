import React from "react";

function Background() {
    return (
        <>
            <div className="blur-tr-container">
                <img src="images/blur-tr.svg" alt="blur-tr" loading="lazy" className="blur-tr" />
            </div>
            <img src="images/blur-bl.svg" alt="blur-bl" loading="lazy" className="blur-bl" />
            <img src="images/blur-tm.svg" alt="blur-tm" loading="lazy" className="blur-tm" />
        </>
    );
}

export default Background;

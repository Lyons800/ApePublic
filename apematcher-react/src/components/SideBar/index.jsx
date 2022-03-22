import React from "react";
import "./style.css"

function SideBar() {
    return (
        <div className="sidebar">
            <div className="accordion-title-container">
                <div className="accordion-vertical-label _1">Spacing</div>
                <div className="accordion-vertical-label _2">Fonts</div>
                <div className="accordion-vertical-label _3">Icons</div>
            </div>
            <div className="accordion-vertical-label secondary">Home</div>
            <a href="http://buymeacoffee.com/joshwork" rel="noreferrer" target="_blank" className="brand w-inline-block">
                <div className="brand-logo-background"></div>
            </a>
            {/* <link rel="prefetch" href="http://buymeacoffee.com/joshwork"> */}
        </div>
    );
}

export default SideBar;

import React from 'react';

function InfoTooltip(props) { 
    return(
        <section className={`popup popup_type_infotooltip ${props.isOpen ? "popup_opened" : ""} popup_theme_light`} onClick={props.onCloseOverlay}>
            <div className="popup__container popup__container_theme_light">
                <button onClick={props.onClose} type="button" className="popup__close popup__close-popup-edit-form"></button>
                <img className="popup__emoji" src={props.image} alt="Смайлик"/>
                <h2 className="popup__title-answer">{props.title}</h2>          
            </div>
        </section>
      )
}

export default InfoTooltip;
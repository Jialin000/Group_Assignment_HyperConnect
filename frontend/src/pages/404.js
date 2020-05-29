export default function notfound() {
    return (<div className="notfound_bg">
            <div className="hyperparking_bg"></div>

            <div className="moon">
                <div className="moon__crater moon__crater1"></div>
                <div className="moon__crater moon__crater2"></div>
                <div className="moon__crater moon__crater3"></div>


            </div>
            <div className="error">
                <br/>
                <div className="error__title">404</div>
                <div className="error__subtitle">Hmmm...</div>
                <div className="error__description"> Page Not Found</div>
                <button className="error__button error__button--active">HOMEPAGE</button>
                <button className="error__button">SIGN IN</button>
            </div>

        </div>
    )
}
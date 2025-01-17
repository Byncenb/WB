import desktopBanner from '/mainBanner/images/desktop.png'
import './mainBanner.scss'

function MainBanner() {
    return (
        <div className="main-banner">
            <img src={desktopBanner} alt="Баннер" className="main-banner__img"/>
        </div>
    )
}
export default MainBanner;
import './footer.scss'

function Footer() {
    return (
        <div className="footer">
            <p className="footer__left-part">
                © 2023 Магаз
            </p>
            <div className="footer__right-part">
                <a className="footer__mail">
                    support@magaz.ru
                </a>
                <div className="footer__networks">
                    <img src="/footer/TG.svg" alt="" className="footer__network-img" />
                    <img src="/footer/Dzen.svg" alt="" className="footer__network-img" />
                    <img src="/footer/YT.svg" alt="" className="footer__network-img" />
                </div>
            </div>
        </div>
    )
}

export default Footer
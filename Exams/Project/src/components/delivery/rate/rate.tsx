import './rate.scss'

type RateProps = {
    rate?: number;
}

function Rate({rate = 0}: RateProps) {
    const stars = [];

    for (let i = 0; i < rate; i++) {
        stars.push(
            <img
                key={`filled-${i}`}
                src="/orders/yellow-star.svg"
                alt="Filled Star"
                className="delivery__rate-star"
            />
        );
    }

    for (let i = 0; i < 5 - rate; i++) {
        stars.push(
            <img
                key={`empty-${i}`}
                src="/orders/gray-star.svg"
                alt="Empty Star"
                className="delivery__rate-star"
            />
        );
    }

    return (
        <div className="delivery__order-rate">
            {stars}
        </div>
    )
}

export default Rate;
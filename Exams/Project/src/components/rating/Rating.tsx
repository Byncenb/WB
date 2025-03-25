type RatingProps = {
    rating: string;
    folowers: number;
    wrapClassName?: string;
}

function Rating({rating, folowers, wrapClassName='snippets'}: RatingProps) {
    return (
        <div className={`${wrapClassName}__user-rating`}>
            <div className={`${wrapClassName}__snippet-rating`}>
                <p className={`${wrapClassName}__snippet-rating-value`}>{rating}</p>
                <img src="/snippet/icon/black-star.svg" alt="" className={`${wrapClassName}__snippet-rating-star`} />
            </div>
            <div className={`${wrapClassName}__snippet-folowers`}>
                <p className={`${wrapClassName}__snippet-folowers-value`}>{folowers}</p>
                <img src="/snippet/icon/black-heart.svg" alt="" className={`${wrapClassName}__snippet-folowers-heart`} />
            </div>
        </div>
    )
}

export default Rating;
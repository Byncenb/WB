type FavoriteIconProps = {
    wrapClassName:  string;
    typeIndex: number;
}

const FavIconType = ['FullWhite', 'FullGray', 'EmptyRed', 'EmptyWhite']

function FavoriteIcon({wrapClassName, typeIndex}: FavoriteIconProps) {
    const iconType = FavIconType[typeIndex];

    return (
        <>
            {iconType === 'FullWhite' && (
                <img src="/snippet/icon/lighter-heart.svg" alt="" className={`${wrapClassName}__add-fav`} />
            )}
            {iconType === 'FullGray' && (
                <img src="/snippet/icon/heart.svg" alt="" className={`${wrapClassName}__add-fav`} />
            )}
            {iconType === 'EmptyRed' && (
                <img src="/product/emptyHeart.svg" alt="" className={`${wrapClassName}__add-fav`} />
            )}
            {iconType === 'EmptyWhite' && (
                <img src="/cart/emptyHeart.svg" alt="" className={`${wrapClassName}__add-fav`} />

            )}
        </>
    );
}

export default FavoriteIcon
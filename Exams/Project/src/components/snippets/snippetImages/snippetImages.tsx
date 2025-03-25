import { allImagesTypes } from "./allImagesTypes"

import { colors } from "../snippet/colorsForBg";

type SnippetImagesProps = {
    image: string,
    type?: string,
    name: string,
    bg?: string,
    groupType?: number,
    wrapClassName?: string
}

function SnippetImages({ image, type, name, bg, wrapClassName='snippets' }: SnippetImagesProps) {
    const imageType = type ? allImagesTypes[type as keyof typeof allImagesTypes] : undefined;
    const styles = {
        backgroundColor: colors[bg as keyof typeof colors] || colors.lightGray,
    }

    if (!imageType) {
        return (
            <div className={`${wrapClassName}__snippet-img-wrap`} style={styles}>
                <img src={image} alt={name} className={`${wrapClassName}__snippet-img`} />
            </div>
        )
    }

    return (
        <>
            {Array.from({ length: imageType.count }).map((_, index) => {
                const divStyles = {
                    ...styles,
                    width: index === 1 && type === 'double-75/25' ? '25%' : '100%',
                };
                return (
                    <div key={index} className={`${wrapClassName}__snippet-img-wrap`} style={divStyles}>
                        <img
                            src={image}
                            alt={name}
                            className={`${wrapClassName}__snippet-img`}
                            style={imageType.styles[index]}
                        />
                    </div>
                );
            })}
        </>
    );
}

export default SnippetImages
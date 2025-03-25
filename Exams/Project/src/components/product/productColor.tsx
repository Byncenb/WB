import { useState } from "react";

type ProductColorProps = {
    colors: string[];
    img: string;
}

type ColorKey = keyof typeof COLORS_NAME;

const COLORS_NAME = {
    base: 'Базовый',
    blue: 'Синий',
    yellow: 'Желтый',
    green: 'Зеленый',
} as const;

function ProductColor({colors, img}: ProductColorProps) {
    
    const [activeIndex, setActiveIndex] = useState(-1); // Состояние для хранения индекса активного цвета

    const activeColorKey = activeIndex === -1 ? 'base' : (colors[activeIndex] as ColorKey);

    return (
        <>
            <div className="product__colors">
                <div className={`product__color-item ${activeIndex === -1 ? 'active' : ''}`} style={{ backgroundColor: '#BCCDD1'}} onClick={() => setActiveIndex(-1)}>
                    <img src={img} alt="" className="product__img" />
                </div>
                {colors.map((color, index) => (
                    (
                        <div className={`product__color-item ${activeIndex === index ? 'active' : ''}`} key={index} onClick={() => setActiveIndex(index)}>
                            <img src={img} alt="" className="product__img" />
                            <div className="product__color" style={{ backgroundColor: color, opacity: '0.3'}}></div>
                        </div>
                    )
                ))}
            </div>
            <p className="product__color-name">{COLORS_NAME[activeColorKey]}</p>
        </>
    )
}

export default ProductColor;
import Rate from "./rate/rate";

import { getOrders } from "./getOrders";
import { getSnippetsImages } from "./getSnippetsImages";

import './delivery.scss'

import { colors } from '../snippets/snippet/colorsForBg';
import { stateOrder } from './stateOrder';

function Delivery() {
    const orders = getOrders().orders;
    orders.sort((a, b) => {
        return (stateOrder[a.state] || Infinity) - (stateOrder[b.state] || Infinity);
    });
    return (
        <div className="delivery">
            <h2 className="delivery__title">Заказы</h2>
            {orders.map(order => (
                (
                    <div key={order.id} className={`delivery__order ${order.state === 'ready' ? 'delivery__order-ready' : order.state === 'awaiting' ? 'delivery__order-awaiting' : 'delivery__order-recieved'}`}>
                        <div className="delivery__snippets-images">
                            {
                                getSnippetsImages(order.products.map(product => product.id)).map((productInfo, index) => (
                                    (
                                        <div key={`${order.id}-${index}`} className="delivery__image-wrap">
                                            <img key={`${order.id}-${index}`} src={productInfo.src} alt="" style={{
                                                backgroundColor: productInfo.bg && typeof productInfo.bg === 'string' && productInfo.bg in colors
                                                ? colors[productInfo.bg as keyof typeof colors]
                                                : colors.lightGray,
                                            }} className="delivery__snippet-img" />
                                            {order.state === 'recieved' && (
                                                <Rate rate={order.products[index].rate}/>
                                            )}
                                        </div>
                                    )
                                ))
                            }
                        </div>
                        <div className="delivery__order-info">
                            {
                                order.state === 'ready' ? (
                                    <>
                                        <div className="delivery__order-top-info">
                                            <p className="delivery__order-id">№ {order.id}</p>
                                            <p className="delivery__order-text">готов к выдаче</p>
                                        </div>
                                        <p className="delivery__order-bottom-info">{order.orderDate} · {order.products.length} товар · {order.totalSum} ₽</p>
                                    </>
                                )
                                : (
                                    <>
                                        <p className="delivery__order-bottom-info">{order.orderDate} · {order.products.length} товар · {order.totalSum} ₽ · № {order.id}</p>
                                        <p className="delivery__order-text">{order.state === 'awaiting' ? `соберем к ${order.buildDate}`: `получен ${order.receiptDate}`}</p>
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            ))}
        </div>
    )
}

export default Delivery;
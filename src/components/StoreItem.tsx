import { Button, Card } from "react-bootstrap"
import { format_currency } from "../utilities/format_currency"
import { use_shopping_cart } from "../context/ShoppingCartContext"

type StoreItemProp = {
    id: number
    name: string
    price: number
    img_url: string
}

export function StoreItem({id, name, price, img_url} : StoreItemProp){
    const { 
        get_item_quantity, 
        increase_cart_quantity, 
        decrease_cart_quantity, 
        remove_from_cart  
    } = use_shopping_cart()

    const quantity = get_item_quantity(id)

    return (
        <Card className="h-100">
            <Card.Img 
                variant="top" 
                src={img_url} 
                height="200px" 
                style={{objectFit: "cover"}} 
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{format_currency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    { quantity === 0 ? (
                        <Button className="w-100" onClick={() => increase_cart_quantity(id) }> + Add to cart </Button>
                        ) : <div 
                                className="d-flex align-items-center flex-column" 
                                style={{gap:".5rem"}}>
                                <div className="d-flex align-items-center justify-content-center" style={{gap:".5rem"}}>
                                    <Button onClick={() => decrease_cart_quantity(id) }>-</Button>
                                    <div>
                                    <span className="fs-3">{quantity}</span> in cart
                                    </div>
                                    <Button onClick={() => increase_cart_quantity(id) }>+</Button>
                                </div>
                                <Button 
                                    variant="danger" 
                                    size="sm" 
                                    onClick={() => remove_from_cart(id) }
                                >Remove</Button>
                            </div> 
                    }
                </div>
            </Card.Body>
        </Card>
    )
}
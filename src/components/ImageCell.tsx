import Image from 'next/image'
import {ReactEventHandler} from "react";

const imageUrl = (id: string) => `https://image.eveonline.com/Type/${id}_32.png`

export default function ImageCell({ id, name }: { id: string, name: string }) {
    return (
        <p><Image className="item-image" src={imageUrl(id)}  alt="" width={32} height={32} onError={handleNotFound}/>{name}</p>
    )
}

const handleNotFound: ReactEventHandler<HTMLImageElement> = (e) => {
    e.currentTarget.style.display = "none";
};
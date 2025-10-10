// src/types/index.d.ts

export type Product = {
    id: number
    name: string
    price: number
    image?: string
    description?: string
    stock?: number
    category?: string
}

declare module "*.css" {
    const content: { [className: string]: string }
    export default content
}

declare module "*.scss" {
    const content: { [className: string]: string }
    export default content
}

declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.svg"
declare module "*.gif"

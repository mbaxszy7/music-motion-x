declare module "*.css" {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

declare module "*.png" {
  const value: any
  export = value
}

declare module "intersection-observer"

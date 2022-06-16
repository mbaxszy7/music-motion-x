declare module "*.css" {
  interface IClassNames {
    [className: string]: string
  }
  const classNamess: IClassNames
  export = classNamess
}

declare module "*.png" {
  const value: any
  export = value
}

declare module "intersection-observer"

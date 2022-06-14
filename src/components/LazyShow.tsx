/* eslint-disable react/prop-types */
import { PureComponent, ReactNode } from "react"

import ttiPolyfill from "tti-polyfill"

interface LazyShowProps {
  mode: "scroll" | "tti"
  children?: ReactNode
  root?: () => HTMLElement
}

class LazyShow extends PureComponent<LazyShowProps> {
  state = {
    show: false,
  }

  showComp = () => {
    this.setState({
      show: true,
    })
  }

  componentDidMount() {
    if (this.props.mode === "tti")
      ttiPolyfill.getFirstConsistentlyInteractive().then(this.showComp)
    else {
      const root =
        typeof this.props.root === "function" ? this.props.root() : window
      root.addEventListener("scroll", this.showComp)
    }
  }

  componentWillUnmount() {
    if (this.props.mode === "scroll") {
      const root =
        typeof this.props.root === "function" ? this.props.root() : window
      root.removeEventListener("scroll", this.showComp)
    }
  }

  render() {
    const { show } = this.state

    return <>{show ? this.props.children : null}</>
  }
}

export default LazyShow

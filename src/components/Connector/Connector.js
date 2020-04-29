import React from "react"
import Handle from "../Handle"
import {Spring} from 'react-spring/renderprops.cjs'

export default class Connector extends React.Component {
  getComponents() {}

  render() {
    const { x, y, color, dx, dy, customID, editMode, easing, strokeWidth = 2, delay } = this.props

    if (dx === 0 && dy === 0) {
      return <g className="annotation-connector" />
    }

    const d = this.getComponents(this.props) || []
    const cleanedProps = Object.assign({}, this.props)
    delete cleanedProps.children

    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        ...cleanedProps,
        ...child.props,
        scale: cleanedProps.endScale || child.props.endScale,
        lineData: d.components[0].data
      })
    )
    let handles

    if (editMode && d.handles && d.handles.length > 0) {
      handles = d.handles.map((h, i) => (
        <Handle
          key={`connectorhandle-${i}`}
          handleStart={this.props.dragStart}
          handleStop={this.props.dragEnd}
          x={h.x}
          y={h.y}
          offsetParent={h.offsetParent && this.connector}
          handleDrag={(e, data) => {
            this.props.dragConnectorSettings(e, d.handleFunction(h, data))
          }}
        />
      ))
    }

    return (
      <g className="annotation-connector" {...this.props.gAttrs}>

        {d.components &&
          d.components.map((c, i) => {
            const attrs = {}
            if (!c) return null
            Object.keys(c.attrs).forEach(k => {
              if (c.attrs[k] && k !== "text") {
                attrs[k.replace(/-([a-z])/g, g => g[1].toUpperCase())] =
                  c.attrs[k]
              }
            })

            if(c.type === 'path') {
              // console.log("c.type", c.type, c)
              const p = document.createElementNS("http://www.w3.org/2000/svg", "path")
              p.setAttribute("d", c.attrs.d)
              const plength =  Math.ceil(p.getTotalLength())

              return (<Spring
                key={`${i}_${plength}_${x}_${y}`}
                config={{
                  duration: 500,
                  easing: easing
                }}
                delay={delay + 700}
                from={{ ll: plength }}
                to={{ ll: 0 }}>
                {props => {
                  return(
                    <c.type
                      mask={customID ? `url(#${customID})` : undefined}
                      className={c.className}
                      fill="none"
                      strokeWidth={strokeWidth}
                      stroke={color}
                      {...attrs}
                      strokeDasharray={plength}
                      strokeDashoffset={Math.round(props.ll)}
                    >
                      {c.attrs.text}
                    </c.type>
                  )
                }}
              </Spring>)
            } else {
              return(
                <c.type
                  mask={customID ? `url(#${customID})` : undefined}
                  className={c.className}
                  fill="none"
                  strokeWidth={strokeWidth}
                  stroke={color}
                  {...attrs}
                >
                  {c.attrs.text}
                </c.type>
              )
            }
          })}
        {childrenWithProps}
        {handles}
      </g>
    )
  }
}

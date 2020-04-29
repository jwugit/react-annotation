import React from "react"
import Handle from "../Handle"
import {Spring} from 'react-spring/renderprops.cjs'

const FILLABLE = ["SubjectCircle", "SubjectRect"]

export default class Subject extends React.Component {
  getComponents() {}

  render() {
    const { x, y, editMode, color, fill = "none", fillOpacity = 1, easing, strokeWidth = 2, delay } = this.props

    const d = this.getComponents(this.props) || {}

    let handles
    if (editMode) {
      handles = [
        <Handle
          key="subject-handle"
          handleStart={this.props.dragStart}
          handleStop={this.props.dragEnd}
          handleDrag={this.props.dragSubject}
        />
      ]

      if (d.handles) {
        handles = handles.concat(
          d.handles.map((h, i) => (
            <Handle
              key={`subjecthandle-${i}`}
              handleStart={this.props.dragStart}
              handleStop={this.props.dragEnd}
              x={h.x}
              y={h.y}
              offsetParent={h.offsetParent && this.subject}
              handleDrag={(e, data) => {
                this.props.dragSubjectSettings(e, d.handleFunction(h, data))
              }}
            />
          ))
        )
      }
    }

    const honorFill = FILLABLE.indexOf(this.name) !== -1

    return (
      <g
        className="annotation-subject"
        {...this.props.gAttrs}
        ref={subject => {
          this.subject = subject
        }}
      >
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
              const p = document.createElementNS("http://www.w3.org/2000/svg", "path")
              p.setAttribute("d", c.attrs.d)
              const plength =  Math.ceil(p.getTotalLength())
              // console.log("plength", plength)

              return (<Spring
                key={`${i}_${plength}_${x}_${y}`}
                config={{
                  duration: 500,
                  easing: easing
                }}
                delay={delay + 500}
                from={{ ll: plength }}
                to={{ ll: 0 }}>
                {props => {
                  return(
                    <c.type
                      key={i}
                      className={c.className}
                      fill={(honorFill && fill) || "none"}
                      fillOpacity={honorFill && fillOpacity}
                      strokeWidth={strokeWidth}
                      stroke={color}
                      strokeDasharray={plength}
                      strokeDashoffset={Math.round(props.ll)}
                      {...attrs}
                    >
                      {c.attrs.text}
                    </c.type>
                  )
                }}
              </Spring>)
            } else {
              return (
                <c.type
                  key={i}
                  className={c.className}
                  fill={(honorFill && fill) || "none"}
                  fillOpacity={honorFill && fillOpacity}
                  strokeWidth={strokeWidth}
                  stroke={color}
                  {...attrs}
                >
                  {c.attrs.text}
                </c.type>
              )
            }
          })}
        {handles}
      </g>
    )
  }
}

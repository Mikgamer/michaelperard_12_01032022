// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, ReactElement } from "react"
import PropTypes from 'prop-types'

import * as d3 from "d3"

import '../styles/Charts.css'

/**
 * LineChart component 
 * 
 * @param  {number} props.data Data value
 * @return {ReactElement} Return a line chart showing how much time the user spent in each sessions
 */
 export default function LineChart(props) {
  const lineChart   = useRef(null),
        tooltipLine = useRef(null)

  const data = props.data ?? [ {"day":1,"sessionLength":0}, {"day":2,"sessionLength":0},
                               {"day":3,"sessionLength":0}, {"day":4,"sessionLength":0}, 
                               {"day":5,"sessionLength":0}, {"day":6,"sessionLength":0}, 
                               {"day":7,"sessionLength":0} ]

  const isSessionLengthLinear  = data.every(item => item.sessionLength === data[0].sessionLength),
        sessionMax             = Math.max(...data.map(item => item.sessionLength)) !== 0 ? Math.max(...data.map(item => item.sessionLength)) : 1

  useEffect(() => {
    lineChart.current.innerHTML = ""

    const currentLineChart       = d3.select(lineChart.current).attr("width", 260).attr("height", 260).attr("viewBox", "0 0 260 260"),
          currentLineChartHeight = parseInt(currentLineChart.attr("height")),
          currentLineChartWidth  = parseInt(currentLineChart.attr("width")),
          currentTooltipLine     = d3.select(tooltipLine.current)

    // Line chart Graph
      // Generate curve from data
      const Curve = d3.line()
        .x((d, i) => currentLineChartWidth / ( data.length - 1) * i)
        .y((d, i) => isSessionLengthLinear ? currentLineChartHeight - 120 + i*0.01 : d.sessionLength / sessionMax * 125 * -1 + currentLineChartHeight - 60)
        .curve(d3.curveNatural)

      // Gradient for custom stroke
      const linGrad = currentLineChart.append("defs").append("linearGradient").attr("id", "linGrad")
      linGrad.append("stop").attr("offset", "0%").attr("stop-color", "rgb(255 255 255 / 0.5)")
      linGrad.append("stop").attr("offset", "100%").attr("stop-color", "white")

      // Create graph with curve
      currentLineChart.append("path").attr("d", Curve(data)).attr("stroke", "url(#linGrad)").attr("stroke-width", 2).attr("fill", "none")

    // Hover events
      // Create a dark background
      const backgroundLine = currentLineChart.append("rect").classed("backgroundLine", true)
        .attr("height", currentLineChartHeight).attr("width", currentLineChartWidth)
        .attr("fill", "rgb(0 0 0/0.1)").style("display", "none")

      // Create circles to show which data is focused
      const focus       = currentLineChart.append("circle").attr("class", "focus").attr("r", 4).attr("fill","white").style("display", "none")
      const focusCircle = currentLineChart.append("circle").attr("r", 9).attr("fill","rgb(255 255 255/0.2)").style("display", "none")

      currentLineChart
        .on('mouseover', function () {
          // Display the dark background and the circles from the first hover
          backgroundLine.style("display", "block")
          focus.style("display", "block")
          focusCircle.style("display", "block")

          // Create the tooltip
          currentTooltipLine.append("span").text("")
        })
        .on("mousemove",function (e) {
          const posX               = d3.pointer(e)[0],
                arrValPosX         = Math.round(posX / currentLineChartWidth * (data.length-1)),
                nearPosX           = currentLineChartWidth / (data.length-1) * arrValPosX,
                lineChartWindowPos = lineChart.current.getBoundingClientRect()

          // Translate the dark background to show which data is focused
          backgroundLine.attr("x",nearPosX)

          // Translate circles to show which data is focused
                focus.attr("cx",nearPosX).attr("cy", isSessionLengthLinear ? currentLineChartHeight - 120 : 
                                                     data[arrValPosX].sessionLength / sessionMax * 125 * -1 + currentLineChartHeight - 60)
          focusCircle.attr("cx",nearPosX).attr("cy", isSessionLengthLinear ? currentLineChartHeight - 120 : 
                                                     data[arrValPosX].sessionLength / sessionMax * 125 * -1 + currentLineChartHeight - 60)

          // Translate the tooltip and set its text
          currentTooltipLine.select("span")
            .style("left",(
              Math.round(parseInt(window.scrollX) + parseInt(lineChartWindowPos.left) +
                (parseInt(focus.attr("cx")) + 10)*(lineChartWindowPos.width/currentLineChartWidth))
              ) + "px")
            .style("top", (
              Math.round(parseInt(window.scrollY) + parseInt(lineChartWindowPos.top ) +
                (parseInt(focus.attr("cy")) - 30)*(lineChartWindowPos.height/currentLineChartHeight))
              ) + "px")
            .text(data[arrValPosX].sessionLength + " min")
        })
        .on('mouseout', function () {
          // Remove the tooltip
          currentTooltipLine.select("span").remove()
        })

    // Legend
      // Title
      const title = currentLineChart.append("text").attr("x", 32).attr("y", 40)
        .style("font-size", "15px").attr("fill", "rgb(255 255 255/0.8)").attr("font-weight",500)
      title.append("tspan").text("Durée moyenne des").attr("x", 32).attr("y", 40)
      title.append("tspan").text("sessions").attr("x", 32).attr("y", 40 + 24)

      // Days
      currentLineChart.append("g").classed("days", true)
        .selectAll(".bar").data(["L","M","M","J","V","S","D"]).enter()
        .append("text").text((d)=> d).style("text-anchor", "middle").style("font-size", "12px").attr("fill", "rgb(255 255 255/0.5)").attr("font-weight",500)
        .attr("x",(d,i)=> currentLineChartWidth/7 * i + currentLineChartWidth/14).attr("y",currentLineChartHeight - 16)
  })
  
  return <>
           <svg ref={lineChart}   className="lineChart"  />
           <div ref={tooltipLine} className="tooltipLine" ></div>
         </>
}

LineChart.propTypes = {
  data : PropTypes.arrayOf(
    PropTypes.shape({
      day           : PropTypes.number,
      sessionLength : PropTypes.number
    })
  )
}
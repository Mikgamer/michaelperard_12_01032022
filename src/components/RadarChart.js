// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, ReactElement } from "react"
import PropTypes from 'prop-types'

import * as d3 from "d3"

import '../styles/Charts.css'

/**
 * RadarChart component 
 * 
 * @param  {number} props.data Data value
 * @return {ReactElement} Return a radar chart showing in which field the user is the best
 */
 export default function RadarChart(props) {
  const radarChart = useRef(null)

  const data = props.data ?? [ { value: 0, kind: 1 }, { value: 0, kind: 2 },
                               { value: 0, kind: 3 }, { value: 0, kind: 4 }, 
                               { value: 0, kind: 5 }, { value: 0, kind: 6 } ]

  const valueArr = [...data.map(item => item.value)],
        valueMax = Math.max(...valueArr)
  
  /**
   * Generate coordinates of an hexagon
   * 
   * @param {Array.<Number>} values How far away points are from the center of the circle, this is an array of exactly 6 numbers
   * @return {String} Return the coordinates of all 6 points of the polygon according to the values as a string
   */
  const hexaPoly = (values = Array(6).fill(1)) => values.map(
                                                    (distance, i) => [
                                                      distance*Math.cos(60*(Math.PI/180)*(i-0.5)),
                                                      -distance*Math.sin(60*(Math.PI/180)*(i-0.5))
                                                    ].join(",")
                                                  ).join(" ")

  useEffect(() => {
    radarChart.current.innerHTML = ""

    const currentRadarChart       = d3.select(radarChart.current).attr("width", 260).attr("height", 260).attr("viewBox", "0 0 260 260"),
          currentRadarChartHeight = parseInt(currentRadarChart.attr("height")),
          currentRadarChartWidth  = parseInt(currentRadarChart.attr("width")),
          chartMidHeight          = currentRadarChartHeight / 2,
          chartMidWidth           = currentRadarChartWidth / 2

    // Display hexagons
    const hexa = currentRadarChart.append("g").classed("hexa", true)
    for (let i = 0; i < 5; i++) {
      hexa.append("polygon")
        .attr("points", hexaPoly(Array(6).fill( chartMidHeight - 40 - ( 22 * i ) - (i===4?12:0) )))
        .attr("transform", `translate(${chartMidWidth} ${chartMidHeight})`).attr("stroke", "white").attr("fill", "none")
    }
    
    // Display data as a custom hexagon
    currentRadarChart.append("polygon").attr("points", hexaPoly([...data.map(item => item.value<1 ? 0.5 : item.value / valueMax * (chartMidHeight - 40) )]) )
      .attr("transform", `translate(${chartMidWidth} ${chartMidHeight})`).attr("fill", "rgb(255 1 1/0.7)")

    // Legend
    const textValues = currentRadarChart.append("text").classed("textValues", true)
      .style("font-size", "12px").attr("fill", "white").attr("font-weight",500)
    textValues.append("tspan").text("Intensité").attr("x", chartMidWidth).attr("y", 30).attr("text-anchor", "middle")
    textValues.append("tspan").text("Vitesse").attr("x", 215).attr("y", 85)
    textValues.append("tspan").text("Force").attr("x", 215).attr("y", 185)
    textValues.append("tspan").text("Endurance").attr("x", chartMidWidth).attr("y", 240).attr("text-anchor", "middle")
    textValues.append("tspan").text("Energie").attr("x", 5).attr("y", 185)
    textValues.append("tspan").text("Cardio").attr("x", 5).attr("y", 85)
  })

  return <svg ref={radarChart} className="radarChart" />
}

RadarChart.propTypes = {
  data : PropTypes.arrayOf(
    PropTypes.shape({
      value : PropTypes.number,
      kind  : PropTypes.number
    })
  )
}
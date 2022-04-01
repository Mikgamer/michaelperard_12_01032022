// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, ReactElement } from "react"
import PropTypes from 'prop-types'

import * as d3 from "d3"

import '../styles/Charts.css'

/**
 * RadialChart component 
 * 
 * @param  {number} props.data Data value
 * @return {ReactElement} Return a radial chart showing how far the user is to reach his goal
 */
 export default function RadialChart(props) {
  const radialChart = useRef(null)

  const data = props.data ?? 0

  useEffect(() => {
    radialChart.current.innerHTML = ""

    const currentRadialChart       = d3.select(radialChart.current).attr("width", 260).attr("height", 260).attr("viewBox", "0 0 260 260"),
          currentRadialChartHeight = parseInt(currentRadialChart.attr("height")),
          currentRadialChartWidth  = parseInt(currentRadialChart.attr("width")),
          chartMidHeight           = currentRadialChartHeight / 2,
          chartMidWidth            = currentRadialChartWidth / 2

    // Radial line
    currentRadialChart.append("path")
      .attr('d',d3.arc().cornerRadius(10).innerRadius(80).outerRadius(90).startAngle(0).endAngle(-(data*360) * (Math.PI)/180))
      .attr("transform", `translate(${chartMidWidth} ${chartMidHeight})`).attr("fill", "#FF0000")

    // Color center circle
    currentRadialChart.append("circle").attr("cx",chartMidWidth).attr("cy",chartMidHeight).attr("r",80).attr("fill", "white")

    // Legend
      // Title 
      currentRadialChart.append("text").text("Score").attr("x", 32).attr("y", 32)
        .style("font-size", "16px").attr("fill", "#20253A").attr("font-weight",500)

      // Center text
      const textCenter = currentRadialChart.append("text")
      textCenter.append("tspan").text(data*100+"%").attr("x",chartMidWidth).attr("y",chartMidHeight - 5)
        .style("font-size", "26px").attr("fill", "#282D30").attr("font-weight",700).attr("text-anchor", "middle")
      textCenter.append("tspan").text("de votre").attr("x",chartMidWidth).attr("y",chartMidHeight + 26)
        .style("font-size", "16px").attr("fill", "#74798c").attr("font-weight",500).attr("text-anchor", "middle")
      textCenter.append("tspan").text("objectif").attr("x",chartMidWidth).attr("y",chartMidHeight + 52)
        .style("font-size", "16px").attr("fill", "#74798c").attr("font-weight",500).attr("text-anchor", "middle")
      

  })

  return <svg ref={radialChart} className="radialChart" />
}

RadialChart.propTypes = {
  data : PropTypes.number
}
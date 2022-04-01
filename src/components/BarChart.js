// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, ReactElement } from "react"
import PropTypes from 'prop-types'

import * as d3 from "d3"

import '../styles/Charts.css'

/**
 * BarChart component 
 * 
 * @param  {number} props.data Data value
 * @return {ReactElement} Return a bar chart with the user weight and calories for each days
 */
export default function BarChart(props) {
  const barChart   = useRef(null),
        tooltipBar = useRef(null)

  const data = props.data ?? [ {"day":"2020-07-01","kilogram":0,"calories":0}, {"day":"2020-07-02","kilogram":0,"calories":0},
                               {"day":"2020-07-03","kilogram":0,"calories":0}, {"day":"2020-07-04","kilogram":0,"calories":0}, 
                               {"day":"2020-07-05","kilogram":0,"calories":0}, {"day":"2020-07-06","kilogram":0,"calories":0},
                               {"day":"2020-07-07","kilogram":0,"calories":0} ]

  const kilogramArr = [...data.map(item => item.kilogram)],
        kilogramMin = Math.min(...kilogramArr) > 1 ? Math.min(...kilogramArr) - 1 : 0,
        kilogramMax = Math.max(...kilogramArr) + 1,
        kilogramAve = Math.round(kilogramMax/2),
        caloriesArr = [...data.map(item => item.calories)],
        caloriesMin = Math.min(...caloriesArr) > 50 ? Math.min(...caloriesArr) - 50 : 0,
        caloriesMax = Math.max(...caloriesArr)

  useEffect(() => {
    barChart.current.innerHTML = ""
    
    const currentBarChart            = d3.select(barChart.current).attr("width", 835).attr("height", 320).attr("viewBox", "0 0 835 320"),
          currentBarChartGraph       = currentBarChart.append("svg").attr("width", 700).attr("height", 145).attr("x", 40 ).attr("y", 110 ),
          currentBarChartGraphHeight = parseInt(currentBarChartGraph.attr("height")),
          currentBarChartGraphWidth  = parseInt(currentBarChartGraph.attr("width")),
          currentTooltipBar          = tooltipBar.current

    // Bar chart graph
      // Create lines for y axis
      for (let i = 0; i < 3; i++) {
        currentBarChartGraph.append("line").classed("line", true)
          .attr('x1', 0).attr('y1', currentBarChartGraphHeight/2*i)
          .attr('x2', currentBarChartGraphWidth).attr('y2', currentBarChartGraphHeight/2*i)
          .attr("stroke", "#DEDEDE").style("stroke-dasharray", i < 2 ? 2 : 0)
      }

      // Create bar groups
      const chart = currentBarChartGraph.classed("graph", true).selectAll(".bar").data(data).enter().append("g").classed("bar", true)

      // Background bar
      chart.append("rect")
        .attr("x", (d, i) => i * (56+(currentBarChartGraphWidth-56*data.length + 32)/(data.length-1)) - 16 )
        .attr("y", 0)
        .attr("width", 56).attr("height", currentBarChartGraphHeight )
        .attr("fill", "rgb(196 196 196 / 0.5)")
        .attr('opacity', 0)
        .classed("background", true)

      // Kilogram bar
      chart.append("rect")
        .attr("x", (d, i) => i * (56+(currentBarChartGraphWidth-56*data.length + 32)/(data.length-1)) )
        .attr("y", (d, i) => currentBarChartGraphHeight - ((d.kilogram-kilogramMin)/(kilogramMax-kilogramMin)*currentBarChartGraphHeight) )
        .attr("width", 8).attr("height", (d, i) => 3 + ((d.kilogram-kilogramMin)/(kilogramMax-kilogramMin)*currentBarChartGraphHeight) )
        .attr("rx", 3).attr("ry", 3)
        .attr("fill", "#282D30")
      
      // Calories bar
      chart.append("rect")
        .attr("x", (d, i) => i * (56+(currentBarChartGraphWidth-56*data.length + 32)/(data.length-1)) + 16)
        .attr("y", (d, i) => currentBarChartGraphHeight - ((d.calories-caloriesMin)/((caloriesMax+50)-caloriesMin)*currentBarChartGraphHeight) )
        .attr("width", 8).attr("height", (d, i) => 3 + ((d.calories-caloriesMin)/((caloriesMax+50)-caloriesMin)*currentBarChartGraphHeight) )
        .attr("rx", 3).attr("ry", 3)
        .attr("fill", "#E60000")

    // Hover events
      chart
        .on('mouseover', function (e, d, i) {
          // Animate focused group bar background to visible
          d3.select(this.querySelector(".background")).transition().duration(50).attr('opacity', 1)

          // Create tooltip with text
          const tooltipBarText = d3.select(currentTooltipBar).append("div").classed("tooltipBarText", true)
          tooltipBarText.append("span").text(d.kilogram+"kg")
          tooltipBarText.append("span").text(d.calories+"Kcal")
        })
        .on("mousemove",function (e) {
          // Translate tooltip
          d3.select(".tooltipBarText").style("top", (e.pageY-50)+"px").style("left",(e.pageX+10)+"px")
        })
        .on('mouseout', function () {
          // Animate focused group bar background to hidden
          d3.select(this.querySelector(".background")).transition().duration(50).attr('opacity', 0)

          // Remove tooltip
          d3.selectAll(".tooltipBarText").remove()
        })

    // Legend and axis
      // Legend
      currentBarChart.append("text").text("Activité quotidienne").attr("x", 32).attr("y", 32)
        .style("font-size", "15px").attr("font-weight",500).attr("alignment-baseline","middle").attr("fill", "#20253A")

      currentBarChart.append("circle").attr("cx",530).attr("cy",32).attr("r", 4).attr("fill", "#282D30")
      currentBarChart.append("text").text("Poids (kg)").attr("x", 540).attr("y", 32)
        .style("font-size", "14px").attr("font-weight",500).attr("alignment-baseline","middle").attr("fill", "#74798C")

      currentBarChart.append("circle").attr("cx",646).attr("cy",32).attr("r", 4).attr("fill", "#E60000")
      currentBarChart.append("text").text("Calories brûlées (kCal)").attr("x", 656).attr("y", 32)
        .style("font-size", "14px").attr("font-weight",500).attr("alignment-baseline","middle").attr("fill", "#74798C")

      // y axis
      currentBarChart.append("g").classed("weights", true)
        .selectAll(".weight").data([kilogramMax,kilogramAve,kilogramMin]).enter()
        .append("text").classed("weight", true).text( (d, i) => d )
        .attr("x", 790)
        .attr("y", (d, i) => 110 + currentBarChartGraphHeight/2 * i )
        .style("font-size", "14px").attr("font-weight",500).attr("alignment-baseline","middle").attr("fill", "#9B9EAC")

      // x axis
      currentBarChart.append("g").classed("dates", true)
        .selectAll(".date").data(data).enter()
        .append("text").classed("date", true).text((d, i) => parseInt(d.day.split("-").slice(-1)))
        .attr("x", (d, i) => 40 + i * (56+(currentBarChartGraphWidth-56*data.length + 32)/(data.length-1)) + ( parseInt(d.day.split("-").slice(-1)) < 10 ? 8 : 4 ) )
        .attr("y", 136 + currentBarChartGraphHeight )
        .style("font-size", "14px").attr("font-weight",500).attr("fill", "#9B9EAC")
  })
  
  return <>
           <svg ref={barChart}   className="barChart"  />
           <div ref={tooltipBar} className="tooltipBar" ></div>
         </>
}

BarChart.propTypes = {
  data : PropTypes.arrayOf(
    PropTypes.shape({
      day      : PropTypes.string,
      kilogram : PropTypes.number,
      calories : PropTypes.number
    })
  )
}
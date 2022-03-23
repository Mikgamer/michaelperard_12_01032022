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
export function BarChart(props) {
  const barChart   = useRef(null),
        tooltipBar = useRef(null)

  const data = props.data ?? [ {"day":"2020-07-01","kilogram":0,"calories":0}, {"day":"2020-07-02","kilogram":50,"calories":100},
                               {"day":"2020-07-03","kilogram":0,"calories":0}, {"day":"2020-07-04","kilogram":50,"calories":100}, 
                               {"day":"2020-07-05","kilogram":0,"calories":0}, {"day":"2020-07-06","kilogram":50,"calories":100},
                               {"day":"2020-07-07","kilogram":0,"calories":0} ]

  const kilogramArr = [...data.map(item => item.kilogram)],
        kilogramMin = Math.min(...kilogramArr),
        kilogramMax = Math.max(...kilogramArr),
        kilogramAve = Math.round(kilogramArr.reduce((a,b) => a + b, 0) / data.length),
        caloriesArr = [...data.map(item => item.calories)],
        caloriesMin = Math.min(...caloriesArr),
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
        .attr("y", (d, i) => currentBarChartGraphHeight - ((d.kilogram-(kilogramMin-1))/((kilogramMax+1)-(kilogramMin-1))*currentBarChartGraphHeight) )
        .attr("width", 8).attr("height", (d, i) => 3 + ((d.kilogram-(kilogramMin-1))/((kilogramMax+1)-(kilogramMin-1))*currentBarChartGraphHeight) )
        .attr("rx", 3).attr("ry", 3)
        .attr("fill", "#282D30")
      
      // Calories bar
      chart.append("rect")
        .attr("x", (d, i) => i * (56+(currentBarChartGraphWidth-56*data.length + 32)/(data.length-1)) + 16)
        .attr("y", (d, i) => currentBarChartGraphHeight - ((d.calories-(caloriesMin-50))/((caloriesMax+50)-(caloriesMin-50))*currentBarChartGraphHeight) )
        .attr("width", 8).attr("height", (d, i) => 3 + ((d.calories-(caloriesMin-50))/((caloriesMax+50)-(caloriesMin-50))*currentBarChartGraphHeight) )
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
        .selectAll(".weight").data([kilogramMax + 1,kilogramAve,kilogramMin - 1]).enter()
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

/**
 * LineChart component 
 * 
 * @param  {number} props.data Data value
 * @return {ReactElement} Return a line chart showing how much time the user spent in each sessions
 */
export function LineChart(props) {
  const lineChart   = useRef(null),
        tooltipLine = useRef(null)

  const data = props.data ?? [ {"day":1,"sessionLength":10}, {"day":2,"sessionLength":20},
                               {"day":3,"sessionLength":10}, {"day":4,"sessionLength":20}, 
                               {"day":5,"sessionLength":10}, {"day":6,"sessionLength":20}, 
                               {"day":7,"sessionLength":10} ]

  const sessionMax = Math.max(...data.map(item => item.sessionLength))

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
        .y((d, i) => d.sessionLength / sessionMax * 125 * -1 + currentLineChartHeight - 60)
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
                focus.attr("cx",nearPosX).attr("cy", data[arrValPosX].sessionLength / sessionMax * 125 * -1 + currentLineChartHeight - 60)
          focusCircle.attr("cx",nearPosX).attr("cy", data[arrValPosX].sessionLength / sessionMax * 125 * -1 + currentLineChartHeight - 60)

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
        .style("font-size", "15px").attr("fill", "rgb(255 255 255/0.5)").attr("font-weight",500)
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

/**
 * RadarChart component 
 * 
 * @param  {number} props.data Data value
 * @return {ReactElement} Return a radar chart showing in which field the user is the best
 */
export function RadarChart(props) {
  const radarChart = useRef(null)

  const data = props.data ?? [ { value: 5, kind: 1 }, { value: 20, kind: 2 },
                               { value: 5, kind: 3 }, { value: 20, kind: 4 }, 
                               { value: 5, kind: 5 }, { value: 20, kind: 6 } ]

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
    currentRadarChart.append("polygon").attr("points", hexaPoly([...data.map(item => item.value / valueMax * (chartMidHeight - 40) )]) )
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

/**
 * RadialChart component 
 * 
 * @param  {number} props.data Data value
 * @return {ReactElement} Return a radial chart showing how far the user is to reach his goal
 */
export function RadialChart(props) {
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

BarChart.propTypes = {
  data : PropTypes.arrayOf(
    PropTypes.shape({
      day      : PropTypes.string,
      kilogram : PropTypes.number,
      calories : PropTypes.number
    })
  )
}

LineChart.propTypes = {
  data : PropTypes.arrayOf(
    PropTypes.shape({
      day           : PropTypes.number,
      sessionLength : PropTypes.number
    })
  )
}

RadarChart.propTypes = {
  data : PropTypes.arrayOf(
    PropTypes.shape({
      value : PropTypes.number,
      kind  : PropTypes.number
    })
  )
}

RadialChart.propTypes = {
  data : PropTypes.number
}
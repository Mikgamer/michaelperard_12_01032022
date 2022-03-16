// eslint-disable-next-line no-unused-vars
import React, { ReactElement, useEffect, useRef } from "react"

import PropTypes from 'prop-types'
import '../styles/Charts.css'
import * as d3 from "d3"

export function BarChart(props) {
  const barChart = useRef(null)
  const data = [
    {"day":"2020-07-01","kilogram":80,"calories":240},
    {"day":"2020-07-02","kilogram":80,"calories":220},
    {"day":"2020-07-03","kilogram":81,"calories":280},
    {"day":"2020-07-04","kilogram":81,"calories":290},
    {"day":"2020-07-05","kilogram":80,"calories":160},
    {"day":"2020-07-06","kilogram":78,"calories":162},
    {"day":"2020-07-07","kilogram":76,"calories":390}
  ]
  let kilogramArr = [...data.map(item => item.kilogram)]
  let kilogramMin = Math.min(...kilogramArr)
  let kilogramMax = Math.max(...kilogramArr)
  let kilogramAve = Math.round(kilogramArr.reduce((a,b) => a + b, 0) / data.length)
  
  let caloriesArr = [...data.map(item => item.calories)]
  let caloriesMin = Math.min(...caloriesArr)
  let caloriesMax = Math.max(...caloriesArr)

  useEffect(() => {
    const currentBarChart = d3.select(barChart.current).attr("width", 835).attr("height", 320).attr("viewBox", "0 0 835 320")

    // Bar chart graph
      const currentBarChartGraph = currentBarChart.append("svg").attr("width", 700).attr("height", 145).attr("x", 40 ).attr("y", 110 ),
            currentBarChartGraphHeight = parseInt(currentBarChartGraph.attr("height")),
            currentBarChartGraphWidth = parseInt(currentBarChartGraph.attr("width"))

      for (let i = 0; i < 3; i++) {
        currentBarChartGraph.append("line").classed("line", true)
        .attr('x1', 0).attr('y1', currentBarChartGraphHeight/2*i)
        .attr('x2', currentBarChartGraphWidth).attr('y2', currentBarChartGraphHeight/2*i)
        .attr("stroke", "#DEDEDE").style("stroke-dasharray", i < 2 ? 2 : 0)
      }

      const chart = currentBarChartGraph.classed("graph", true)
      .selectAll(".bar").data(data).enter()
      .append("g").classed("bar", true)
      .on('mouseover', function (e, d, i) {
        d3.select(this.querySelector(".background")).transition().duration(50).attr('opacity', 1)
        const tooltipBar = d3.select("#tooltipBar").append("div").attr("id", "tooltipBarText")
        tooltipBar.append("span").text(d.kilogram+"kg")
        tooltipBar.append("span").text(d.calories+"Kcal")
      })
      .on("mousemove",function (e) {
        const posX = e.pageX, posY = e.pageY
        window.requestAnimationFrame(() => d3.select("div#tooltipBarText").style("top", (posY-50)+"px").style("left",(posX+10)+"px"))
      })
      .on('mouseout', function () {
        d3.select(this.querySelector(".background")).transition().duration(50).attr('opacity', 0)
        d3.selectAll("div#tooltipBarText").remove()
      })

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
      .append("text").classed("date", true).text((d, i) => d.day)
      .attr("x", (d, i) => 40 + i * (56+(currentBarChartGraphWidth-56*data.length + 32)/(data.length-1)) - 16 - 8 )
      .attr("y", 126 + currentBarChartGraphHeight )
      .style("font-size", "14px").attr("font-weight",500).attr("fill", "#9B9EAC")
  })
  
  return (
    <>
      <svg ref={barChart} className="barChart"></svg>
      <div id="tooltipBar"></div>
    </>
  )
}

export function LineChart(props) {
  const lineChart = useRef(null)
  const data = [
    {"day":1,"sessionLength":30},
    {"day":2,"sessionLength":23},
    {"day":3,"sessionLength":45},
    {"day":4,"sessionLength":50},
    {"day":5,"sessionLength": 0},
    {"day":6,"sessionLength": 0},
    {"day":7,"sessionLength":60}
  ]
  // const  data = [data.at(0),...data,data.at(-1)]
  let sessionMax = Math.max(...data.map(item => item.sessionLength))

  useEffect(() => {
    const currentLineChart = d3.select(lineChart.current).attr("width", 260).attr("height", 260).attr("viewBox", "0 0 260 260"),
          currentLineChartHeight = parseInt(currentLineChart.attr("height")),
          currentLineChartWidth = parseInt(currentLineChart.attr("width"))

    // Line chart Graph
      const Curve = d3.line()
      .x((d, i) => currentLineChartWidth / ( data.length - 1) * i)
      .y((d, i) => d.sessionLength / sessionMax * 125 * -1 + currentLineChartHeight - 60)
      .curve(d3.curveNatural)

      const linGrad = currentLineChart.append("defs").append("linearGradient").attr("id", "linGrad")
      linGrad.append("stop").attr("offset", "0%").attr("stop-color", "rgb(255 255 255 / 0.5)")
      linGrad.append("stop").attr("offset", "100%").attr("stop-color", "white")

      currentLineChart.append("path")
      .attr("d", Curve(data))
      .attr("stroke", "url(#linGrad)").attr("stroke-width", 2).attr("fill", "none")

    // Hover events
      currentLineChart.append("rect").classed("tooltipLine", true)
      .attr("height", currentLineChartHeight)
      .attr("width", currentLineChartWidth)
      .attr("fill", "rgb(0 0 0/0.1)")

      const focus = currentLineChart.append("circle").attr("class", "focus").attr("r", 4).attr("fill","white").style("display", "none")
      const focusCircle = currentLineChart.append("circle").attr("r", 9).attr("fill","rgb(255 255 255/0.2)").style("display", "none")

      currentLineChart.on('mouseover', function () {
        focus.style("display", "block")
        focusCircle.style("display", "block")
        d3.select("#tooltipLine").append("span").text("Yo")
      })
      .on("mousemove",function (e) {
        const posX = d3.pointer(e)[0]
        window.requestAnimationFrame(() => {
          d3.select(".tooltipLine").attr("x",currentLineChartWidth / ( data.length-1) * Math.round(posX / currentLineChartWidth * ( data.length - 1)))
          focus.attr("cx",currentLineChartWidth / ( data.length-1) * Math.round(posX / currentLineChartWidth * ( data.length - 1)))
          .attr("cy", data[Math.round(posX / currentLineChartWidth * ( data.length - 1))].sessionLength / sessionMax * 125 * -1 + currentLineChartHeight - 60)
          focusCircle.attr("cx",currentLineChartWidth / ( data.length-1) * Math.round(posX / currentLineChartWidth * ( data.length - 1)))
          .attr("cy", data[Math.round(posX / currentLineChartWidth * ( data.length - 1))].sessionLength / sessionMax * 125 * -1 + currentLineChartHeight - 60)

          d3.select("#tooltipLine span")
          .style("left",(parseInt(lineChart.current.getBoundingClientRect().left) + parseInt(focus.attr("cx")) + 5) + "px")
          .style("top",(parseInt(lineChart.current.getBoundingClientRect().top) + parseInt(focus.attr("cy")) - 5) + "px")
        })
      })
      .on('mouseout', function () {
        d3.select("#tooltipLine span").remove()
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
  
  return (
    <>
      <svg ref={lineChart} className="lineChart"></svg>
      <div id="tooltipLine"></div>
    </>
  )
}

export function RadarChart(props) {
  const radarChart = useRef(null)
  const data = [
    { value: 80, kind: 1 },
    { value: 120, kind: 2 },
    { value: 140, kind: 3 },
    { value: 50, kind: 4 },
    { value: 200, kind: 5 },
    { value: 90, kind: 6 }
  ]
  let valueArr = [...data.map(item => item.value)]
  let valueMax = Math.max(...valueArr)
  
  /**
   * Generate coordinates of an hexagon
   * 
   * @param {Array.<Number>} values How far away points are from the center of the circle, this is an array of exactly 6 numbers
   * @return {String} Return the coordinates of all 6 points of the polygon according to the values as a string
   */
  const hexaPoly = (values = Array(6).fill(1)) => 
  values.map((distance, i) => [
     distance*Math.cos(60*(Math.PI/180)*(i-0.5)),
    -distance*Math.sin(60*(Math.PI/180)*(i-0.5))
  ].join(",")).join(" ")
  

  useEffect(() => {
    const currentRadarChart = d3.select(radarChart.current).attr("width", 260).attr("height", 260).attr("viewBox", "0 0 260 260"),
          currentRadarChartHeight = parseInt(currentRadarChart.attr("height")),
          currentRadarChartWidth = parseInt(currentRadarChart.attr("width"))

    // Display hexagons
    const hexa = currentRadarChart.append("g").classed("hexa", true)
    for (let i = 0; i < 5; i++) {
      hexa.append("polygon")
      .attr("points", hexaPoly(Array(6).fill(
        currentRadarChartHeight/2 - 40 - ( 22 * i ) - (i===4?12:0)
      )))
      .attr("transform", `translate(${currentRadarChartWidth/2} ${currentRadarChartHeight/2})`)
      .attr("stroke", "white").attr("fill", "none")
    }
    
    // Display data as a custom hexagon
    currentRadarChart.append("polygon").attr("points", hexaPoly([...data.map(item => item.value / valueMax * (currentRadarChartHeight/2-40))]))
    .attr("transform", `translate(${currentRadarChartWidth/2} ${currentRadarChartHeight/2})`)
    .attr("fill", "rgb(255 1 1/0.7)")

    // Legend
    const textValues = currentRadarChart.append("text").classed("textValues", true)
    .style("font-size", "12px").attr("fill", "white").attr("font-weight",500)

    textValues.append("tspan").text("Intensité").attr("x", currentRadarChartWidth/2).attr("y", 30).attr("text-anchor", "middle")
    textValues.append("tspan").text("Vitesse").attr("x", 215).attr("y", 85)
    textValues.append("tspan").text("Force").attr("x", 215).attr("y", 185)
    textValues.append("tspan").text("Endurance").attr("x", currentRadarChartWidth/2).attr("y", 240).attr("text-anchor", "middle")
    textValues.append("tspan").text("Energie").attr("x", 5).attr("y", 185)
    textValues.append("tspan").text("Cardio").attr("x", 5).attr("y", 85)
  })
  return (
    <svg ref={radarChart} className="radarChart"></svg>
  )
}

export function RadialChart(props) {
  const radialChart = useRef(null)

  const data = 0.12

  useEffect(() => {
    const currentRadialChart = d3.select(radialChart.current).attr("width", 260).attr("height", 260).attr("viewBox", "0 0 260 260"),
          currentRadialChartHeight = parseInt(currentRadialChart.attr("height")),
          currentRadialChartWidth = parseInt(currentRadialChart.attr("width"))

    // Radial line
    currentRadialChart.append("path")
    .attr('d',d3.arc().cornerRadius(10).innerRadius(80).outerRadius(90).startAngle(0).endAngle(-(data*360) * (Math.PI)/180))
    .attr("transform", `translate(${currentRadialChartWidth/2} ${currentRadialChartHeight/2})`)
    .attr("fill", "#FF0000")

    // Color center circle
    currentRadialChart.append("circle")
    .attr("cx",currentRadialChartWidth/2).attr("cy",currentRadialChartHeight/2)
    .attr("r",80).attr("fill", "white")

    // Legend
      currentRadialChart.append("text").text("Score")
      .style("font-size", "16px").attr("fill", "#20253A").attr("font-weight",500)
      .attr("x", 32).attr("y", 32)
      // Center text
      const textCenter = currentRadialChart.append("text")
      textCenter.append("tspan").text(data*100+"%")
      .style("font-size", "26px").attr("fill", "#282D30").attr("font-weight",700).attr("text-anchor", "middle")
      .attr("x", currentRadialChartWidth/2).attr("y", currentRadialChartHeight/2 - 5)
      textCenter.append("tspan").text("de votre")
      .style("font-size", "16px").attr("fill", "#74798c").attr("font-weight",500).attr("text-anchor", "middle")
      .attr("x", currentRadialChartWidth/2).attr("y", currentRadialChartHeight/2 + 26)
      textCenter.append("tspan").text("objectif")
      .style("font-size", "16px").attr("fill", "#74798c").attr("font-weight",500).attr("text-anchor", "middle")
      .attr("x", currentRadialChartWidth/2).attr("y", currentRadialChartHeight/2 + 52)

  })
  return (
    <svg ref={radialChart} className="radialChart"></svg>
  )
}

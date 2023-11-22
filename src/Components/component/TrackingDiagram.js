import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TrackingDiagram = ({ status, scan }) => {
  const diagramRef = useRef(null);
    console.log(scan);
  useEffect(() => {
    if (status) {
      const diagramContainer = diagramRef.current;
      d3.select(diagramContainer).selectAll('*').remove(); // Clear previous content
  
      const svg = d3.select(diagramContainer).append('svg').attr('width', 200).attr('height', 300);
  
      // Set up the scales for x-axis and y-axis
      const yScale = d3.scaleLinear().domain([0, 5]).range([20, 280]);
  
      // Create a group for the empty progress bar
      const emptyProgressBarGroup = svg.append('g');
  
      // Create a group for the color progress bar
      const colorProgressBarGroup = svg.append('g');

      const infoBoxGroup = svg.append('g');
        const instruction = scan.map((item) => {
            return item.ScanDetail.Instructions
        })
        console.log(instruction);

        infoBoxGroup
        .append('foreignObject')
        .attr('x', -90) // Adjust the x-coordinate based on your layout
        .attr('y', 30) // Adjust the y-coordinate based on your layout
        .attr('width', 100) // Set the width of the box
        .attr('height', 80) // Set the height of the box
        .attr('font-size', '0.7rem') // Set the font size to a smaller value
        // .style('border', '1px solid #000') // Set the border style
        .append('xhtml:div')
        .style('width', '100%')
        .style('height', '100%')
        .style('overflow', 'auto') // Set overflow to auto for scrollability
        .append('xhtml:div')
        .style('white-space', 'pre-wrap') // Set white-space to pre-wrap for line breaks
        .selectAll('div')
        .data(instruction)
        .enter()
        .append('xhtml:div')
        .html(d => d); // Use html method to parse HTML and allow line breaks

      // Draw the empty progress bar
      emptyProgressBarGroup
        .append('rect')
        .attr('x', 48)
        .attr('y', yScale(0))
        .attr('width', 4)
        .attr('height', yScale(5) - yScale(0))
        .attr('fill', 'none')
        .attr('stroke', 'gray')
        .attr('stroke-width', 2);

        const filledHeight = yScale(1) - yScale(0.4);
        function getStatusFilledHeight(status, filledHeight) {
            switch (status) {
              case 'Manifested':
                return filledHeight;  // Adjusted for Manifested
              case 'Not Picked':
                return filledHeight * 2.2;  // Adjusted for Not Picked
              case 'In Transit':
                return filledHeight * 4.3;  // Adjusted for In Transit
              case 'Pending':
                return filledHeight * 5.8; 
              case 'Dispatched':
                return filledHeight * 7.6; 
                case 'Delivered':
                return filledHeight * 8; 
              // ... other cases
              default:
                return 0;
            }
          }
      // Draw the filled progress bar based on the current status
      // Adjust the filled height
      colorProgressBarGroup
        .append('rect')
        .attr('x', 47)
        .attr('y', yScale(0))
        .attr('width', 6)
        .attr('height', getStatusFilledHeight(status.Status, filledHeight))
        .attr('fill', 'darkorange') // Set the color to dark yellow
        .attr('stroke', 'none');
  
      // Create circles for each status type
      const circleSpacing = 40;
      const circleSpacing1 = 50;
      const circles = svg
        .selectAll('circle')
        .data(['Manifested', 'In Transit', 'Dispatched', 'Delivered'])
        .enter()
        .append('circle')
        .attr('cx', 50)
        .attr('cy', (d, i) => (i === 0 ? yScale(i) : i === 1 ? yScale(i) + circleSpacing : yScale(i) + 2 * circleSpacing1)) 
        .attr('r', 15)
        .attr('fill', (d) => {
            if (status.Status === 'Pending' && d === 'In Transit') {
              return 'lightblue'; // Highlight In Transit when status is Pending
            } else {
              return d === 'Manifested' || (status.Status === 'Not Picked' && d === 'Not Picked') ? 'lightgreen' : getStatusColor(d);
            }
          })
        .attr('stroke', (d) => {
            if (status.Status === 'Pending' && d === 'In Transit') {
              return 'black'; // Highlight In Transit stroke when status is Pending
            } else {
              return status.Status === d || (status.Status === 'Not Picked' && d === 'Manifested') ? 'black' : 'none';
            }
          })
        .attr('stroke-width', 2);
  
      // Add text next to each circle
      svg
        .selectAll('text')
        .data(['Manifested', 'In Transit', 'Dispatched', 'Delivered'])
        .enter()
        .append('text')
        .attr('x', 80)
        .attr('y', (d, i) => (i === 0 ? yScale(i) : i === 1 ? yScale(i) + circleSpacing + 4 : yScale(i) + 2 * circleSpacing + 22))
        .text((d) => getDisplayText(d))
        .attr('fill',(d) => {
            if (status.Status === 'Pending' && d === 'In Transit') {
              return 'black'; // Highlight In Transit fill when status is Pending
            } else {
              return status.Status === d || (status.Status === 'Not Picked' && d === 'Manifested') ? 'black' : 'gray';
            }
          })
        .attr('font-size', 12)
        .attr('text-anchor', 'start');
    }
  
    // Function to determine circle color based on status
    function getStatusColor(status) {
      switch (status) {
        case 'Manifested':
          return 'lightgreen';
        case 'Not Picked':
          return 'lightyellow';
        case 'In Transit':
          return 'lightblue';
        case 'Pending':
          return 'lightblue';
        case 'Dispatched':
          return 'lightpink';
        case 'Delivered':
          return 'darkgreen';
        default:
          return 'black';
      }
    }
  
    // Function to calculate filled height for the progress bar
    function getStatusFilledHeight(status, filledHeight) {
      switch (status) {
        case 'Manifested':
          return filledHeight;
        case 'Not Picked':
          return filledHeight * 2;
        case 'In Transit':
          return filledHeight * 3;
        case 'Pending':
          return filledHeight * 4;
        case 'Dispatched':
          return filledHeight * 5;
        case 'Delivered':
          return filledHeight * 6;
        default:
          return 0;
      }
    }
     function getDisplayText(apiStatus) {
      switch (apiStatus) {
        case 'Dispatched':
          return 'Out for Delivery';
        // Add more cases as needed
        default:
          return apiStatus;
      }
    }
  }, [status]);

  return <div ref={diagramRef}></div>;
};

export default TrackingDiagram;

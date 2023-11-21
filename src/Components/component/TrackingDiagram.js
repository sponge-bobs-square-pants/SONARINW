import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TrackingDiagram = ({ status }) => {
  const diagramRef = useRef(null);

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
                return filledHeight * 2.5;  // Adjusted for Not Picked
              case 'In Transit':
                return filledHeight * 4.3;  // Adjusted for In Transit
              case 'Pending':
                return filledHeight * 6; 
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
        .attr('x', 48)
        .attr('y', yScale(0))
        .attr('width', 4)
        .attr('height', getStatusFilledHeight(status.Status, filledHeight))
        .attr('fill', 'darkorange'); // Set the color to dark yellow
  
      // Create circles for each status type
      const circleSpacing = 49;
      const circles = svg
        .selectAll('circle')
        .data(['Manifested', 'In Transit', 'Pending', 'Dispatched', 'Delivered'])
        .enter()
        .append('circle')
        .attr('cx', 50)
        .attr('cy', (d, i) => (i === 0 ? yScale(i) : yScale(i) + circleSpacing))
        .attr('r', 15)
        .attr('fill', (d) => (d === 'Manifested' || (status.Status === 'Not Picked' && d === 'Not Picked') ? 'lightgreen' : getStatusColor(d)))
        .attr('stroke', (d) => ((status.Status === d || (status.Status === 'Not Picked' && d === 'Manifested')) ? 'black' : 'none'))
        .attr('stroke-width', 2);
  
      // Add text next to each circle
      svg
        .selectAll('text')
        .data(['Manifested', 'In Transit', 'Pending', 'Dispatched', 'Delivered'])
        .enter()
        .append('text')
        .attr('x', 80)
        .attr('y', (d, i) => (i === 0 ? yScale(i) : yScale(i) + circleSpacing + 4))
        .text((d) => getDisplayText(d))
        .attr('fill', (d) => ((status.Status === d || (status.Status === 'Not Picked' && d === 'Manifested')) ? 'black' : 'gray'))
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
          return 'lightcoral';
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

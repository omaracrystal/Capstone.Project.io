function profileMain() {
    console.log("this is the main profile js");


    // Set Up
    var pi = Math.PI,
        width = 600,
        height = 400;
    var iR = 170;
    var oR = 110;
    var cur_color = 'limegreen';
    var new_color, hold;
    var max = 180,
        min = 0,
        current = 10;
    var arc = d3.svg.arc().innerRadius(iR).outerRadius(oR).startAngle(-90 * (pi / 180)); // Arc Defaults
    // Place svg element

    var svg = d3.select("d3").append("svg").attr("width", width).attr("height", height)
        .append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var background = svg.append("path").datum({
        endAngle: 90 * (pi / 180)
    }).style("fill", "#ddd").attr("d", arc); // Append background arc to svg

    var foreground = svg.append("path").datum({
        endAngle: -90 * (pi / 180)
    }).style("fill", cur_color).attr("d", arc); // Append foreground arc to svg

    var max = svg.append("text").attr("transform", "translate(" + (iR + ((oR - iR) / 2)) + ",15)") // Display Max value
        .attr("text-anchor", "middle").style("font-family", "Helvetica").text(max); // Set between inner and outer Radius

    // Display Min value
    var min = svg.append("text").attr("transform", "translate(" + -(iR + ((oR - iR) / 2)) + ",15)") // Set between inner and outer Radius
        .attr("text-anchor", "middle").style("font-family", "Helvetica").text(min);

    // Display Current value
    var current = svg.append("text").attr("transform", "translate(0," + -(iR / 4) + ")") // Push up from center 1/4 of innerRadius
        .attr("text-anchor", "middle").style("font-size", "50").style("font-family", "Helvetica").text(current);

    // Update every x seconds
    setInterval(function() {
        var num = Math.random() * 180;
        var numPi = Math.floor(num - 89) * (pi / 180); // Get value
        if (num >= 121) {
            new_color = 'red';
        } else if (num >= 61) {
            new_color = 'orange';
        } else {
            new_color = 'limegreen';
        } // Get new color
        current.transition().text(Math.floor(num)); // Text transition

        // Arc Transition
        foreground.transition().duration(750).styleTween("fill", function() {
            return d3.interpolate(new_color, cur_color);
        }).call(arcTween, numPi);

        // Set colors for next transition
        hold = cur_color;
        cur_color = new_color;
        new_color = hold;
    }, 1500); // Repeat every 1.5s

    function arcTween(transition, newAngle) {
        transition.attrTween("d", function(d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            return function(t) {
                d.endAngle = interpolate(t);
                return arc(d);
            };
        });
    } // Update animation


}

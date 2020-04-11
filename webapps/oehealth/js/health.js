/*
 * Copyright (c) 2018 by Progress Software Corporation.
 * 14 Oak Park Bedford, MA 01730.  All rights reserved.
 *
 * No part of this program or document may be reproduced
 * in  any form or by any means without permission in
 * writing from Progress Software Corporation.
 */

// Create a template used for the data in each cell of the map
//
function createTemplate() {
   return kendo.template(
       "#= text # #= parseInt(dataItem.health * 100.0,10) #% #if (dataItem.failedBy != null )  { # &\\#8594; Failed by: #= dataItem.failedBy # # } #");
}

// Create the treemap
//
function createTreeMap() {
    $("#treeMap").kendoTreeMap({
        template: createTemplate(),
        dataSource: {
            transport: {
                read: {
                    url: "health?view=details",
                    dataType: "json"
                }
            },
            schema: {
                model: {
                    fields: {
                        name: { from: "name", type: "string" },
                        color: { from: "color", type: "string" },
                        description: { from: "config.description", type: "string" },
                        health: { from: "result.health", type: "number" },
                        value: { from: "result.value", type: "object" },
                        weight: { from: "config.weight", type: "number" },
                        failedBy: { from: "result.failedBy", type: "string" }
                    },
                    children: "probes"                  
                }
            }
        },
        valueField: "weight",
        textField: "name",
        colorField: "color",
        dataBound: function (e) {
          if (e.node) {
            var element = this.findByUid(e.node.uid);
            element.css("background-color", e.node.color);
          }
        }
    });
    
    $("#treeMap").kendoTooltip({
        filter: ".k-leaf,.k-treemap-title",
        position: "top",
        content: function (e) {
            var treemap = $("#treeMap").data("kendoTreeMap");
            var item = treemap.dataItem(e.target.closest(".k-treemap-tile"));
            return "<div><b>" + item.name + "</b><br>" 
                + item.description + "<br>" +
                "<br>Health:&nbsp;&nbsp;" + item.health +
                "<br>Weight:&nbsp;&nbsp;" + item.weight +
                "<br>Value:&nbsp;&nbsp;<pre>" + kendo.stringify( item.value, undefined, 2 ) + "</pre>" +
                "</div>"; 
        }
    });      
}

// Refresh - refreshes the data in the map.
//
function refresh() {
    var treemap = $("#treeMap").data("kendoTreeMap");
    treemap.dataSource.read();
}

// Ready 
// Creates the treemap and sets the page refresh interval
// Sets the 
$(document).ready(function() {
    createTreeMap();

    // Query the health URL for the polling interval
    $.get( "health?view=summary" )
         .done(function( data ) {
            var wait = data.interval * 1000;
            // Set the refresh the same as the polling interval
            var refreshId = setInterval( refresh, wait );
        });
});


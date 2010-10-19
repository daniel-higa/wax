var OpenLayersPlusLegend = function(opts) {
    var self = this;
    this.map = $(opts[0]).data('map');

    this.setLegend = function(layer) {
        // The layer param may vary based on the context from which we are called.
        layer = layer.object ? layer.object : layer;
        if ('legend' in layer) {
            var legend_content = layer.legend || 'your mother';
            var legends = $('div.openlayers-legends', self.map.div);
            if (layer.visibility && !('legendDiv' in layer)) {
                layer.legendDiv = $("<div class='openlayers-legend'></div>").append(legend_content);
                legends.append(layer.legendDiv);
            }
            else if (!layer.visibility && ('legendDiv' in layer)) {
                layer.legendDiv.remove();
                delete layer.legendDiv;
            }
        }
    };

    this.map.layers.forEach(function (layer) {
        if (!$('div.openlayers-legends', self.map.div).size()) {
            $(self.map.div).append("<div class='openlayers-legends'></div>");
        }
        layer.events.register('visibilitychanged', layer, self.setLegend);
        self.setLegend(layer);
    });
};

var app;
(function (app) {
    function singleClickDirective($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var fn = $parse(attr['singleClickDirective']);
                var delay = 300, clicks = 0, timer = null;
                element.on('click', function (event) {
                    clicks++; //count clicks
                    if (clicks === 1) {
                        timer = setTimeout(function () {
                            scope.$apply(function () {
                                fn(scope, { $event: event });
                            });
                            clicks = 0; //after action performed, reset counter
                        }, delay);
                    }
                    else {
                        clearTimeout(timer); //prevent single-click action
                        clicks = 0; //after action performed, reset counter
                    }
                });
            }
        };
    }
    app.singleClickDirective = singleClickDirective;
})(app || (app = {}));
//# sourceMappingURL=common.directives.js.map
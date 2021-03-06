'use strict';
/* global crossfilter */

describe('Module: angularDc', function () {
  var scope, $sandbox, $compile, $timeout;

  // load the controller's module
  beforeEach(module('angularDc'));

  beforeEach(inject(function ($injector, $rootScope, _$compile_, _$timeout_) {
    scope = $rootScope;
    $compile = _$compile_;
    $timeout = _$timeout_;

    $sandbox = $('<div id="sandbox"></div>').appendTo($('body'));
  }));

  afterEach(function() {
    $sandbox.remove();
    scope.$destroy();
  });

  var cf = crossfilter();
  var d = cf.dimension(function(){return 'test';});
  var g = d.group(function(){return 'bar';});
  var templates = {
    'default': {
      scope: {d:d, g:g},
      element: '<div dc-width="200" dc-config="222" dc-chart="barChart" dc-dimension="d" dc-group="g" dc-x="d3.scale.linear().domain([-2500, 2500])" dc-x-axis="{tickValues:[0]}"></div>'
    }
  };

  function compileDirective(template) {
    template = template ? templates[template] : templates['default'];
    angular.extend(scope, template.scope || templates['default'].scope);

    var $element = $(template.element).appendTo($sandbox);
    $element = $compile($element)(scope);
    scope.$digest();
    return $element;
  }

  it('chart elements should contain a single svg element', function () {
    var elm = compileDirective();
    expect(elm.children().length).toBe(1);
  });

  // it('chart elements should be 350px wide', function () {
  //   var elm = compileDirective();
  //   expect(elm[0].children()).toBe(350);
  // });

});

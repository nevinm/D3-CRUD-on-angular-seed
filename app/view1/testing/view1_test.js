'use strict';

describe('studyAppTest.view1 module', function() {

  beforeEach(module('studyAppTest.view1'));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var userCtrl = $controller('userCtrl');
      expect(userCtrl).toBeDefined();
    }));

  });
});
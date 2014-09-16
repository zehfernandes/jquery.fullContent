/*
 *  Project: Jquery FullContent
 *  Description: Plugin which allows a full content browser navigation. Flexible and Extended.
 *  Author: Zeh Fernandes | zehfernandes.com

 *  This plugin needs jquery.ScrollTo http://demos.flesler.com/jquery/scrollTo/ to work.
 */

;(function ( $, window, undefined ) {

  var pluginName = 'fullContent',
      document = window.document,
      defaults = {
        stages: "div",
        idComplement: 'page_',
        stageStart: 1,
        speedTransition: 800,
        mapPosition: '',
        ease: ''
      };

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.element = element;
    this.$window = $(window);

    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
    this.configStage();
  }

  Plugin.prototype.configStage = function () {

  	var winwidth = this.$window.width(),
        winheight = this.$window.height(),
        stages = this.options.stages,
        childrenPosition = this.options.mapPosition,
        count = 0;

  	$(this.element).children(stages).each(function(index) {

	   	$(this).css({
        'position' : 'absolute',
        'width'	: winwidth,
        'height' : winheight
	   	});

	   	if(childrenPosition[index]) {

        var position = childrenPosition[index];

        $(this).css({
	   			'top' : winheight * (position['v'] - 1),
	   			'left' : winwidth * (position['h'] - 1)
	   		});

	   	} else {
		   	$(this).css({ 'top' : winheight * count });
	   	}

	   	count++;

  	});

  	//Ajust the browser viewport to actual stage
  	if (window.location.hash) {
  		var hash = window.location.hash.replace(/^#\/?/,'');
  		$.scrollTo('#' + this.options.idComplement + hash , 0 );
  	}

  };

  Plugin.prototype.init = function () {

    var self = this,
        stages = this.options.stages,
        idComplement = this.options.idComplement;

    $(this.element).children(stages).each(function(index) {

  	 	//Change the ID, added complement to allows scroll animation
  	 	var stageID = $(this).attr('id');
     	$(this).attr('id', idComplement+stageID);

      //Scroll To startStage
     	if((!window.location.hash) && (self.options.stageStart == index+1)) {
  	   	$.scrollTo($(this), 0 );
  	   	window.location.hash = 	$(this).attr('id').replace(idComplement, '');
     	}

    });

    this.bind();

  };

  Plugin.prototype.bind = function () {

    var self = this,
        speed = this.options.speedTransition,
        idComplement = this.options.idComplement,
        ease = this.options.ease;

    this.$window.resize(function() {
      self.configStage();
    });

    this.$window.bind( 'hashchange', function( event ){
      var hash = window.location.hash.replace(/^#\/?/,'');
      if (ease) {
        $.scrollTo('#'+self.options.idComplement+hash, speed, {easing: ease});
      } else {
        $.scrollTo('#'+self.options.idComplement+hash, speed);
      }
    });

  };


  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }
    });
  }

}(jQuery, window));
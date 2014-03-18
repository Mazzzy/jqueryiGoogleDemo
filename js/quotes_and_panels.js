// JavaScript for quotes and panels in widget 5
var quotes = {
	toogleEffect : function(e) {
		
		$('.quotes_list li').hover(function () {
   			 $(this).css({'background-color' : '#FF9', 'font-weight' : 'bolder', 'color' : '#03C'});
 		}, function () {
    		var cssObj = {
				'background-color' : '',
      			'font-weight' : '',
		        'color' : '#000'
		    };
		    $(this).css(cssObj);
		   }
		);	
	},
	panelFlips : function(e) {
		$('#accordion a.item').click(function () {

			//slideup or hide all the Submenu
			$('#accordion li').children('ul').slideUp('fast');	
			
			//remove all the "Over" class, so that the arrow reset to default
			$('#accordion a.item').each(function () {
				if ($(this).attr('rel')!='') {
					$(this).removeClass($(this).attr('rel') + 'Over');	
				}
			});
			
			//show the selected submenu
			$(this).siblings('ul').slideDown('fast');
			
			//add "Over" class, so that the arrow pointing down
			$(this).addClass($(this).attr('rel') + 'Over');			

			return false;

		});
	},
	initialise : function(e){
		quotes.toogleEffect();
		quotes.panelFlips();
	}
}
           
quotes.initialise();   
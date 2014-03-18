/* javascript for widget functionality */
var myiGoogle = {
	collection:{
		widgetSelector : '.Widget',
		removeSelector : '.delete_widget',
		editSelector   : '.edit_widget',
		saveSelector   : '.save_widget',
		headerSelector : '.WidgetHeader',
		bodySelector   : '.WidgetBody'
	},
	sortable : function (){	/* for column to become sortable*/
		$("#column1,#column2,#column3").sortable({
           	connectWith: "#column1,#column2,#column3",
	        handle: '.WidgetHeader',
	        opacity: 0.6
    	});
		$("#column1,#column2,#column3").disableSelection();
	},
	removeWidget : function (){ /* for removing widget */
		$(myiGoogle.collection.removeSelector).mousedown(function (e) {
     		 e.stopPropagation();    
   		}).click(function () {
			 if(confirm('Are you sure, wanna remove it?')) {
				 var $this = this;
				 $($this).parents(myiGoogle.collection.widgetSelector).animate({
    			   opacity: 0},1000, function() {
    				 $(this).wrap('<div/>').parent().slideUp(function () {
   	                  $(this).remove();
                     });
  	 			   });
			 }
    	});
	},
	editWidget : function() { /* for editing contents in widget */
		  	$(myiGoogle.collection.editSelector).mousedown(function (e) {
                    e.stopPropagation();    
                }).click(function () {
                	var current = this;
                	$(current).hide();

                	var thisheader  = $(current).parents(myiGoogle.collection.headerSelector);
                	var titleValue  = thisheader.find('label').text();
                	var thisEditbox = $(current).parents(myiGoogle.collection.widgetSelector).find('.edit-box').show();
					
					var currentWidgetBody = thisheader.parent().find('.WidgetBody');
					var htmlValue = currentWidgetBody.html();//$('.Widget > :nth-child(3)').html();
					var inputField = thisEditbox.find('input');
					var textareaField = thisEditbox.find('textarea');
					var saveBtn = thisheader.find(myiGoogle.collection.saveSelector);
					
                    inputField.val(titleValue).focus();
					textareaField.val(htmlValue);
					
					var labelField = thisheader.find('label');
					
					$(inputField).keyup(function(){
						var updatedTitle = inputField.val();
						labelField.text(updatedTitle);
					});
					
					$(textareaField).keyup(function(){
						console.log('Edit html of content done');
						var textareaValue = textareaField.val();
						currentWidgetBody.html(textareaValue);
					});
										
                    saveBtn.show();
            });
            $(myiGoogle.collection.saveSelector).mousedown(function (e) {
                    e.stopPropagation();    
                }).click(function () {
                	var current = this;
                	$(current).hide();
                	var thisEditbox  = $(this).parents(myiGoogle.collection.widgetSelector).find('.edit-box');
                	var thisheader   = $(this).parents(myiGoogle.collection.headerSelector);
					var editBtn = thisheader.find(myiGoogle.collection.editSelector);
					
					thisEditbox.hide();
                    editBtn.show();   
            });

             $('<div class="edit-box" style="display:none;"/>')
                    .append('<ul><li class="item"><label>Edit title?</label><input/></li></ul>')
                    .append('<ul><li class="item"><label>Its HTML?</label><textarea class="txtcontents" rows="8" cols="43"></textarea></li>')
                    .append('</ul>')
                    .insertAfter(myiGoogle.collection.headerSelector);
    },
	minMax : function(e){
		$('<div class="minmax_widget"/>')
           .append('<img src="images/minimize.png" class="minimizeImg" alt="Minimize button image" title="Minimize Widget Contents" width="20" height="20"/>')
		   .append('<img src="images/maximize.png" class="maximizeImg" alt="Maximize button image" title="Maximize Widget Contents" width="20" height="20" style="display:none"/>')
           .insertAfter('.WidgetHeader label');
		   
		$('.minmax_widget .minimizeImg').mousedown(function (e) {
                    e.stopPropagation();    
           }).click(function () {
			   var current = this;
			   var thisheader  = $(current).parents(myiGoogle.collection.headerSelector);
			   var currentWidget = thisheader.parent();
			   var currentWidgetBody = currentWidget.find('.WidgetBody');
			   
			   var currentmaxImg = thisheader.find('.maximizeImg');
			   
			   $(current).hide();
			   $(currentmaxImg).show();
			   
			   $(currentWidgetBody).css('display','none');
			   $(currentWidget).css('min-height','0');
			   
		});	
		
		$('.minmax_widget .maximizeImg').mousedown(function (e) {
                    e.stopPropagation();    
           }).click(function () {
			   var current = this;
			   var thisheader  = $(current).parents(myiGoogle.collection.headerSelector);
			   var currentWidget = thisheader.parent();
			   var currentWidgetBody = currentWidget.find('.WidgetBody');
			   
			   var currentminImg = thisheader.find('.minimizeImg');
			   
			   $(current).hide();
			   $(currentminImg).show();
			   
			   $(currentWidgetBody).css('display','block');
			   $(currentWidget).css('min-height','200px');
			   
		});	
	},
	initialise : function(){
		myiGoogle.sortable();
    	myiGoogle.removeWidget();
		myiGoogle.editWidget();
		myiGoogle.minMax();
	}
}

myiGoogle.initialise();
	function addReplayContent() {
		$content = $("#replayContent").val().trim();
		if($content == "") return;
		$option = $("<option>");
		$option.val($content);
		$option.text($content);
		$("#content").append($option);
		
        var dt = localStorage.getItem("contents");
        if(dt) {
        	var json = JSON.parse(dt);
        	json.push($content);
        	
        	var jsonText = JSON.stringify(json);
        	localStorage.setItem("contents", jsonText);
        } else {
        	var a = [];
        	a.push($content);
        	var jsonText = JSON.stringify(a);
        	localStorage.setItem("contents", jsonText);
        }
        
	}
	
	function initReplayContent(){
		var dt = localStorage.getItem("contents");
        if(dt) {
        	var json = JSON.parse(dt);
        	for(var i=0; i<json.length; i++) {
        		var content = json[i];
        		$option = $("<option>");
        		$option.val(content);
        		$option.text(content);
        		$("#content").append($option);
        	}
        }
	}
	
	function delReplayContent() {
		var se = document.getElementById("content");
	    var optionElements = se.getElementsByTagName("option");
	    var len = optionElements.length;
	    for(var i = len-1; i >= 0; i--){
	    	if(i > 1) {
	    		document.getElementById("content").options.remove(i); 
	    	}
	    }
		localStorage.clear();
	}
	
	
	$( "#tabs" ).tabs();
	
	function logTabs(tabs) {
	  for (let tab of tabs) {
		var content = $("#doneMsg").val();
		//content += tab.url + "\n";
		content += JSON.stringify(tab) + "\n";
		JSON.stringify
		$("#doneMsg").val(content);
	  }
	}

	function onError(error) {
	  $("#doneMsg").val(error);
	}
	
	$(function(){
		initReplayContent();
		
		$("button#addBtn").click(function(){
			addReplayContent();
		});
		
		$("button#delBtn").click(function(){
			delReplayContent();
		});
		
		$("#doWorkBtn").click(function(){
			  var url = "http://192.168.1.133:8080/mytoolkit/HelloServlet";
			  $.get(url, function(result){
				$("#doneMsg").val(result);
			  });
		});
	});


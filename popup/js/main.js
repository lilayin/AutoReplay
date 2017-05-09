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
	
	
	$(function(){
		initReplayContent();
		
		$("button#addBtn").click(function(){
			addReplayContent();
		});
		
		$("button#delBtn").click(function(){
			delReplayContent();
		});
		
		$("#doWorkBtn").click(function(){
			var date = new Date();

			var start = 0;
			var urlTypeA = 'http://crm.meierbei.com/Customer/CustomerManageList?sEcho=3&iColumns=10&sColumns=&iDisplayStart='+start+'&iDisplayLength=20&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&mDataProp_7=7&mDataProp_8=8&mDataProp_9=9&searchKey={"cName":"","QQ":"","tel":"","Wechat":"","aTime_Start":"","aTime_End":"","intentionLevel":"","orderby":"desc","kefu":"107","tgtype":"","parea":"","carea":"","projectbig":"","LastGenjTime":"","extSearchKey":"QpCB2iuY4XU=","isFor":"0","AssClientId":"","AssClientName":"","ClientProvinceAreaId":"","ClientCityAreaId":"","isRecommend":false,"TagId":"0"}&_='+date.getTime();
			var urlTypeB = 'http://crm.meierbei.com/Customer/CustomerManageList?sEcho=2&iColumns=10&sColumns=&iDisplayStart='+start+'&iDisplayLength=20&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&mDataProp_7=7&mDataProp_8=8&mDataProp_9=9&searchKey={"cName":"","QQ":"","tel":"","Wechat":"","aTime_Start":"","aTime_End":"","intentionLevel":"","orderby":"desc","kefu":"107","tgtype":"","parea":"","carea":"","projectbig":"","LastGenjTime":"","extSearchKey":"bu7KP7O6V3w=","isFor":"0","AssClientId":"","AssClientName":"","ClientProvinceAreaId":"","ClientCityAreaId":"","isRecommend":false,"TagId":"0"}&_='+date.getTime();
			var urlTypeC = 'http://crm.meierbei.com/Customer/CustomerManageList?sEcho=2&iColumns=10&sColumns=&iDisplayStart='+start+'&iDisplayLength=20&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&mDataProp_7=7&mDataProp_8=8&mDataProp_9=9&searchKey={"cName":"","QQ":"","tel":"","Wechat":"","aTime_Start":"","aTime_End":"","intentionLevel":"","orderby":"desc","kefu":"107","tgtype":"","parea":"","carea":"","projectbig":"","LastGenjTime":"","extSearchKey":"vWAk1RlyioI=","isFor":"0","AssClientId":"","AssClientName":"","ClientProvinceAreaId":"","ClientCityAreaId":"","isRecommend":false,"TagId":"0"}&_='+date.getTime();
			var urlTypeD = 'http://crm.meierbei.com/Customer/CustomerManageList?sEcho=2&iColumns=10&sColumns=&iDisplayStart='+start+'&iDisplayLength=20&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&mDataProp_7=7&mDataProp_8=8&mDataProp_9=9&searchKey={"cName":"","QQ":"","tel":"","Wechat":"","aTime_Start":"","aTime_End":"","intentionLevel":"","orderby":"desc","kefu":"107","tgtype":"","parea":"","carea":"","projectbig":"","LastGenjTime":"","extSearchKey":"EhjPCKLe2b8=","isFor":"0","AssClientId":"","AssClientName":"","ClientProvinceAreaId":"","ClientCityAreaId":"","isRecommend":false,"TagId":"0"}&_='+date.getTime();
			var urls = [];
			urls.push(urlTypeA);
			urls.push(urlTypeB);
			urls.push(urlTypeC);
			urls.push(urlTypeD);

			for(var i=0; i<urls.length; i++) {

			
				var request = new XMLHttpRequest();
				request.onreadystatechange = function () {
					var DONE = this.DONE || 4;
					if (this.readyState === DONE){
						var binStr = this.responseText;
						var total = binStr.iTotalRecords;
						while(start*20
						console.log(binStr);
						$("#doneMsg").val(binStr);
					}
				};
				request.open('GET', urls[i], true);
				request.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
				request.send(null);
			}
		});
	});


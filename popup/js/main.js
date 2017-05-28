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
		var idx = se.selectedIndex;
		if(idx>-1) {
            document.getElementById("content").options.remove(idx);
        }
        localStorage.setItem("contents", {});
        var optionElements = se.getElementsByTagName("option");
        var json = [];
		for(var i = 0; i < optionElements.length; i++){
            $option = $(optionElements[i]);
            json.push($option.val());
        }
        var jsonText = JSON.stringify(json);
        localStorage.setItem("contents", jsonText);
	}
	
	function MyAjax(url, method, success, failure) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			var DONE = this.DONE || 4;
			if (this.readyState === DONE){
				success(this.responseText);
			}else {
				if(failure) {
					failure();
				}
			}
		};
		request.open(method, url, false);
		request.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
		request.send(null);

	}


	function genJin(id, content){
		
		var url = "http://crm.meierbei.com/Customer/CustomerGenJin";
		var postData = "clientId="+id+"&content="+content;
		postData = encodeURI(postData);
		var msg = "处理失败";
		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			var DONE = this.DONE || 4;
			if (this.readyState === DONE){
				if(this.status==200) {
					msg = this.responseText;
				}
			}
		};
		request.open("POST", url, false);
		request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"); 
		request.send(postData);
		return msg;
	}	


	function isChinese(temp) {  
	    var re=/[^\u4e00-\u9fa5]/;  
	    if(re.test(temp)) return false;  
	    return true;  
	}  


	function getCriUser(id){
		var url = "http://crm.meierbei.com/Customer/AskFor";
		var msg = "处理失败";
		
/**

		var postData = "clientid="+id;
		var msg = "处理失败";
		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			var DONE = this.DONE || 4;
			if (this.readyState === DONE){
				msg = this.responseText;
			}
		};
		request.open("post", url, true);
		request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"); 
		request.send(postData);
**/
		   $.ajax({
		        url: url,
		        type: "post",
		        dataType: "json",
		        data: { clientid: id },
		        beforeSend: function () {
		        },
		        error: function () {
		        },
		        success: function (data) {
				msg = data;
		        }
		    });

		return msg;
	}	

	function getResource() {
		var date = new Date();
		var time = date.getTime();
		
		var index = 0;
		var number = 0;

		while(number<1) {
			var queryUrl = 'http://crm.meierbei.com/Customer/CirculateManageList?sEcho=2&iColumns=9&sColumns=&iDisplayStart='+index+'&iDisplayLength=20&mDataProp_0=cID&mDataProp_1=intentionLevel&mDataProp_2=2&mDataProp_3=Contacttime&mDataProp_4=area&mDataProp_5=SpreadSource&mDataProp_6=SpreadUserName&mDataProp_7=addTime&mDataProp_8=lastContactTime&searchKey={"cName":"","QQ":"","tel":"","Wechat":"","aTime_Start":"","aTime_End":"","intentionLevel":"A","CirculateType":"1","orderby":"desc","kefu":"","tgtype":"","parea":"","carea":"","projectbig":"d2e74ec6-d1dd-4521-9f21-297bf4870fc4","LastGenjTime":"","beg_lastContact_time":"","end_lastContact_time":""}&_='+time;
			MyAjax(queryUrl, 'GET',  function(responseData){
				try {
					var a = JSON.parse(responseData); 
					var client = a.aaData;
					for(var i=0; i<client.length; i++) {
						var id = client[i].ID;
						var name = client[i].cName;
						var level = client[i].intentionLevel;
						var lastContactTime = client[i].lastContactTime;
						var flag = isChinese(name);
						if(flag && name.length>1 && level === "A" && name.indexOf("先生") < 0 && name.indexOf("女士") < 0){
							var content = $("#userMsg").val();
							content += id + ":" +name + "\n";
							$("#userMsg").val(content);
							number++;
							getCriUser(id);
						}

				
					}
				} catch(error){ 
					var content = $("#userMsg").val();
					content += "服务器内部错误\n";		
					$("#userMsg").val(content);
				}
			});
			index = (index+1)*20;
		}
		
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

		$("button#getUserBtn").click(function(){
			$("#getUserBtn").attr("disabled", true);
			getResource();
			$("#getUserBtn").attr("disabled", false);
		});
		
		$("#doWorkBtn").click(function(){
			$("#doWorkBtn").attr("disabled", true);
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


			var total = 0;
			var ret = null;
			for(var i=0; i<urls.length; i++) {
				MyAjax(urls[i], 'GET',  function(data){
					date = new Date();
					start = 0;
					ret = JSON.parse(data); 
					total = ret.iTotalRecords;
					var uri = "";
					while(start*20<total) {
						switch (i) {
							case 0:
								uri= 'http://crm.meierbei.com/Customer/CustomerManageList?sEcho=3&iColumns=10&sColumns=&iDisplayStart='+start+'&iDisplayLength=20&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&mDataProp_7=7&mDataProp_8=8&mDataProp_9=9&searchKey={"cName":"","QQ":"","tel":"","Wechat":"","aTime_Start":"","aTime_End":"","intentionLevel":"","orderby":"desc","kefu":"107","tgtype":"","parea":"","carea":"","projectbig":"","LastGenjTime":"","extSearchKey":"QpCB2iuY4XU=","isFor":"0","AssClientId":"","AssClientName":"","ClientProvinceAreaId":"","ClientCityAreaId":"","isRecommend":false,"TagId":"0"}&_='+date.getTime();
								break;
							case 1:
								uri = 'http://crm.meierbei.com/Customer/CustomerManageList?sEcho=2&iColumns=10&sColumns=&iDisplayStart='+start+'&iDisplayLength=20&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&mDataProp_7=7&mDataProp_8=8&mDataProp_9=9&searchKey={"cName":"","QQ":"","tel":"","Wechat":"","aTime_Start":"","aTime_End":"","intentionLevel":"","orderby":"desc","kefu":"107","tgtype":"","parea":"","carea":"","projectbig":"","LastGenjTime":"","extSearchKey":"bu7KP7O6V3w=","isFor":"0","AssClientId":"","AssClientName":"","ClientProvinceAreaId":"","ClientCityAreaId":"","isRecommend":false,"TagId":"0"}&_='+date.getTime();
								break;
							case 2:
								uri = 'http://crm.meierbei.com/Customer/CustomerManageList?sEcho=2&iColumns=10&sColumns=&iDisplayStart='+start+'&iDisplayLength=20&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&mDataProp_7=7&mDataProp_8=8&mDataProp_9=9&searchKey={"cName":"","QQ":"","tel":"","Wechat":"","aTime_Start":"","aTime_End":"","intentionLevel":"","orderby":"desc","kefu":"107","tgtype":"","parea":"","carea":"","projectbig":"","LastGenjTime":"","extSearchKey":"vWAk1RlyioI=","isFor":"0","AssClientId":"","AssClientName":"","ClientProvinceAreaId":"","ClientCityAreaId":"","isRecommend":false,"TagId":"0"}&_='+date.getTime();
								break;
							case 3:	 
								uri = 'http://crm.meierbei.com/Customer/CustomerManageList?sEcho=2&iColumns=10&sColumns=&iDisplayStart='+start+'&iDisplayLength=20&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5&mDataProp_6=6&mDataProp_7=7&mDataProp_8=8&mDataProp_9=9&searchKey={"cName":"","QQ":"","tel":"","Wechat":"","aTime_Start":"","aTime_End":"","intentionLevel":"","orderby":"desc","kefu":"107","tgtype":"","parea":"","carea":"","projectbig":"","LastGenjTime":"","extSearchKey":"EhjPCKLe2b8=","isFor":"0","AssClientId":"","AssClientName":"","ClientProvinceAreaId":"","ClientCityAreaId":"","isRecommend":false,"TagId":"0"}&_='+date.getTime();
								break;
						}														
						MyAjax(uri, 'GET', function(responseData){
							var a = JSON.parse(responseData); 
							var client = a.aaData;
							for(var i=0; i<client.length; i++) {
								var id = client[i].ID;
								var name = client[i].RealName;
								var content = $("#doneMsg").val();

								var se = document.getElementById("content");
								var optionElements = se.getElementsByTagName("option");
								var len = optionElements.length;
								var rad = parseInt(Math.random()*len);
								var replyMsg = optionElements[rad].value;
								
								var retMsg = genJin(id, replyMsg);

								content += id + ":" + name +"=>" + replyMsg + "=>" + retMsg + "\n";
								$("#doneMsg").val(content);
							}			
						});
						start += 1;
					}

				});

			}
			$("#doWorkBtn").attr("disabled", false);
		});
	});


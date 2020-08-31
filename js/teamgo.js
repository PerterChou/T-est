const projectCard = " <div class=\"card-container\"><div class=\"outer\"><div class=\"container\"><div class=\"container-content\"><div class=\"container-content-header\"></div><div class=\"container-content-footer\"><div class=\"project-name\">新建项目</div></div></div></div></div></div>";
const searchPane = "<div class=\"panel-component search-result-panel\"><div class=\"panel-title\">项目</div><div class=\"panel-body search-result-panel-body\"><div class=\"result-list\"></div></div></div>";
const returnItem = " <div class=\"result-list-item\"><div class=\"result-list-item-title\"><div class=\"item-title-img\"><span class=\"title-img\"></span></div><div class=\"item-title-name\">Project 1</div></div></div>";

/*addProject()实现异步获取projectReturn.php页面的
projectName,并将其输出到TeamgGo.html(并不显示(<ul style='display:none'>),
然后获取该内容用于更改project-name,实现异步局部刷新.这么做的是为了将php的内容传给js
*/

function addProject(){
	//showProjects();
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}
	else{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function(){
		var cardParent = document.getElementById("card");
		var list = document.getElementById("infospace");
		cardParent.innerHTML = "";
		if(xmlhttp.readyState==4 && xmlhttp.status == 200){
		list.innerHTML = xmlhttp.responseText; //将返回的内容输出到id=projectList的<ul></ul>
		//var proList = list.getElementsByTagName("li");//获取ul里的所有存有projectName的li节点
		var proList = list.querySelectorAll("#projectList>li");
		for(var i=0;i<proList.length;i++){
			var newContainer = document.createElement("div");
			/*下面一行用于制作一个项目卡片,还未输出*/
			newContainer.innerHTML = projectCard;
			/*下面一行用于更改项目卡片的project-name*/
			newContainer.getElementsByClassName("project-name")[0].innerText = proList[i].innerText;
			/*下面一行用于在每一次末尾输出项目卡片*/
			cardParent.appendChild(newContainer);
		}
		}
	}
	xmlhttp.open("GET","projectReturn.php?t="+Math.random(),true);//获取服务器端projectReturn.php的内容
	xmlhttp.send();

}

function showAllSearch(){
	var xmlhttp1;
	if(window.XMLHttpRequest){
		xmlhttp1 = new XMLHttpRequest();
	}
	else{
		xmlhttp1=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp1.onreadystatechange = function(){
		var tabpanes = document.getElementsByClassName("search-result-wrap")[0];
		var info = document.getElementById("infospace");
		var list = document.querySelectorAll("#infospace>ul");
		tabpanes.innerHTML = "";
		
		if(xmlhttp1.readyState==4 && xmlhttp1.status == 200){
			info.innerHTML = xmlhttp1.responseText;
			for(var i=0;i<list.length;i++){
				var newPane = document.createElement("div");
				newPane.innerHTML = searchPane;
				newPane.getElementsByClassName("panel-title")[0].innerText = list[i].id;
				console.log(list[i].id);
				tabpanes.appendChild(newPane);
				var infoList = list[i].getElementsByTagName("li");
				for(var j=0;j<infoList.length;j++){
					var infoListChild = document.createElement("div");
					infoListChild.innerHTML = returnItem;
					infoListChild.getElementsByClassName("item-title-name")[0].innerText = infoList[j].innerText;
					tabpanes.getElementsByClassName("result-list")[i].appendChild(infoListChild);
				}
			}
			console.log(info.innerText);
		}
	}
	xmlhttp1.open("GET","projectReturn.php?t="+Math.random(),true);//获取服务器端projectReturn.php的内容
	xmlhttp1.send();
}
//document.querySelectorAll('.tabs-bar-scroll>ul>li')[0].addEventListener("click",showAllSearch);

/*将隐藏的web-content节点显示出来*/

function showProjects(){
		addProject();
		document.getElementById("web-content").style.display = "block";

}
var myVar;
window.onload = function(){
	showProjects();
	myVar = setInterval(function(){
			addProject();
		},10000);
}

function refleshCheck(checkbox) {
	if(document.getElementById("reflesh").checked == true){
		clearInterval(myVar);
	}else{
		myVar = setInterval(function(){
			addProject();
		},10000);
	}
	// body...
}
function test(){
	document.getElementById("web-content").style.display = "none";
}
var createNum = 0;
function showcreateMenu(){
	if(createNum%2==0){
		document.getElementsByClassName("next-overlay-wrapper")[0].style.display = "block";
	}else{
		document.getElementsByClassName("next-overlay-wrapper")[0].style.display = "none";
	}
	createNum++;
}
function showSearchBoard(){
	var sVar = document.getElementsByClassName("next-overlay-wrapper searcher");
	sVar[0].getElementsByClassName("next-overlay-wrapper-board")[0].style.opacity = 0.3;
	sVar[0].style.display = "flex";
	showAllSearch();
	document.getElementsByClassName('tabs-tabpane')[0].classList.add("active");
}
function closeSearchBoard(){
	var sVar = document.getElementsByClassName("next-overlay-wrapper searcher");
	sVar[0].getElementsByClassName("next-overlay-wrapper-board")[0].style.opacity = 0;
	sVar[0].style.display = "none";
}
function changeBorder1(){
	document.getElementsByClassName("next-input next-medium input")[0].style.borderColor = "dodgerblue";
}
function changeBorder2(){
	document.getElementsByClassName("next-input next-medium input")[0].style.borderColor = "gray";
}


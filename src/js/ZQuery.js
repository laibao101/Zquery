
function myEvent(obj,ev,fn){
	if(obj.attachEvent){ //ie下，并且this指向会被改变
		obj.attachEvent("on"+ev,function(){
			fn.call(obj)
		})
	}else{ //obj.addEventListener
		obj.addEventListener(ev,fn,false);
	}
}





function ZQuery(rArgs){
	//用来保存选中的元素
	this.elements=[];
	
	switch( typeof rArgs){
		case "function":   //调用函数
			myEvent(window,'load',rArgs)
			break;
		case "string":  //元素选择器 sizzle
				switch( rArgs.charAt(0)){
					case "#": //id选择器
						var obj=document.getElementById( rArgs.substring(1) );
						this.elements.push(obj);
						break;
					case ".":  //类选择器
						this.elements=document.getElementsByClassName( rArgs.substring(1) );
						break;
					default :  //TagName选择器
						this.elements=document.getElementsByTagName( rArgs );
				}
				//return this.elements; //错误导致不能找到object
			break;
		case "object":  //obj
			this.elements.push( rArgs );
			break;
		
	}
	ZQuery.prototype.selector=function(){
		return rArgs;
	}
	

	
}


ZQuery.prototype.click=function (fn){
	for(var i=0;i<this.elements.length;i++){
		myEvent(this.elements[i], 'click', fn);
	}
};

ZQuery.prototype.show=function(){
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].style.display="block";
	}
}

ZQuery.prototype.hide=function(){
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].style.display="none";
	}
}


ZQuery.prototype.hover=function(fn1,fn2){
	for(var i=0; i<this.elements.length; i++){
		myEvent( this.elements[i], 'mouseover', fn1);
		myEvent( this.elements[i], 'mouseout', fn2);
	}
}

ZQuery.prototype.css=function(attr,value){
	if(arguments.length==2){//设置样式
		for(var i=0; i<this.elements.length; i++){
			this.elements[i].style[attr]=value;
		}
	}else{//获取样式
		return	getStyle(this.elements[0],attr);
	}
	return newZQuery(this);
}

ZQuery.prototype.attr=function(attr,value){
	if(arguments.length==2){//设置属性
		for(var i=0; i<this.elements.length; i++){
			this.elements[i][attr]=value;
		}
	}else{//获取属性的值
		return	this.elements[0][attr];
	}
	
}

ZQuery.prototype.eq=function(index){
	
	return new ZQuery(this.elements[index]);
}

ZQuery.prototype.find=function(str){
	var arr=[];
	for(var i=0; i<this.elements.length; i++){
		if(str.charAt(0)=='.'){//class
			var Els=this.elements[i].getElementsByClassName( str.substring(1) );
			toArray(arr,Els);
			console.log(arr);
		}else{//tagName
			var Els=this.elements[i].getElementsByTagName(str);
			toArray(arr,Els);
		}
	}
	var newZQuery=new ZQuery();
	newZQuery.elements=arr;
	return newZQuery;
}


ZQuery.prototype.toggle=function(){
	var _arguments=arguments;
	for(var i=0; i<this.elements.length; i++){
		addToggle(this.elements[i]);
		
	}
	function addToggle(obj){
		var count=0;
		myEvent(obj, 'click',function(){
			_arguments[count++%_arguments.length].call(obj);
			
		})
		
	}
}
ZQuery.prototype.index=function(){
	var aBro=this.elements[0].parentNode.children;
	for(var i=0; i<aBro.length; i++){
		if(aBro[i]==this.elements[0]){
			return i;
		}
	}
}

ZQuery.prototype.addClass=function(className){
	
	for(var i=0; i<this.elements.length; i++){
		if(this.elements[i].className==''){//原本是没有class
			this.elements[i].className=className;
		}else{//原本有class
			var arr=[];
			var count=0;
			arr=this.elements[i].className.split(' ');
			//如果要添加的类原本已经存在，就不添加
			for(var j=0; j<arr.length; j++){
				if(arr[j]!=className) count++;
			}
			
			if(count == arr.length ) arr.push( className ); 
			this.elements[i].className=arr.join(' ');
		}
	}
}

ZQuery.prototype.removeClass=function(className){
	
	for(var i=0; i<this.elements.length; i++){
		if(this.elements[i].className==''){//原本是没有class
			//console.log("无")
		}else{//有class
			var arr=[];
			var count=0;
			var index=0;//记录class所在位置
			arr=this.elements[i].className.split(' ');
			//如果要删除的类存在
			for(var j=0; j<arr.length; j++){
				if(arr[j]==className){
					count++;
					index=j;
				} 
			}
			
			//存在
			if(count != 0  ){
				 arr.splice( className ,1);
				 this.elements[i].className=arr.join(' ');
				 
			} 
			
		}
	}
	return newZQuery(this);
}



ZQuery.prototype.first=function(){
	var arr=[];
	var aBro;
	if(this.selector().charAt(0)=='.'){//通过class选择过来的
		aBro=this.elements[0].parentNode.getElementsByClassName(this.selector().substring(1));
	}else{//通过tagname选择过来的
		aBro=this.elements[0].parentNode.getElementsByTagName(this.elements[0].tagName);
	}
	toArray(arr,aBro);
	return new ZQuery(arr[0]);
}

ZQuery.prototype.each=function(fn){
	var arr=[];
	var aBro;
	if(this.selector().charAt(0)=='.'){//通过class选择过来的
		aBro=this.elements[0].parentNode.getElementsByClassName(this.selector().substring(1));
	}else{//通过tagname选择过来的
		aBro=this.elements[0].parentNode.getElementsByTagName(this.elements[0].tagName);
	}
	toArray(arr,aBro);
	for(var i=0; i<arr.length; i++){
			callBack( arr[i], fn);
	}
	return new ZQuery(arr[0]);
	
}

ZQuery.prototype.last=function(){
	var arr=[];
	var aBro;
	if(this.selector().charAt(0)=='.'){//通过class选择过来的
		aBro=this.elements[0].parentNode.getElementsByClassName(this.selector().substring(1));
	}else{//通过tagname选择过来的
		aBro=this.elements[0].parentNode.getElementsByTagName(this.elements[0].tagName);
	}
	toArray(arr,aBro);
	return new ZQuery(arr[arr.length-1]);
	
}

ZQuery.prototype.position=function(){
	var arr=[];
	if(this.elements[0].offsetParent==document.body || this.elements[0].offsetParent==html){//元素没有定位父级
		arr.push( { top:this.elements[0].offsetTop,left:this.elements[0].offsetLeft } );
	}else{//元素有定位父级
		arr.push( { top:this.elements[0].offsetTop-this.elements[0].offsetParent.offsetTop,left:this.elements[0].offsetLeft-this.elements[0].offsetParent.offsetLeft } );
	}

	return arr[0];
	
}

ZQuery.prototype.offset=function(){
	var arr=[];
	arr.push( { top:this.elements[0].offsetTop+this.elements[0].offsetParent.offsetTop,left:this.elements[0].offsetLeft+this.elements[0].offsetParent.offsetLeft } );
	return arr[0];
}

ZQuery.prototype.hasClass=function(className){
	var arr=[];
	for(var i=0; i<this.elements.length; i++){
		arr=this.elements[i].className.split(" ");
		for(var j=0; j<arr.length; j++){
			if(arr[j]==className){
				return true;
			}
		}
	}
	return false;
}

ZQuery.prototype.is=function(Args){
	switch( typeof Args){
		case "string": //string
			break;
		case "function": //function
			break;
		case "object":
			break;
		default  ://element
			break;
	}
}


function $(rArgs){
	return new ZQuery(rArgs);
}


function getStyle(obj,attr){
	return obj.currentStyle? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr]; 
}


function toArray(arr1,arr2){
	for(var i=0; i<arr2.length; i++){
		arr1[i]=arr2[i];
	}
}

function callBack(obj, fn){
	fn.call(obj);
}


function newZQuery(obj){
	var newZQuery=new ZQuery();
	newZQuery.elements=obj.elements;
	return newZQuery;
}

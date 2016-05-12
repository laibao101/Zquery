
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

ZQuery.prototype.toggle=function(fn1,fn2){
	for(var i=0; i<this.elements.length; i++){
		myEvent(this.elements[i], 'click', function(){
			
		})
	}
}


function $(rArgs){
	return new ZQuery(rArgs);
}
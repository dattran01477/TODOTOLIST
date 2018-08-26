//data use to contains list todo anh list complete
var data=(localStorage.getItem('todoList')!=null)?JSON.parse(localStorage.getItem('todoList')):{
	todo:[],
	completed:[]
}

//button's icon remove and done
var iconRemove= '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><style type="text/css"></style><g><g><path class="nofill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>'
var iconDone='<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"> <rect y="0" class="nofill" width="22" height="22"/> <g> <path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/> </g> </svg>'
document.getElementById('add').onclick=AddToDo;


//render dataToDoList To Form
renderTodoList();
function renderTodoList(){
	if(!data.todo.length&&!data.completed.length) return;

	for(var i=0;i<data.todo.length;i++)
	{
		var value=data.todo[i];
		addItemToDo(value);
	}
	for(var i=0;i<data.completed.length;i++)
	{
		var value=data.completed[i];
		addItemToDo(value,true);
	}

}

//add one work to data
function AddToDo() {
	var value=document.getElementById('text').value;
	if(value)
	{
		data.todo.push(value);
		addItemToDo(value);
		updateObjectItem();
		document.getElementById('text').value="";
	}
	// body...
}

document.getElementById('text').addEventListener('keydown', function(e){
	if(e.code=="Enter")
	{
		AddToDo();
	}
});

//update data to save to json 
function updateObjectItem()
{
	localStorage.setItem('todoList',JSON.stringify(data) );
}

//delete Item selected
function removeItem()
{
	var item=this.parentNode.parentNode;
	var value=item.innerText.trim();
	var parent=item.parentNode;

	parent.removeChild(item);
	//id of todo or completed
	var id=parent.id;

	if(id=='todo')
	{
		data.todo.splice(data.todo.indexOf(value),1);


	}
	else {
		data.completed.splice(data.completed.indexOf(value),1);

	}
	updateObjectItem();
}

//Item Completed will move to id="completed" in HTML
function doneItem()
{
	var item=this.parentNode.parentNode;
	var parent=item.parentNode;
	parent.removeChild(item);

	var value=item.innerText.trim();
	console.log(value);
	//get parent's id
	var id=parent.id;
	if(id=='todo')
	{
		data.todo.splice(data.todo.indexOf(value),1);
		data.completed.push(value);

	}
	else {
		data.completed.splice(data.completed.indexOf(value),1);
		data.todo.push(value);
	}
	updateObjectItem();
	//check id is 'completed' or 'todo' 
	var target=(id=='todo')?document.getElementById('completed'):document.getElementById('todo');
	//insert item to target
	target.insertBefore(item,target.childNodes[0]);
	console.log(data);

}

function addItemToDo(value,completed)
{
	var list=(completed)?document.getElementById('completed'):document.getElementById('todo');
	var item=document.createElement('li');
	item.innerText=value;


	var buttons=document.createElement('div');
	buttons.classList.add('button');

	var remove=document.createElement('button');
	remove.classList.add('remove')
	remove.innerHTML=iconRemove;
	//add even remove Item
	remove.addEventListener("click", removeItem);

	var done=document.createElement('button');
	done.classList.add('done')
	done.innerHTML=iconDone;
	//add even done item when click done button
	done.addEventListener('click',doneItem);


	
	buttons.appendChild(remove);
	buttons.appendChild(done);
	item.appendChild(buttons);
	list.insertBefore(item,list.childNodes[0]);

}
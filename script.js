window.onload = show;

const addleft = document.getElementById('addLeft');

addleft.onkeyup = () => {
	const item = document.getElementById('addLeft').value;
	const button = document.getElementById('addRight');
	if(item != 0){
		button.style.cursor = 'pointer';
		button.style.opacity = '1';
	}
	else{
		button.style.cursor = 'auto';
		button.style.opacity = '0.8';
	}
}

addLeft.onkeydown = () => {
	const item = document.getElementById('addLeft').value;
	const button = document.getElementById('addRight');
	if(item != 0 && event.keyCode == 13){
		button.click();
	}
}

const addRight = document.getElementById('addRight');

addRight.onclick = () => {
	const item = document.getElementById('addLeft').value;
	
	if(item != 0){
		const add_left = document.getElementById('addLeft');
		add_left.value = '';
		
		let Dolist = JSON.parse(localStorage.getItem('toDos'));
		if(Dolist == null)
			Dolist = [];
		Dolist.push(item);
		localStorage.setItem('toDos', JSON.stringify(Dolist));
		
		show();
	}
}

function extend_height(howMany){
	const mainContainer = document.getElementById('container');
	const height = 250;
	const value = 45 * howMany;
	
	mainContainer.style.height = value + height + 'px';
}

function done(index)
{
	let taskList = JSON.parse(localStorage.getItem('toDos'));
	const item = taskList.at(index);
	
	if(item.startsWith('<s')){
		taskList[index] = taskList[index].replace('<s class="text2">', "");
		taskList[index] = taskList[index].replace('</s>', "");
	}
	else{
		taskList.splice(index, 1, '<s class="text2">' + item + '</s>');
	}
	
	localStorage.setItem('toDos', JSON.stringify(taskList));
	
	show();
}

function remove_el(element, index)
{
	const div = element.parentNode;
	div.remove();
	cut_height(1);
	
	let taskList = JSON.parse(localStorage.getItem('toDos'));
	taskList.splice(index, 1);
	localStorage.setItem('toDos', JSON.stringify(taskList));
	
	show();
}

const clear = document.getElementById("clear");

clear.onclick = () => {
	const toRemove = document.querySelectorAll(".item");
	for(const elem of toRemove){
		elem.remove();
	}
	const length = toRemove.length;
	cut_height(length);
	
	let taskList = JSON.parse(localStorage.getItem('toDos'));
	if(taskList != null){
		taskList.splice(0, taskList.length);
		localStorage.setItem('toDos', JSON.stringify(taskList));
	}
	
	show();
}


function cut_height(howMany){
	const mainContainer = document.getElementById("container");
	const height = mainContainer.offsetHeight;
	const divList = document.querySelectorAll(".item");
	const value = 45 * howMany;
	mainContainer.style.height = height - value + 'px';
}

function tasks_left(){
	const left = document.getElementById("textLeft");
	const divs = document.querySelectorAll('.item');
	const texts = document.querySelectorAll('.text');
	const texts2 = document.querySelectorAll('.text2');
	let counter = 0;
	const len = divs.length;
	for(element of texts){
		if(element.style.textDecoration == "line-through")
			counter++;
	}
	for(element2 of texts2){
		counter++;
	}
	const value = len - counter;
	left.innerHTML = `${value} pending tasks`;
}

function show(){
	const button = document.getElementById("clear");
	
	let container = document.getElementById('toDo');
	
	let taskList = JSON.parse(localStorage.getItem('toDos'));
	
	let out = '';
	let len = 0;
	
	if(taskList != null){
		taskList.forEach(function(value, index){
			out += `
					<section>
									<div class = "item">
										<span class="text">` + value + `</span>
										<div class="remove">
											<i class="icon-trash" onclick="remove_el(this.parentNode, ` + index + `)"></i>
										</div>
										<div class="done">
											<i class="icon-ok"  onclick="done(` + index + `)"></i>
										</div>
									</div>
								</section>
				`
		})		
		len += taskList.length;	
	}
	container.innerHTML = out;
	
	if(len > 1)
		button.style.visibility = 'visible';
	else
		button.style.visibility = 'hidden';
	
	extend_height(len);
	
	tasks_left();
}


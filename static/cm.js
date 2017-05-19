var menuData = {
	data:{
	  config:{
			data: [],
	  },
	}
};


axios.get('./menu.json')
	.then(function (response) {
			menuData.data = response.data.data;
			appHeader.header = response.data.data.header;
	})
	.catch(function (error) {
			console.log(error);
	});


Vue.component('menu-list', {
	template: `
	<li class='dropdown'>
		<a class='dropdown-toggle' data-toggle='dropdown' href='#'>
			<span :class='data.icon'></span> {{ data.title }}<span class='caret'></span>
		</a>
		<ul class='dropdown-menu'>
			<menu-string
				v-for="item in data.data"
				:key="item.id"
				:icon="item.icon"
				:link='item.link'>
				{{ item.name }}
			</menu-string>
		</ul>
	</li>
		`,
	props: ['data'],
});


Vue.component('menu-string', {
	template: `<li><a :href='link'><span :class='icon'></span><slot></slot></a></li>`,
	props: ['link', 'icon']
});


Vue.component('app-body', {
	template: `
	<div class="col-sm-12 col-md-9 col-lg-8">
		<h3>Console</h3>
		   <textarea class="form-control" rows="30" readonly="" id="t1" name="t1" cols="50" wrap="off"></textarea>
		   <form class="form-horizontal" role="form" method="post" action="cm">
		      <br>
		      <div><input type="text" id="cmnd" name="cmnd" length="80" placeholder="Enter command" class="form-control" autofocus=""></div>
		   </form>
	</div>
	`
});


var appMenu = new Vue({
	el: "#app-menu",
	data: menuData
});

var appMenuFooter = new Vue({
	el: "#app-menu-footer",
	data: menuData
});

var appHeader = new Vue({
	el: "#app-header",
	data: {
		header: ""
	}
});

var app = new Vue({
	el: "#app",
	data: menuData
});

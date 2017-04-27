var menuData = {
	data:{
	  config:{
			data: [],
	    title: ''
	  },
	  test:{
			data: [],
	    title: ''
	  },
		header:''
	}
};

Vue.component('panel-list', {
	template: `
	<div class='col-sm-5 col-md-4 col-lg-3'>
		<h3>{{ data.title }}</h3>
		<panel-string
			v-for="item in data.data"
			:key='item.id'
			:name='item.name'
			:val='item.val'
			:icon='item.icon'
			:show='item.show'>
		</panel-string>
	</div>
		`,
	props: ['data']
});

Vue.component('panel-string', {
	template: `
		<div class='panel panel-default' v-if='show'>
			<div class='panel-body'>
				<span class='glyphicon'
					v-bind:class='icon'>
				</span> {{ name }}<span class='pull-right'>{{ val }}</span>
			</div>
		</div>
	`,
	props: ['name', 'val', 'icon', 'show']
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
	<div>
		<panel-list v-for="item in data" :data='item' :key="item.id"></panel-list>
	</div>
	`,
	props: ['data']
});


var appMenu = new Vue({
	beforeCreate: function() {
		axios.get('./menu.json')
			.then(function (response) {
					menuData.data = response.data.data;
			})
			.catch(function (error) {
					console.log(error);
			});
	},
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
  data: {
		data:{
		  settings:{
		    data: [],
		    title: ""
		  },
		  sensors:{
		    data: [],
		    title: ""
		  },
		}
  },
});

var timer;

function req(){
	axios.get('./sensors.json')
	  .then(function (response) {
				app.data = response.data.data;
				appHeader.header = response.data.data.header;
				timer = setTimeout(req, response.data.data.updatePage);
	  })
	  .catch(function (error) {
	    	console.log(error);
	  });

}
req();

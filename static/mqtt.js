var menuData = {
	data:{
	  config:{
			data: [],
	  },
	}
};

var optionsData = {
	data:{
	  forms:[]
	}
};


axios.get('./menu.json')
	.then(function (response) {
			menuData.data = response.data.data;
	})
	.catch(function (error) {
			console.log(error);
	});

axios.get('./mqtt.json')
	.then(function (response) {
			app.data = response.data.data;
			appHeader.header = response.data.data.header;
	})
	.catch(function (error) {
			console.log(error);
	});


Vue.component('input-list', {
	template: `
		<div>
			<input-string v-for='data in forms' :key='data.id' :data='data'></input-string>
		</div>
`,
	props: ['forms']
});


Vue.component('input-string', {
	template: `
		<div v-if='data.enabled'>
			<h4 v-if='data.header'>{{ data.header }}</h4>
			<div v-if='data.checkbox'>
				<input-checkbox :data='data'></input-checkbox>
			</div>
			<div v-else class='form-group'>
				<div class='input-group'>
					<span class='input-group-addon'>{{ data.title }}</span>
					<select class='form-control'
						v-if='data.options'
						:name='data.name'
						:id='data.name'
						@change='selectMode'
						v-model="data.selected">
						<option-string
							v-for='item in data.options'
							:key='item.id'
							:val='item.val'
							:selected='item.selected'>
						{{ item.name }}
						</option-string>
					</select>
					<input type="text"
						v-else-if='data.val'
						:name='data.name'
						:id='data.name'
						:value="data.val" class="form-control">
					<input type="text"
						v-else-if='data.password'
						:name='data.name'
						:id='data.name'
						:placeholder="data.password" class="form-control">
					<span v-if='data.unit' class='input-group-addon'>{{ data.unit }}</span>
				</div>
			</div>
		</div>
		`,
	props: ['data']
});


Vue.component('input-checkbox', {
	template: `
		<div class="checkbox" v-if='data.enabled'>
			<label>
				<input type="checkbox"
					:name='data.name'
					:id='data.name'
					@change='checkboxMode'
					v-model="data.checked">
					{{ data.title }}
			</label>
		</div>
		`,
	props: ['data'],
	methods: {
    checkboxMode: function () {
			if (this.data.name === "mqtt_auth") {
				optionsData.data.forms[4].enabled = this.data.checked;
				optionsData.data.forms[5].enabled = this.data.checked;
			}
			if (this.data.name === "mqtt_enable") {
				for (var i = 1; i < optionsData.data.forms.length; i++) {
				  optionsData.data.forms[i].enabled = this.data.checked;
				}
			}
    }
  },
	created: function() {
	  this.checkboxMode();
	}

});

Vue.component('option-string', {
	template: `
		<option :value='val'><slot></slot></option>
	`,
	props: ['val', 'selected']
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
	<div class="col-sm-5 col-md-4 col-lg-3">
			<h3>{{ data.title }}</h3>
			<form action="/save" method="POST">
					<div class="panel panel-default">
							<div class="panel-body">
									<input-list :forms='data.forms'></input-list>
							</div>
							<div class="panel-footer clearfix">
									<div class="pull-right"><button type="submit" class="btn btn-primary" name="save_conf" value="1">Save</button></div>
							</div>
					</div>
			</form>
	</div>
	`,
	props: ['data']
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
  data: optionsData
});

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

var optionsData = {
	data:{
	  forms:[{
			header: '',
			title: '',
			name: '',
			options:[]
		}]
	}
};

axios.get('./menu.json')
	.then(function (response) {
			menuData.data = response.data.data;
	})
	.catch(function (error) {
			console.log(error);
	});

axios.get('./wificonf.json')
	.then(function (response) {
			app.data = response.data.data;
			appHeader.header = response.data.data.header;
	})
	.catch(function (error) {
			console.log(error);
	});


Vue.component('input-list', {
	template: `
		<div v-if='data.enabled'>
			<h4 v-if='data.header'>{{ data.header }}</h4>
			<div class='form-group'>
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
				</div>
			</div>
		</div>
		`,
	props: ['data'],
	methods: {
		selectMode: function () {
			if (this.data.selected === "STA") {
				optionsData.data.forms[2].enabled = false;
				optionsData.data.forms[4].enabled = false;
				optionsData.data.forms[5].enabled = false;
				optionsData.data.forms[6].enabled = false;
				optionsData.data.forms[7].enabled = true;
				optionsData.data.forms[8].enabled = true;
			} else if (this.data.selected === "AP") {
				optionsData.data.forms[2].enabled = true;
				optionsData.data.forms[4].enabled = true;
				optionsData.data.forms[5].enabled = true;
				optionsData.data.forms[6].enabled = true;
				optionsData.data.forms[7].enabled = false;
				optionsData.data.forms[8].enabled = false;
			} else if (this.data.selected === "AP_STA") {
				optionsData.data.forms[2].enabled = true;
				optionsData.data.forms[4].enabled = true;
				optionsData.data.forms[5].enabled = true;
				optionsData.data.forms[6].enabled = true;
				optionsData.data.forms[7].enabled = true;
				optionsData.data.forms[8].enabled = true;
			}

			if (this.data.name === "wifi_auth" &&
					optionsData.data.forms[1].selected != "STA") {
				if (this.data.selected === "OPEN") {
					optionsData.data.forms[6].enabled = false;
				} else {
					optionsData.data.forms[6].enabled = true;
				}
			}
		}
	},
	created: function() {
	  this.selectMode();
	}
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
			if (this.data.name === "static_ip_enable") {
				optionsData.data.forms[9].enabled = this.data.checked;
				optionsData.data.forms[10].enabled = this.data.checked;
				optionsData.data.forms[11].enabled = this.data.checked;
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
  data: optionsData,
	watch: {
	  'checked': 'changeIpMode'
  }
});

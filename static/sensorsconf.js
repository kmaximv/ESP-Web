var menuData = {
	data:{
	  config:{
			data: [],
	  },
	  test:{
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

axios.get('./sensorsconf.json')
	.then(function (response) {
			app.data = response.data.data;
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

	<div class="col-xs-12 col-sm-10 col-md-8 col-lg-7">
			<h3>Periphery</h3>

			<table class="table table-hover table-bordered">
			  <thead>
			    <tr class="text-center">
			      <th class="text-center">Name</th>
			      <th class="text-center">GPIO</th>
			      <th class="text-center">Type</th>
			      <th class="text-center" style="width:13%"></th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr>
			      <td>BME280</td>
			      <td class="text-center">4, 5</td>
			      <td class="text-center"><kbd class="kdb-i2c">I2C</kbd></td>
			      <td class="text-right">
							<a>
									<i class='glyphicon glyphicon-edit'></i>
							</a>
							&nbsp;
							<a>
									<i class='glyphicon glyphicon-remove-circle'></i>
							</a>
							&nbsp;
						</td>
			    </tr>
			    <tr>
			      <td>DHT</td>
			      <td class="text-center">2</td>
			      <td class="text-center"><kbd class="kdb-wire">1Wire</kbd></td>
			      <td class="text-right">
							<a>
									<i class='glyphicon glyphicon-edit'></i>
							</a>
							&nbsp;
							<a>
									<i class='glyphicon glyphicon-remove-circle'></i>
							</a>
							&nbsp;
						</td>
			    </tr>
			    <tr>
			      <td>Motion Sensor</td>
			      <td class="text-center">14</td>
			      <td class="text-center"><kbd class="kdb-input">INPUT</kbd></td>
			      <td class="text-right">
							<a>
									<i class='glyphicon glyphicon-edit'></i>
							</a>
							&nbsp;
							<a>
									<i class='glyphicon glyphicon-remove-circle'></i>
							</a>
							&nbsp;
						</td>
			    </tr>
			  </tbody>
			</table>

			<div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12">
              <div class="form-inline form-group pull-right">
                  <button class="btn btn-danger">
                      <span class="glyphicon glyphicon-floppy-disk"></span> Save
                  </button>
									&nbsp;
                  <button class="btn btn-primary">
                      <span class="glyphicon glyphicon-plus"></span> Add
                  </button>
              </div>
          </div>
      </div>


	</div>
	`,
	props: ['data']
});

//BME280
//SHT21
//DHT
//DS18X20
//BH1750
//Motion Sensor
//Energy Monitor
//MH-Z19

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

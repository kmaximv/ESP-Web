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

var tableData = {
	data:{
	  tableData:[]
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


Vue.component('modal', {
  template: `
		<transition name="modal">
	    <div class="modal-mask">
	      <div class="modal-wrapper">
	        <div class="modal-container">

	          <div class="modal-header">
	            <slot name="header">
	              {{ data.name }}
	            </slot>
	          </div>

	          <div class="modal-body">
	            <slot name="body">
								<div class='form-group'>
									<div class="input-group">
	                  <span class="input-group-addon">Type</span>
	                  <input type="text" :value="data.type" v-model="data.type" class="form-control">
	                </div>
								</div>
								<div class='form-group'>
									<div class="input-group">
	                  <span class="input-group-addon">GPIO</span>
	                  <input type="text" :value="data.gpio" v-model="data.gpio" class="form-control">
	                </div>
	              </div>
	            </slot>
	          </div>

	          <div class="modal-footer">
	            <slot name="footer">
	              <button class="modal-default-button" @click="$emit('close')">
	                OK
	              </button>
	            </slot>
	          </div>
	        </div>
	      </div>
	    </div>
	  </transition>
	`,
	props: ['data'],

});


Vue.component('table-row', {
	template: `
		<tbody>
			<tr v-for="entry in data.tableData">
				<td>{{ entry.name }}</td>
				<td class="text-center">{{ entry.gpio }}</td>
				<td class="text-center"><kbd :class="entry.tag">{{ entry.type }}</kbd></td>
				<td class="text-right">
					<a>
							<i class='glyphicon glyphicon-edit'
								@click="data.showModal = true, data.idModal = entry">
							</i>
					</a>
					&nbsp;
					<a>
							<i class='glyphicon glyphicon-remove-circle'
								@click="data.tableData.splice(data.tableData.indexOf(entry), 1)">
							</i>
					</a>
					&nbsp;
				</td>
			</tr>
		</tbody>
	`,
	props: ['data'],
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
				<table-row :data='data'></table-row>
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

			<modal v-if="data.showModal"
				:data="data.idModal"
				@close="data.showModal = false">
			</modal>

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
  data: tableData
});

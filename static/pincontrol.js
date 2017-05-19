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
	<div class="col-sm-5 col-md-4 col-lg-3">
		   <h3>Control Pins</h3>
		   <table class="table table-hover">
		      <tbody>
		         <tr>
		            <td class="active">
		               <h4>Pins</h4>
		            </td>
		            <td class="active"></td>
		            <td class="active"></td>
		            <td class="active">
		               <h4>Status</h4>
		            </td>
		            <td class="active">
		               <h4>Mode</h4>
		            </td>
		            <td class="active">
		               <h4>Timer</h4>
		            </td>
		         </tr>
		         <tr>
		            <td class="active">
		               <h4>Light1</h4>
		            </td>
		            <td class="active">
		               <div onclick="Pin1();"><input id="OnOff" type="submit" class="btn btn-default" value="Turn Off"></div>
		            </td>
		            <td class="active">
		               <div onclick="Auto1();"><input id="Auto" type="submit" class="btn btn-danger" value="Auto"></div>
		            </td>
		            <td class="info">
		               <h4>ON</h4>
		            </td>
		            <td class="success">
		               <h4>AUTO</h4>
		            </td>
		            <td class="active">
		               <h4>0</h4>
		            </td>
		         </tr>
		         <tr>
		            <td class="active">
		               <h4>Light2</h4>
		            </td>
		            <td class="active">
		               <div onclick="Pin2();"><input id="OnOff2" type="submit" class="btn btn-default" value="Turn Off"></div>
		            </td>
		            <td class="active">
		               <div onclick="Auto2();"><input id="Auto2" type="submit" class="btn btn-danger" value="Auto"></div>
		            </td>
		            <td class="info">
		               <h4>ON</h4>
		            </td>
		            <td class="success">
		               <h4>AUTO</h4>
		            </td>
		            <td class="active">
		               <h4>0</h4>
		            </td>
		         </tr>
		      </tbody>
		   </table>
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

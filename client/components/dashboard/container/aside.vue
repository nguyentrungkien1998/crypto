<template>
	
	<el-menu :unique-opened="true" :router="true" :collapse-transition="true" :default-active="$route.path"  mode="vertical">
		<center>
			<el-image style="width: 150px" class="logo" src="https://4.imimg.com/data4/BV/OA/MY-27587645/facebook-marketing-500x500.png"></el-image>
		</center>
		
		<br>
		<br>

		<el-menu-item :index="'/'">
			<i class="el-icon-chat-dot-round"></i>
			
			<span>Messenger</span>
			
		</el-menu-item>
		<el-menu-item :index="'/group'">
			<i class="el-icon-tickets"></i>
			
			<span>Join Group</span>
			
		</el-menu-item>
		

		<el-menu-item :index="'/invite'">
			<i class="el-icon-circle-plus-outline"></i>
			
			<span>Invite</span>
			
		</el-menu-item>
		<el-menu-item :index="'/danh-sach-nick'">
			<i class="el-icon-user"></i>
			<span>Account</span>
		</el-menu-item>
		
		
		
	</el-menu>

</template>
<script>
	
	export default {
	}
</script>
<style>
.logo{
	margin-top:10px;
	margin-bottom: 10px;

	margin-right: 9px;

	
}


.tag-ec{
	font-size:14px;
}

</style>
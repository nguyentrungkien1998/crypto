<template>
	<el-container>
			<el-header>
				<HeaderSection/>
			</el-header>
			<el-main>
				 <Nuxt/>
			</el-main>
			<el-footer>
				<FooterSection/>
			</el-footer>
		</el-container>
</template>
<script>
	import HeaderSection from '~/components/dashboard/container/header';
	import FooterSection from '~/components/dashboard/container/footer';

	export default {
		data(){
			return {

			}
		},
		components:{HeaderSection,FooterSection},
		methods:{
			
		}
	}
</script>
<style scoped>
	
</style>
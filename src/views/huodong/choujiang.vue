<template>
	<div class="main">
		<div>
			<template v-for="item in user_list">
				<div class="u" :style="'left:'+item.x+'px; top:'+item.y+'px;' " v-show="item.show" @click="item.able=false; item.show=false;">
					<div style="margin: 200px 0;">
						<p>{{item.username}}</p>
						<p>{{item.mobile}}</p>
					</div>
				</div>
			</template>
		</div>

		<div style="z-index: 99999; margin: 0 auto; width: 380px;">
			<img src="@/assets/qr-maimai.png" style="width: 380px; margin: 400px 0;">
			{{user_list}}
		</div>

		<div  style="position: absolute; right: 10px; top: 100px; padding: 10px; opacity: 0.5; border-radius: 10px; background-color: #fff; z-index: 999;">
			<el-button type="danger" @click="cnt=3; stoped=false; stop=false;">抽一等奖</el-button>
			<el-button type="danger" @click="cnt=6; stoped=false; stop=false;">抽二等奖</el-button>
			<el-button type="danger" @click="cnt=10; stoped=false; stop=false;">抽三等奖</el-button>
			<el-button type="danger" icon="el-icon-check" circle @click="stop=true"></el-button>
		</div>
	</div>
</template>



<script>
	function randomsort(a, b) {
	    return Math.random()>.5 ? -1 : 1;
	}

	export default {
		data() {
			return {
				cnt: 3,
				stoped: false,
				stop:false,
				user_list : [
					{username:'王波', icon_url:'', mobile:'13878889770', x:0, y:0, show:true, able:true},
					{username:'李四海', icon_url:'', mobile:'18644521638', x:0, y:0, show:true, able:true},
					{username:'张峰', icon_url:'', mobile:'18977110087', x:0, y:0, show:true, able:true},
					{username:'刘德华', icon_url:'', mobile:'13878889770', x:0, y:0, show:true, able:true},
					{username:'晨晨', icon_url:'', mobile:'18644521638', x:0, y:0, show:true, able:true},
					{username:'王菲', icon_url:'', mobile:'18977110087', x:0, y:0, show:true, able:true},
				],
			};
		},
	    mounted: function(){
	    	setInterval(()=>{
	    		if (this.stop) return;

	    		this.user_list.sort(randomsort);
	    		//return;

	    		var cnt_showing = 0;

	    		for(var item of this.user_list) {
	    			if (!item.able) {
	    				item.show=false;
	    				continue;
	    			}

	    			if (cnt_showing<this.cnt) {
	    				item.show=true;
	    				cnt_showing++;
	    			}
	    			else {
	    				item.show=false;
	    			}

	    			//if (this.stop) continue;
	    			item.x = Math.ceil(Math.random()*6)*300; 
	    			item.y = Math.ceil(Math.random()*4)*200; 
	    		}



	    	}, 200);
	    },
	    methods: {

	    	RM(){
	    		for (var i = 10- 1; i >= 0; i--) {
	    			var lucky = Math.ceil(Math.random()*this.user_list.length);
	    			this.user_list[0] = this.user_list.splice(lucky, 1, arr[0])[0];
	    		}
	    	},

	    }
	}

</script>


<style scoped>
	.main {
		width: 100%;
		height: 100%;
		background-image: url(../../assets/huodong-bk.jpg);
	}
	.u {
		position: absolute; 
		color: #fff;
		text-align: center;
		font-size: 40px;
		line-height: 1.5em;
		width: 300px;
		height: 440px;
		background-image: url(../../assets/huodong-hb.png);
	}
</style>
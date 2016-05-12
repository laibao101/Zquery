module.exports=function(grunt){
	
	//project configuration
	//配置默认文件，写执行内容
	
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		
		uglify: {
		    my_target: {
		      
		      files:[{
					expand:true,
					cwd:'src/js',
					src:['*.js','!*.min.js'],
					dest:'src/js/min',
					ext:'.min.js'
				}]
		    }
		},
		watch:{
			scripts:{
				files:'**/*.js',
				tasks:['jshint'],
				options:{
					livereload:true
				}
			},
			html:{
				files:'**/*.html',
				options:{
					livereload:true
				}

			}
		},
		jshint: {
		    all: ['src/*.js']
		}
		
	});
	
	
	//加载插件、
	
	//加载包含less的插件
	//加载js压缩插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	//执行
	grunt.registerTask('default',['jshint','uglify','watch','livereload'])
	
	
	
	
	
}







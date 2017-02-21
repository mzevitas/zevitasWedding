module.exports = function(grunt){
	grunt.initConfig({

		concat : { //name of task
			options :{
				separator: '\n\n//---------------------------\n\n'
			},
			dist : { //name of job for that task
				src: [
				'assets/js/libs/jquery/dist/jquery.min.js',
				'assets/js/libs/jquery.nicescroll-master/dist/jquery.nicescroll.min.js',
				'assets/js/script/*.js'],
				dest: 'assets/js/script.js'
			}
		},//concat

		bower_concat:{
			all: {
				dest: 'assets/js/_bower.js',
				cssDest: 'assets/css/_bower.css'
			}
		},
		uglify: {
			options: {
  		  		mangle: false,
  		  		sourceMap: true,
				preserveComments:false
  		  	},
  		  	target:{
  		  		files: {
	  		    	'dist/assets/js/script.min.js': ['assets/js/script.js']
	  			}
  		  	}
		},
		cssmin: {
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  target: {
		    files: {
		      'dist/assets/css/style.min.css': ['assets/css/style.css']
		    }
		  }
		},
		copy: {
		  main: {
		    files: [{
		      	expand: true, 
		      	flatten: false, 
		      	cwd: 'assets/images',
    			src: '**',
		      	dest: 'dist/assets/images', 
		      	filter: 'isFile'
		      },
		      {
		      	expand: true, 
		      	flatten: false, 
		      	cwd: 'assets/fonts',
    			src: '**',
		      	dest: 'dist/assets/fonts', 
		      	filter: 'isFile'
		      }]
		  }
		},
		processhtml: {
		    options: {},
		    dist: {
		      files: [
		          {
		          expand: true,     
		          cwd: '',   
		          src: ['*.html'],
		          dest: 'dist/',  
		          ext: '.html'
		        },
		        ]
		    }
  		},
		sass: {
			dist: {
				options: { //look at plugin website for various options
					style: 'expanded'
				},
				files: [{
					src: 'assets/sass/style.scss',
					dest: 'assets/css/style.css'
				}]
			}
		}, //sass

		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 3000,
					base: '',
					livereload: true
				}
			}
		},

		watch: {
			options: {
				spawn: false,
				livereload: true
			},
			scripts: {
				files: ['**/*.html', 
				'assets/js/**/*.js',
				'assets/sass/**/*.scss'],
				tasks: ['concat','sass']
			}
		}

	}); //init config section
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-concat'); //concatenates files
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.registerTask('default', ['concat', 'sass', 'connect', 'watch']);
	grunt.registerTask('dist', ['concat', 'sass', 'copy', 'uglify', 'cssmin', 'processhtml']);


}; //wrapper function
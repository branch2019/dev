module.exports = function(grunt) {
  // Do grunt-related things in here
  // Project configuration
  grunt.initConfig({
    pag: grunt.file.readJSON('package.json'),
    // 监听
    watch: {
      js: {
        files: ['src/**/*.js'],
        tasks: ['default']
      },
      babel: {
        files:'src/**/*.js',
        tasks:['babel']
      }
    },
    // 转化
    babel: {
      options: {
        presets: ['@babel/preset-env']
      },
      build: {
        files: [{
          expand: true,
          cwd: 'src/', //src目录下
          src: ['**/*.js'], //所有js文件
          dest: 'babel/'  //输出到babel目录下
        }]
      }
    },
    // 复制
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: 'babel/', //babel目录下
          src: ['**/*.js'], //所有js文件
          dest:'dist/'  //输出到dist目录下
       }] 
      }
    },
    // 压缩
    uglify: {
      options: {
        // mangle: true, //混淆变量名
        comments: 'false' //false（删除全部注释），some（保留@preserve @license @cc_on等注释）
      },
      build: {
        files: [{
          expand: true,
          cwd: 'babel/', //babel目录下
          src: ['**/*.js'], //所有js文件
          dest:'release/'  //输出到release目录下
       }] 
      }
    },
    // 清除
    clean: {
      build: {
        src: ['dist/*.js', 'babel/*.js', 'release/*.js']
      },
    }
  });
  // 加载 "clean" 任务的插件
  grunt.loadNpmTasks('grunt-contrib-clean');
  // 加载 "copy" 任务的插件
  grunt.loadNpmTasks('grunt-contrib-copy');
  // 加载 "babel" 任务的插件
  grunt.loadNpmTasks('grunt-babel');
  // 加载 "uglify" 任务的插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // 加载 "watch" 任务的插件
  grunt.loadNpmTasks('grunt-contrib-watch');
  // 默认被执行的任务列表。
  grunt.registerTask('default', ['babel', 'uglify']);
  grunt.registerTask('watcher',['watch']);
  // 自定义任务
  grunt.registerTask('hello', function(name) {
    console.log('2019-hello dev ' + name);
    var taskList = [];
    taskList.push(name)
    grunt.task.run(taskList);
  });
};
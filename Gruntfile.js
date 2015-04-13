/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/
/*  Use 500 px and 750 px for breakpoints on this project */

module.exports = function(grunt) {
  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
              name: 'large',
              width: '1600',
              suffix: '_1600_2x',
              quality: 30
            },{
              name: 'large',
              width: '800',
              suffix: '_800_1x',
              quality: 30
            },{
              name: 'small',
              width: '800',
              suffix: '_300x200_1x',
              quality: 100,
            },{
              name: 'medium',
              width: '800',
              suffix: '_600x400_1x',
              quality: 60,
            }],
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          flatten: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'images/'
        }]
      },
    },

    shell: {
        options: {
            stderr: false
        },
        target: {
            command: [
              /* crop images for smaller webports */
              /* template lines:
              'find images/*600x400_1x.jpg | xargs -n1 sh -c \'convert $0 -crop 600x400+200+200 $0\'',
              'find images/*300x200_1x.jpg | xargs -n1 sh -c \'convert $0 -crop 300x200+250+150 $0\''
              */
              // medium images crops

              // small images crops.
              
            ].join('&&')
        }
    },


    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          flatten: true,
          src: 'images_src/fixed/*.{gif,jpg,png}',
          dest: 'images/fixed'
        },{
          expand: true,
          flatten: true,
          src: 'images_src/svg/*.{gif,jpg,png}',
          dest: 'images'
        }
        ]
      },
      htdocs: {
        files: [
        {expand: true, src: './*.*', dest: '/applications/xampp/htdocs/temp/'},
        {expand: true, src: ['./images/**'], dest: '/applications/xampp/htdocs/temp',},
        {expand: true, src: ['./css/**'], dest: '/applications/xampp/htdocs/temp',}, 
        {expand: true, src: ['./js/**'], dest: '/applications/xampp/htdocs/temp',},
        ]
      },
    },
  });
  

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-imagemagick');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['clean', 'mkdir', 'responsive_images', 'shell']);

};

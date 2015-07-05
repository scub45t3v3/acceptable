module.exports = (grunt) ->
  grunt.initConfig
    clean:
      js: ['**/*.js', '!node_modules/**']
    coffee:
      compile:
        files: [
          expand: true
          cwd: 'src/'
          src: ['**/*.coffee', '!node_modules/**']
          dest: '.'
          ext: '.js'
        ]
    coffeelint:
      app: ['**/*.coffee', '!node_modules/**']
      options:
        'coffeescript_error':
          'level': 'error'
        'arrow_spacing':
          'name': 'arrow_spacing'
          'level': 'warn'
        'braces_spacing':
          'name': 'braces_spacing'
          'level': 'error'
          'spaces': 0
          'empty_object_spaces': 0
        'no_tabs':
          'name': 'no_tabs'
          'level': 'error'
        'no_trailing_whitespace':
          'name': 'no_trailing_whitespace'
          'level': 'error'
          'allowed_in_comments': false
          'allowed_in_empty_lines': false
        'max_line_length':
          'name': 'max_line_length'
          'value': 80
          'level': 'warn'
          'limitComments': true
        'line_endings':
          'name': 'line_endings'
          'level': 'error'
          'value': 'unix'
        'no_trailing_semicolons':
          'name': 'no_trailing_semicolons'
          'level': 'error'
        'indentation':
          'name': 'indentation'
          'value': 2
          'level': 'error'
        'camel_case_classes':
          'name': 'camel_case_classes'
          'level': 'error'
        'colon_assignment_spacing':
          'name': 'colon_assignment_spacing'
          'level': 'error'
          'spacing':
            'left': 0
            'right': 1
        'no_plusplus':
          'name': 'no_plusplus'
          'level': 'ignore'
        'no_throwing_strings':
          'name': 'no_throwing_strings'
          'level': 'error'
        'no_backticks':
          'name': 'no_backticks'
          'level': 'error'
        'no_implicit_parens':
          'name': 'no_implicit_parens'
          'level': 'ignore'
        'no_empty_param_list':
          'name': 'no_empty_param_list'
          'level': 'error'
        'no_stand_alone_at':
          'name': 'no_stand_alone_at'
          'level': 'error'
        'space_operators':
          'name': 'space_operators'
          'level': 'error'
        'duplicate_key':
          'name': 'duplicate_key'
          'level': 'error'
        'empty_constructor_needs_parens':
          'name': 'empty_constructor_needs_parens'
          'level': 'ignore'
        'cyclomatic_complexity':
          'name': 'cyclomatic_complexity'
          'value': 10
          'level': 'warn'
        'newlines_after_classes':
          'name': 'newlines_after_classes'
          'value': 3
          'level': 'error'
        'no_unnecessary_fat_arrows':
          'name': 'no_unnecessary_fat_arrows'
          'level': 'warn'
        'missing_fat_arrows':
          'name': 'missing_fat_arrows'
          'level': 'ignore'
        'non_empty_constructor_needs_parens':
          'name': 'non_empty_constructor_needs_parens'
          'level': 'ignore'
        'no_interpolation_in_single_quotes':
          'name': 'no_interpolation_in_single_quotes'
          'level': 'error'

  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.registerTask 'default', ['coffeelint', 'clean', 'coffee']


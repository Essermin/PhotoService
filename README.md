# PhotoService
This is a PhotoService which works with VK API and get the photos according to your request.
You'll need the NodeJS version 6.0 or higher to init project.

### Code Example
    var photoService = new PhotoSearchService(); //Init new instance of service


### Installation
1. npm install - install packages from packajes.json list
2. bower install - install vendor components from bower.json list
3. gulp build - to get project build once
4. gulp serve - to add watcher for src files.

### Todo-list
1. add loader and button change states
2. sometimes Api response is null on the same request, bug or shit.
3. drag&drop mechanic, previous fiddle testing - http://jsfiddle.net/x2yyf72e/
4. remove from favorite option
5. add more adaptive for html layout, especially for mobile version
6. add image pop-up on click, for more usability. Like colorbox or smthg
7. need some adaptation for images from API, some of them look really scruffy
8. move constructor variables into options object
9. add sprite here and more effects on adding into favorite list process

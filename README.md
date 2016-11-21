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

### Fixes left
CSS
1. - именования не по БЭМ (а что-то на него похожее) --- тут нужно немного больше информации. Пример код-стайла, потому что редко у кого БЭМ один и тот же(
													  Наименование классов брал, как обычно учим студентов. У академии свой немного взгляд.

NJC
2. - парные пустые теги, кроме span - зло. Такая верстка не семантична --- Вот тут, честно говоря, я не понял откуда взялась такая теория. В jsx шаблонах и реакте да,
																	    такое не семантично. В html шаблонах - семантика по спецификации не нарушена.
																	    Поправить это не тяжело, вынеся списки в шаблон ниже и поменяв цикл с JS файла на цикл в underscore.
																	    Оставил на самое последнее время для фикса, пока не реализовано.
3. - инпуты, баттоны вне формы выглядят очень странно --- здесь не совсем соглашусь, такое использование возможно. Оставил фикс на самый конец.
4. - пустые ссылки --- Возможно, то же, что и парные теги. Чем пустые ссылки угрожают не знаю, они всего лишь обозначают активный элемент блока.

JS
5. - поиск элементов по всему документу.
Нужно было делать внутри рутового элемента для компонента.
Текущий код несколько инстансов создать на странице не даст - не будут работать корректно --- Самый трудоемкий фикс как и изменение БЭМ-классов, не хватает времени переделать
6. - именования не всегда соответствуют истине --- оставил на последок.
7. - js лучше всего вешать на классы с префиксом js.
Тогда логика будет отделена от представления --- старался так и реализовать. Не нашел, в каком месте нарушил это правило.
 												Примисываемые классы без префикса js- как раз и отвечают за визуализацию только

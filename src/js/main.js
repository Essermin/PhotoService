function PhotoSearchService () {
    // @todo move these variables into options object
    this.$searchField = $('.gallery__search-field');
    this.$searchBlock = $('.gallery__form-search');
    this.$resultContainer = $('.gallery__result');
    this.$favoriteContainer = $('.gallery__favorite-list');
    this.apiMethod = 'photos.search';
    this.resultItemsCount = 6;
    this.apiVersion = '5.60';
}

PhotoSearchService.prototype.formSearchRequest = function () {
    this.searchString = this.$searchField.val() || false;

    if (this.searchString) {
        this.searchUrl = 'https://api.vk.com/method/' + this.apiMethod + '?q=' + this.searchString + '&count=' + this.resultItemsCount + '&v=' + this.apiVersion + '';
        this.removeSearchError();

        return this.searchUrl;
    } else {
        this.showSearchError();
    }
};


PhotoSearchService.prototype.showSearchError = function () {
    this.$searchBlock.addClass('gallery__form-search--error');
};

PhotoSearchService.prototype.removeSearchError = function () {
    this.$searchBlock.removeClass('gallery__form-search--error');
};


PhotoSearchService.prototype.getSearchResult = function (url) {
    var self = this;

    $.ajax({
        url: url,
        crossDomain: true,
        type: 'GET',
        dataType: 'jsonp'
    }).done(function (result) {
        self.renderSearchResult(result.response);
    });
    // @todo add loader and button change states
    // @todo sometimes Api response is null on the same request, bug or shit.
};

PhotoSearchService.prototype.renderSearchResult = function (response) {
    var self = this;

    this.responseItems = response.items;

    console.log(this.responseItems);

    this.$responseHtmlContainer = $('.js-gallery-result-list');
    this.$responseHtmlItem = $('#js-gallery-result-item').html();
    this.responseHtmlItemValue = '';

    this.$responseHtmlContainer.empty();

    $.each(this.responseItems, function (key, value) {
        self.responseHtmlItemValue = value['photo_604'];
        self.$responseHtmlContainer.append(_.template(self.$responseHtmlItem)({imageLink: self.responseHtmlItemValue}));
    })
};

PhotoSearchService.prototype.initSearchResult = function () {
    this.requestUrl = this.formSearchRequest();

    if (!this.requestUrl)  {
        return false;
    }

    this.getSearchResult(this.requestUrl);
};

PhotoSearchService.prototype.checkFavoriteBlockStatement = function (element) {
    return this.$favoriteContainer.children().length > 0;
};

PhotoSearchService.prototype.addItemToFavorite = function (element) {
    $(element).addClass('gallery__list-item-favorite--active');
    this.$favoriteItemParent = $(element).closest('.gallery__result-list-item');

    if (this.$favoriteItemParent.hasClass('js-added-to-favorite')) {
        return false;
    }

    if (!this.checkFavoriteBlockStatement()) {
        this.$resultContainer.removeClass('gallery__result-favorite');
    }

    this.$favoriteItemParent.addClass('js-added-to-favorite');
    this.$resultContainer.addClass('gallery__result-favorite');

    this.$favoriteItemParent.clone().appendTo(this.$favoriteContainer).find('.js-add-to-favorite').remove();;
};

//@todo drag&drop mechanic, previous fiddle testing - http://jsfiddle.net/x2yyf72e/
//@todo remove from favorite option
//@todo add more adaptive for html layout, especially for mobile version
//@todo add image pop-up on click, for more usability. Like colorbox or smthg
//@todo need some adaptation for images from API, some of them look really scruffy

$(document).ready(function () {
    var photoService = new PhotoSearchService();

    $('.js-get-something').on('click', function () {
        photoService.initSearchResult();
    });

    $(document).on('click', '.js-add-to-favorite', function () {
        photoService.addItemToFavorite(this);
    });
});


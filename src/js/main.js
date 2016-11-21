function PhotoSearchService (button) {
    this.$searchField = $('.gallery__search-field');
    this.$searchBlock = $('.gallery__form-search');
    this.$resultContainer = $('.gallery__result');
    this.$favoriteContainer = $('.gallery__favorite-list');
	this.favoriteButtonClass= '.js-add-to-favorite';
	this.searchButtonClass= button ? button : '.js-get-something';
    this.apiMethod = 'photos.search';
    this.resultItemsCount = 6;
    this.apiVersion = '5.60';
}

PhotoSearchService.prototype.formSearchRequest = function () {
    this.searchString = this.$searchField.val();

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
};

PhotoSearchService.prototype.renderSearchResult = function (response) {
    var self = this;

    this.responseItems = response.items;

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

    this.$favoriteItemParent.clone().appendTo(this.$favoriteContainer).find('.js-add-to-favorite').remove();
};

PhotoSearchService.prototype.bindServiceEvents = function (element) {
	var self = this;

	$(document)
		.on('click', this.favoriteButtonClass, function () {
			self.addItemToFavorite(this);
		})
		.on('click', this.searchButtonClass, function () {
			self.initSearchResult();
		})
};


$(document).ready(function () {
    var photoService = new PhotoSearchService('.js-get-something');

	photoService.bindServiceEvents();
});


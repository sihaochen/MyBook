function jumpTo(list) {
	var selectedValue = list.options[list.selectedIndex].value;
	list.selectedIndex = -1;
	if (selectedValue == "BOOK_MARK") {
		addOrRemoveBookMarkForPage();
	} else {
		location.href = selectedValue;
	}

}

function setToPage(pageId, pageNumber) {
	// TODO: variable check

	TempCache.setItem("page_number", pageNumber);
	location.href = pageId;
}

$(function() {
	$("#btn_jumpToPage").bind("click", goToPage);
});

function recorder(args) {
	var currentPageNumber;
	currentPageNumber = args.currentSlideNumber;
	TempCache.setItem("page_number", args.currentSlideNumber);
	localStorage.setItem("book_mark_page_number", args.currentSlideNumber);

	var pageId = localStorage.getItem("book_mark_page_id");
	// alert("page id "+pageId);
	localStorage.setItem(pageId + "page_number", args.currentSlideNumber);
}

function jumpToPage(pageId, pageNumber) {
	var pageId = pageId;
	var cachePageNumber = "";
	
	var changePageEventType = localStorage.getItem("changePageEvenType");
	// alert("changePageEventType "+changePageEventType);
	if (changePageEventType == "FrontPage") {
	var tempPageNumber = localStorage.getItem(pageId + "page_number");

	if (tempPageNumber != null) {
		// alert("Page number "+tempPageNumber);
		localStorage.setItem("page_number", tempPageNumber.replace(/(^\s*)|(\s*$)/g, ""));
		localStorage.removeItem(pageId + "page_number");
	}
	localStorage.removeItem("changePageEvenType");
	}

	cachePageNumber = TempCache.getItem("page_number");
	if (cachePageNumber != null && cachePageNumber != "") {
		cachePageNumber = cachePageNumber.replace(/(^\s*)|(\s*$)/g, "");
		TempCache.removeItem("page_number");

	} else {
		cachePageNumber = pageNumber;
	}
	if (cachePageNumber != "-1") {
		location.href = pageId;
		// alert("Jumping to page " + cachePageNumber+" ID "+ pageId);
		$('#full-width-slider').iosSlider('goToSlide', cachePageNumber);
	}
}

function goToPage(e) {
	// var pageId = $(this).attr("page-id");
	var pageId = localStorage.getItem("book_mark_page_id");
	var pageNumber = $("#pageNumberInsert").val();
	// TODO: boundary check
	if (pageNumber == "") {
		alert("必须输入页面号码!" + pageNumber);
		$("#pageNumberInsert").focus();
		return false;
		e.preventDefault();
	} else {
		setToPage(pageId, pageNumber);
		e.preventDefault();
	}
};

function initLocalStorage() {
	if (window.localStorage) {
	} else {
		alert("LocalStorage are not supported in this browser.");
	}
	if (!window.openDatabase) {
		alert('Databases are not supported by your browser');
	}
	localStorage.setItem("changePageEvenType", "FrontPage");
}
function initLocalFavoritesSetup()
{
	localStorage.setItem("changePageEvenType", "Favories");
	//alert("Set change page event type to be Favories");
}

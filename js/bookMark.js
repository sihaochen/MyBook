$(document)
		.bind(
				"mobileinit",
				function() {

					$.mobile.notesdb = openDatabase("bookMark", "1.0",
							"Book Mark Storage", 3 * 1024 * 1024);

					$.mobile.notesdb
							.transaction(function(t) {
								// alert("before execute bookMark");
								t
										.executeSql("CREATE TABLE IF NOT EXISTS BookMark (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, bookName TEXT NOT NULL,pageId TEXT NOT NULL, pageNumber TEXT NOT NULL ,created TEXT NOT NULL, updated TEXT);");
								// alert("after execute bookMark");

								// alert("isLoadData "+isLoadData);
								if (isLoadData == null) { // 第一次載入預設的資料
									localStorage.setItem("loaddata", true); // 第二次以後不載入預設的料
									// alert("start loading");
									// 以 js/BOOK_MARKData.js 建立資料庫
									$
											.each(
													bookMarkData,
													function(InfoIndex, Info) {
														var book_name = Info["book_name"];
														var page_id = Info["page_id"];
														var page_number = Info["page_number"];
														// alert("getting loaded
														// " +book_name
														// +page_id+page_number);
														t
																.executeSql(
																		'INSERT into BookMark(bookName, pageId, pageNumber, created) VALUES (?,?,?,date("now"));',
																		[
																				book_name,
																				page_id,
																				page_number ]);
													})
								}
							});
				});

function refresh() {
	$.mobile.notesdb.transaction(function(t) {
		t.executeSql('DROP TABLE BookMark');
	}); // end of $.mobile.notesdb
	localStorage.removeItem("loaddata");
	location.reload()
}

function addOrRemoveBookMarkForPage() {
	var book_name = localStorage.getItem("book_mark_book_name");
	var page_id = localStorage.getItem("book_mark_page_id");
	var page_number = localStorage.getItem("book_mark_page_number");

	$.mobile.notesdb
			.transaction(function(t) {
				// alert("Get book mark2!!");

				t
						.executeSql(
								"SELECT id, bookName, pageId, pageNumber FROM BookMark where bookName=? and pageId=? and pageNumber=?",
								[ book_name, page_id, page_number ],
								function(t, result) {
									// alert("Get book mark3!!");
									var i, len = result.rows.length, row;
									if (len > 0) {

										var flagConfirm = confirm("此页已收藏，移除？");
										if (flagConfirm) {
											$.mobile.notesdb
													.transaction(function(t) {
														// alert ("Book mark
														// page now "
														// +book_name+page_id+page_number);
														t
																.executeSql(
																		'DELETE from BookMark where bookName=? and pageId=? and pageNumber=?;',
																		[
																				book_name,
																				page_id,
																				page_number ],
																		function() {
																		}, null);
													});
										}
									} else {
										var flagConfirm = confirm("确定收藏此页？");
										if (flagConfirm) {
											$.mobile.notesdb
													.transaction(function(t) {
														// alert ("Book mark
														// page now "
														// +book_name+page_id+page_number);
														t
																.executeSql(
																		'INSERT into BookMark(bookName, pageId, pageNumber, created) VALUES (?,?,?,date("now"));',
																		[
																				book_name,
																				page_id,
																				page_number ],
																		function() {
																			// TODO:
																			// more
																			// follow
																			// up
																			// actions

																			bookMarkData
																					.push({
																						"book_name" : book_name,
																						"page_id" : page_id,
																						"page_number" : page_number
																					});

																		}, null);
													});
										}
									}
								}) // end of t.executeSql
				// alert("Finish Get book mark1!!");
			}); // end of $.mobile.notesdb

}

function isBookMarkAlready() {
	var book_name = localStorage.getItem("book_mark_book_name");
	var page_id = localStorage.getItem("book_mark_page_id");
	var page_number = localStorage.getItem("book_mark_page_number");
	$.mobile.notesdb
			.transaction(function(t) {
				// alert("Get book mark2!!");
				t
						.executeSql(
								"SELECT id, bookName, pageId, pageNumber FROM BookMark where bookName=? and pageId=? and pageNumber=?",
								[ book_name, page_id, page_number ], function(
										t, result) {
									// alert("Get book mark3!!");
									var i, len = result.rows.length, row;
									if (len > 0) {
										alert("Is Book Mark ");
										localStorage.setItem("is_book_mark",
												true);
									} else {
										alert("Is NOT　Book Mark ");
										localStorage.setItem("is_book_mark",
												false);
									}
								}) // end of t.executeSql
				// alert("Finish Get book mark1!!");
			}); // end of $.mobile.notesdb

}

function deletePageBookMark() {

	var book_name = localStorage.getItem("book_mark_book_name");
	var page_id = localStorage.getItem("book_mark_page_id");
	var page_number = localStorage.getItem("book_mark_page_number");
	$.mobile.notesdb
			.transaction(function(t) {
				// alert ("Book mark page now " +book_name+page_id+page_number);
				t
						.executeSql(
								'DELETE from BookMark where bookName=? and pageId=? and pageNumber=?;',
								[ book_name, page_id, page_number ],
								function() {
								}, null);
			});

}

$(function() {
	$('#faviours').bind("pageshow", getBookMark);
});

var isLoadData;
isLoadData = localStorage.getItem("loaddata");

function getBookMark() {
	$(document)
			.ready(
					function(e) {
						// alert("Get book mark! " );
						var listTitle = $('#recent');
						var items = [];

						// alert("Get book mark1!!");

						$.mobile.notesdb
								.transaction(function(t) {
									// alert("Get book mark2!!");

									t
											.executeSql(
													"SELECT id, bookName, pageId, pageNumber FROM BookMark ORDER BY id DESC LIMIT ?",
													[ -1 ],
													function(t, result) {
														// alert("Get book
														// mark3!!");
														var i, len = result.rows.length, row;
														if (len > 0) {
															for (i = 0; i < len; i += 1) {
																row = result.rows
																		.item(i);
																items
																		.push("<li><a href=\"javascript:setToPage(\'"
																				+ row.pageId
																				+ "\',"
																				+ row.pageNumber
																				+ ");\" data-trnote='"
																				+ row.id
																				+ "'>"
																				+ row.bookName
																				+ " Page: "
																				+ row.pageNumber
																				+ "</a></li>");

															}
															listTitle
																	.html(items
																			.join('\n'));
															listTitle
																	.listview("refresh");

														}
													}) // end of t.executeSql
									// alert("Finish Get book mark1!!");
								}); // end of $.mobile.notesdb
						// alert("Finish Get book mark2!!");
					});
}
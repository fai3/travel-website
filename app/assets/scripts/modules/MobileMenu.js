import $ from "jquery";
class MobileMenu {
  constructor() {
    this.pageTitle = $("title").text;
    this.events();
  }
  //  Events
  events() {
    $(window).on("load", this.changeTitle.bind(this));
  }
  // Functionality

  changeTitle() {
    // Change page title on blur
    $(window).on("blur", function() {
      $("title").text("Don't forget to read this...");
    });

    // Change page title back on focus
    $(window).on("focus", function() {
      $("title").text("Travel North Paistan");
    });
  }
}

export default MobileMenu;

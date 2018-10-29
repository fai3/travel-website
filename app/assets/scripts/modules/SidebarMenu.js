class SidebarMenu {
  constructor() {
    this.menuIcon = $(".site-header__menu-icon");
    this.sidebar = $(".sidebar");
    this.sidebarX = $(".sidebar__x");
    this.events();
  }
  events() {
    this.menuIcon.click(this.openSidebar.bind(this));
    this.sidebarX.on("click", this.closeSidebar.bind(this));
    $(document).on("keydown", this.closeSidebar.bind(this));
  }

  openSidebar() {
    this.sidebar.addClass("sidebar--open");
  }
  closeSidebar() {
    this.sidebar.removeClass("sidebar--open");
  }
}
export default SidebarMenu;

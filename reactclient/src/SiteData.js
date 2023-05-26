// import MenuList from "../components/MenuList";
export const SiteData = {
  title: "MySite",
  auth: [
    { text: "Register", link: "/register", icon: "" },
    {
      text: "Login",
      link: "/login",
      icon: "",
      class: "btn btn-sm btn-outline-primary",
    },
    {
      text: "LogOut",
      link: "/logout",
      icon: "",
      class: "btn btn-info btn-sm text-white",
      action: "deleteKey",
    },
  ],
  menu: [
    {
      text: "About",
      link: "/about",
      icon: "bi-list",
      submenu: [
        { text: "Our Team", link: "/about/team", icon: "bi-list" },
        { text: "Our Vision", link: "/about/vision", icon: "bi-list" },
      ],
    },
    { text: "Services", link: "/services", icon: "" },
    { text: "Pricing", link: "/pricing", icon: "" },
    { text: "Contact", link: "/support/contact", icon: "" },
  ],
  tabMenu: [
    { text: "Services", link: "/services", icon: "" },
    { text: "Pricing", link: "/pricing", icon: "" },
  ],
  footerLinks: [
    {
      text: "Support",
      link: "/support",
      icon: "bi-list",
      submenu: [
        { text: "Contact", link: "support/contact", icon: "bi-list" },
        { text: "FAQ", link: "support/faq", icon: "" },
      ],
    },
    {
      text: "Offering",
      link: "/offering",
      icon: "",
      submenu: [
        { text: "Our Team", link: "/about/team", icon: "bi-list" },
        { text: "Our Vision", link: "/about/vision", icon: "" },
      ],
    },
  ],
  SocialMedia: [
    { text: "Facebook", link: "/pricing", icon: "bi-facebook" },
    { text: "Twitter", link: "/pricing", icon: "bi-twitter" },
    { text: "Instagram", link: "/pricing", icon: "bi-instagram" },
    { text: "Youtube", link: "/pricing", icon: "bi-youtube" },
  ],
};

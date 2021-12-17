const en = {
  // Global
  global: {
    filters: {
      actions: {
        all: "All",
        none: "None",
        clear: "Clear",
        less: "Less",
        more: "More",
        apply: "Apply",
      },
      operators: {
        between: "Between",
        lessthan: "Less than",
        lessthanorequal: "Less than or equal",
        greaterthan: "Greater than",
        greaterthanorequal: "Greater than or equal",
      },
      range: {
        is: "Is",
      },
      messages: {
        empty: "No values found",
      },
      checkbox: {
        placeholder: "Search...",
      },
    },
  },
  // COMPONENTS
  components: {
    filterList: {
      collapseAll: "Collapse all",
      expandAll: "Expand all",
    },
    table: {
      itemCount: {
        singlePage:
          "{count, plural, =0 {No result} other {<strong>#</strong> results}}",
        multiplePages:
          "Results <strong>{from}</strong> - <strong>{to}</strong> of <strong>{total}</strong>",
      },
    },
  },
  // LAYOUT
  layout: {
    main: {
      menu: {
        dashboard: "Dashboard",
        studies: "Studies",
        explore: "Data Exploration",
        participants: "Participants",
        biospecimen: "Biospecimen",
        datafiles: "Data Files",
        website: "Website",
      },
    },
    user: {
      menu: {
        myprofile: "My Profile",
        settings: "Settings",
        logout: "Logout",
      },
    },
  },
  // SCREENS
  screen: {
    dashboard: {
      hello: "Hello",
      card: {
        datarelease: {
          title: "Data release {version}",
        },
      },
    },
    dataExploration: {
      sidemenu: {
        participant: "Participant",
        biospecimen: "Biospecimen",
        datafiles: "Data Files",
      },
      tabs: {
        summary: "Summary",
        participants: "Participants ({count})",
        biospecimens: "Biospecimens ({count})",
        datafiles: "Data Files ({count})",
      },
    },
  },
};

export default en;

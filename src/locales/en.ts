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
    querybuilder: {
      query: {
        combine: {
          and: "And",
          or: "Or",
        },
        noQuery: "Use the filters to build a query",
      },
      actions: {
        new: "New",
        changeOperatorTo: "Change operator to",
        addQuery: "New query",
        combine: "Combine",
        labels: "Labels",
        delete: {
          title: "Delete this query?",
          titleSelected: "Delete this query?",
          cancel: "Cancel",
          confirm: "Delete",
        },
        clear: {
          title: "Delete all queries?",
          cancel: "Cancel",
          confirm: "Delete",
          buttonTitle: "Clear all",
          description:
            "You are about to delete all your queries. They will be lost forever.",
        },
      },
    },
    dataRelease: {
      studies: "Studies",
      participants: "Participants",
      biospecimens: "Biospecimens",
      datafiles: "Data Files",
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
    home: {
      title: "INCLUDE Data Hub",
      datarelease: {
        title: "Available Data",
      },
      uncover: "Uncover",
      newInsights: "new insigths",
      biologyConditions:
        "into the biology of Down Syndrome and co-occurring conditions.",
      accessLargeScale:
        "Access large-scale data resources and explore custom built cohort datasets based on participant, biospecimen, clinical and genomic data.",
      login: "Login",
      signup: "Sign up",
    },
    dashboard: {
      hello: "Hello",
      card: {
        datarelease: {
          title: "Data release {version}",
        },
      },
      links: {
        studies: "Studies",
        participants: "Participants",
        biospecimens: "Biospecimens",
        datafiles: "Data Files",
        variantSearch: "Variant Search",
      },
      cards: {
        authorizedStudies: {
          title: "Authorized Studies",
          headerBtn: "Data access",
          connectedNotice:
            "Your account is connected. You have access to all released INLCUDE controlled data.",
          disconnectedNotice:
            "Access all released INCLUDE controlled data by connecting your account using your NIH credentials.",
          connect: "Connect",
          disconnect: "Disconnect",
          noAvailableStudies: "No available studies",
          authorization: "Authorization",
          of: "of",
          files: "Files",
          dataGroups: "Data use groups: {groups}",
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

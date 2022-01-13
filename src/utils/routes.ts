export enum STATIC_ROUTES {
  HOME = "/",
  DASHBOARD = "/dashboard",
  STUDIES = "/studies",
  MY_PROFILE = "/profile",
  SETTINGS = "/settings",

  JOIN = "/join",
  JOIN_TERMS = "/join/terms",
  JOIN_REGISTRATION = "/join/registration",

  DATA_EXPLORATION = "/data-exploration",
  DATA_EXPLORATION_SUMMARY = "/data-exploration/summary",
  DATA_EXPLORATION_PARTICIPANTS = "/data-exploration/participants",
  DATA_EXPLORATION_BIOSPECIMENS = "/data-exploration/biospecimens",
  DATA_EXPLORATION_DATAFILES = "/data-exploration/datafiles",
}

export enum DYNAMIC_ROUTES {
  DATA_EXPLORATION = "/data-exploration/:tab?",
  ERROR = "/error/:status?",
}

export enum STATIC_ROUTES {
  JOIN = "/join",
  TERMS = "/terms",
  HOME = "/",
  NOT_FOUND = "/404",
  DASHBOARD = "/dashboard",
  STUDIES = "/studies",
  PARTICIPANTS = "/participants",
  BIOSPECIMEN = "/biospecimen",
  DATA_FILES = "/data-files",
  MY_PROFILE = "/profile",
  SETTINGS = "/settings",

  DATA_EXPLORATION = "/data-exploration",
  DATA_EXPLORATION_SUMMARY = "/data-exploration/summary",
  DATA_EXPLORATION_PARTICIPANTS = "/data-exploration/participants",
  DATA_EXPLORATION_BIOSPECIMENS = "/data-exploration/biospecimens",
  DATA_EXPLORATION_DATAFILES = "/data-exploration/datafiles",
}

export enum DYNAMIC_ROUTES {
  DATA_EXPLORATION = "/data-exploration/:tab?",
}

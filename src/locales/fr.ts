const fr = {
  // GLOBAL
  global: {
    yes: "Oui",
    no: "Non",
    filters: {
      actions: {
        all: "Sélectionner tout",
        none: "Effacer",
        clear: "Effacer",
        less: "Voir -",
        more: "De plus",
        apply: "Appliquer",
      },
      operators: {
        between: "Entre",
        lessthan: "Plus petit que",
        lessthanorequal: "Plus petit ou égale",
        greaterthan: "Plus grand que",
        greaterthanorequal: "Plus grand ou égale",
      },
      range: {
        is: "Est",
      },
      messages: {
        empty: "Aucune valeur trouvée pour cette requête",
      },
      checkbox: {
        placeholder: "Recherche...",
      },
    },
    forms: {
      errors: {
        requiredField: "This field is required",
        enterValidEmail: "Enter a valid email",
      },
    },
    errors: {
      403: "Sorry, you are not authorized to access this page.",
      404: "Sorry, the page you visited does not exist.",
      500: "Sorry, something went wrong.",
    },
    notification: {
      genericError: "An error occured",
    },
    proTable: {
      results: "Results",
      noResults: "No Results",
      of: "of"
    }
  },
  // API
  riff: {
    error: {
      title: "Error",
      fetchUser: "Unable to fetch Riff user",
      saveFilter: "Unable to save filter",
      deleteFilter: "Unable to delete filter"
    },
  },
  // COMPONENTS
  components: {
    filterList: {
      collapseAll: "Tout fermer",
      expandAll: "Tout ouvrir",
    },
    table: {
      itemCount: {
        singlePage:
          "{count, plural, =0 {Aucun résultat} other {<strong>#</strong> résultats}}",
        multiplePages:
          "Résultats <strong>{from}</strong> - <strong>{to}</strong> sur <strong>{total}</strong>",
      },
    },
    querybuilder: {
      header: {
        modal: {
          edit: {
            title: "Save this filter",
            okText: "Save",
            cancelText: "Cancel",
            input: {
              label: "Filter name",
              placeholder: "Untitled filter",
              maximumLength: "characters maximum",
            },
          },
          confirmUnsaved: {
            title: "Unsaved changes",
            openSavedFilter: {
              okText: "Continue",
              cancelText: "Cancel",
              content:
                "You are about to open a saved filter; all modifications will be lost.",
            },
            createNewFilter: {
              okText: "Create",
              cancelText: "Cancel",
              content:
                "You are about to create a new filter; all modifications will be lost.",
            },
          },
        },
        popupConfirm: {
          delete: {
            title: "Permanently delete this request?",
            okText: "Delete",
            cancelText: "Cancel",
          },
        },
        tooltips: {
          newQueryBuilder: "New query builder",
          save: "Save filter",
          saveChanges: "Save changes",
          delete: "Delete",
          duplicateQueryBuilder: "Duplicate query builder",
          share: "Share (Copy url)",
          setAsDefaultFilter: "Set as default filter",
          usetDefaultFilter: "Unset default filter",
          noSavedFilters: "You have no saved filters",
        },
        myFiltersDropdown: {
          title: "My Filters",
          manageMyFilter: "Manage my filters",
        },
        duplicateFilterTitleSuffix: "COPY",
      },
      query: {
        combine: {
          and: "Et",
          or: "Ou",
        },
        noQuery: "Utiliser les filtres pour créer une requête",
      },
      actions: {
        new: "Nouvelle",
        changeOperatorTo: "Changer l'opérateur à",
        addQuery: "Nouvelle requête",
        combine: "Combiner",
        labels: "Champs",
        delete: {
          title: "Supprimer cette requête ?",
          titleSelected: "Supprimer cette requête ?",
          cancel: "Annuler",
          confirm: "Supprimer",
        },
        clear: {
          title: "Supprimer toutes les requêtes ?",
          cancel: "Annuler",
          confirm: "Supprimer",
          buttonTitle: "Tout effacer",
          description:
            "Vous êtes sur le point de supprimer toutes vos requêtes. Ils seront perdus à jamais.",
        },
      },
    },
    dataRelease: {
      studies: "Études",
      participants: "Participants",
      biospecimens: "Biospécimens",
      datafiles: "Fichier de données",
    },
  },
  // LAYOUT
  layout: {
    main: {
      menu: {
        dashboard: "Tableau de bord",
        studies: "Études",
        explore: "Exploration des données",
        participants: "Participants",
        biospecimen: "Biospécimen",
        datafiles: "Fichiers de données",
        website: "Site internet",
      },
    },
    user: {
      menu: {
        myprofile: "Mon Profil",
        settings: "Réglages",
        logout: "Se déconnecter",
      },
    },
  },
  // SCREENS
  screen: {
    loginPage: {
      title: "INCLUDE Data Hub",
      datarelease: {
        title: "Données disponibles",
      },
      uncover: "Découvrez de",
      newInsights: "nouvelles connaissances",
      biologyConditions:
        "sur la biologie du syndrome de Down et des conditions concomitantes.",
      accessLargeScale:
        "Accédez à des ressources de données à grande échelle et explorez des ensembles de données de cohorte personnalisés basés sur les données des participants, des échantillons biologiques, cliniques et omiques.",
      login: "Connexion",
      signup: "S'inscrire",
    },
    dashboard: {
      hello: "Bonjour",
      card: {
        datarelease: {
          title: "Publication de données {version}",
        },
      },
      links: {
        studies: "Études",
        participants: "Participants",
        biospecimens: "Biospécimens",
        datafiles: "Fichier de données",
        variantSearch: "Recherche de variants",
      },
      cards: {
        authorizedStudies: {
          title: "Études autorisées",
          headerBtn: "Accès aux données",
          connectedNotice:
            "Votre compte est connecté. Vous avez accès à toutes les données contrôlées par INLCUDE publiées.",
          disconnectedNotice:
            "Accédez à toutes les données contrôlées par INCLUDE publiées en connectant votre compte à l'aide de vos informations d'identification NIH.",
          connect: "Connecter",
          disconnect: "Déconnecter",
          noAvailableStudies: "Aucune étude disponible",
          authorization: "Autorisation",
          of: "de",
          files: "Fichiers",
          dataGroups: "Groupes d'utilisation des données: {groups}",
        },
      },
    },
    dataExploration: {
      queryBuilder: {
        defaultTitle: "My Filter",
      },
      sidemenu: {
        participant: "Participant",
        biospecimen: "Biospécimen",
        datafiles: "Fichier de données",
      },
      tabs: {
        summary: "Sommaire",
        participants: "Participants {count}",
        biospecimens: "Biospécimens {count}",
        datafiles: "Fichier de données {count}",
      },
    },
    join: {
      cancel: "Cancel",
      next: "Next",
      back: "Back",
      submit: "Submit",
      disclaimers: {
        title: "INCLUDE Portal Registration Process",
        description:
          "The INCLUDE Portal is the primary entry point to the INCLUDE Data Hub, which has a targeted launch date of March 21, 2022. The INCLUDE Portal will enable searching, visualizing, and accessing INCLUDE-relevant data (note: some datasets may require additional approvals (e.g., dbGaP) to access).",
        terms: {
          title: "INCLUDE Portal Terms & Conditions",
          lastUpdate: "Last Update: {date}",
          bullets: {
            1: "My purpose for the use of INCLUDE Portal data is free from discrimination on the grounds of race, ethnicity, nationality, gender, age, physical and/or mental ability, sexual orientation, gender identity or expression, religion, or any other grounds that would impinge on an individual’s rights.",
            2: "I will acknowledge specific dataset(s) and/or applicable accession number(s) as well as the INCLUDE Data Hub in my dissemination of research findings, as applicable to the medium or type of dissemination.",
            3: "I will respect the privacy of research participants, and I will make no attempt to identify or contact individual participants or groups from whom data were collected or to generate information that could allow participants’ identities to be readily ascertained.",
            4: "I agree to provide a brief statement regarding my intended use of the data on the INCLUDE Portal with my name and affiliation which will be publicly displayed for the purpose of transparency and collaboration.",
            5: "I understand that participation in the INCLUDE community is voluntary and may be terminated by the INCLUDE Portal Administrator. I will report any actual or suspected violation of this agreement, even if unintentional, to the INCLUDE Portal Administrator. I understand that the INCLUDE Portal Administrator may take action to remedy any actual or suspected violation and/or report such behavior to the appropriate authorities. I also understand that the INCLUDE Portal Administrator may immediately suspend or terminate my access to the INCLUDE Portal if there is an actual or suspected violation of this agreement.",
          },
          checkbox:
            "I have read and agree to the INCLUDE Portal Terms and Conditions",
        },
        disclaimer: {
          title: "INCLUDE Portal Disclaimers",
          bullets: {
            1: "Data available in the INCLUDE Portal is provided on an AS-IS basis and may change over time.",
            2: "The INCLUDE DCC does not warrant or assume any legal liability or responsibility for information, apparatus, product, or process contained in the INCLUDE Portal.",
            3: "Content provided on the INCLUDE Portal is for informational purposes only and is not intended to be a substitute for independent professional medical judgment, advice, diagnosis, or treatment.",
          },
          checkbox: "I have read and understand the INCLUDE Portal Disclaimers",
        },
        errors: "Please accept the terms & conditions and portal disclaimers.",
      },
      registration: {
        sections: {
          identification: "Identification",
          roleAndAffiliation: "Role & Affiliation",
          researchAndDataUse: "Research & Data Use",
        },
        labels: {
          haveAUserID: "I have a user ID for:",
          enterUserId: "Please enter your user ID",
          fullName: "Full name",
          email: "Email",
          iAmA: "I am a:",
          pleaseDescribe: "Please describe",
          iAmAffiliatedWith: "I am affiliated with:",
          intendToUser: "I intend to use the INCLUDE Portal data to:",
          dataUseStatement: "Data use statement",
          researchAreaDescribe:
            "My research area or area of interest may best be described as:",
        },
        placeHolders: {
          firstLast: "First Last",
        },
        helps: {
          checkAllThatApply: "Check all that apply",
          describeUseBelow:
            "For other purpose, including commercial purpose, you must describe your use below",
          provideBriefDescription:
            "Provide a brief description and a link to your professional biography or organization website, if available",
          provideOrgAffiliation:
            "Provide institutional or organizational affiliation",
        },
        noticeNotPublicInfo: "This information will not be made public.",
        nameAndEmailOfIndividual:
          "Please provide the name and email address of an individual at your institution, organization, or similar who is aware of your intended use of the data (We do not expect to contact this individual except in cases where we need to verify your identity).",
        roleOptions: {
          1: "Researcher at an academic or not-for-profit institution",
          2: "Representative from a For-Profit or Commercial Entity",
          3: "Tool or Algorithm Developer",
          4: "Clinician",
          5: "Community member",
          6: "Federal Employee",
        },
        usageOptions: {
          1: "Learn more about Down syndrome and its health outcomes, management, and/or treatment",
          2: "Help me design a new research study",
          3: "Identify datasets that I want to analyze",
        },
        optionsOther: "Other",
        noAffiliationOption: "I do not have an institutional affiliation.",
      },
    },
  },
  facets: {
    // Participant
    study_id: "Study ID",
    karyotype: "Karyotype",
    down_syndrome_diagnosis: "Down Syndrome Diagnosis",
    diagnosis: {
      mondo_id_diagnosis: "Mondo ID Diagnosis",
    },
    phenotype: {
      hpo_id_phenotype: "HPO ID Phenotype",
    },
    age_at_data_collection: "Age at data collection",
    family_type: "Family Type",
    sex: "Sex",
    ethnicity: "Ethnicity",
    race: "Race",
    // Biospecimen
    biospecimen_type: "Biospecimen Type",
    sample_type: "Sample Type",
    derived_sample_type: "Derived Sample Type",
    ncit_id_tissue_type: "NCIT ID Tissues Type",
    age_at_biospecimen_collection: "Age at Biospecimen Collection",
    bio_repository: "Bio Repository",
    // File
    type_of_omics: "Type of Omics",
    experimental_strategy: "Experimental Strategy",
    data_category: "Data Category",
    data_type: "Data Type",
    file_format: "File Format",
    size: "Size",
    access: "Access",
  },
};

export default fr;

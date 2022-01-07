const fr = {
  // GLOBAL
  global: {
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
    home: {
      title: "INCLUDE Data Hub",
      datarelease: {
        title: "Données disponibles",
      },
      uncover: "Découvrez de",
      newInsights: "nouvelles connaissances",
      biologyConditions:
        "sur la biologie du syndrome de Down et des conditions concomitantes.",
      accessLargeScale:
        "Accédez à des ressources de données à grande échelle et explorez des ensembles de données de cohorte personnalisés basés sur les données des participants, des échantillons biologiques, cliniques et génomiques.",
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
  },
};

export default fr;

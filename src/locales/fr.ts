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
    dashboard: {
      hello: "Bonjour",
      card: {
        datarelease: {
          title: "Publication de données {version}",
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

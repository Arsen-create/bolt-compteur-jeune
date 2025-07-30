import { Language } from '../types';

export const translations = {
  fr: {
    // Navigation
    timer: 'Chronomètre',
    statistics: 'Statistiques',
    
    // Timer page
    readyToStart: 'Prêt à commencer ?',
    fastingInProgress: 'Jeûne en cours',
    startFasting: 'Commencer à jeûner',
    endFasting: 'Terminer le jeûne',
    startedOn: 'Commencé le',
    modify: 'Modifier',
    
    // Status badges
    fastingInProgressMinimum: 'Jeûne en cours (minimum 6h requis)',
    validFast: 'Jeûne valide (≥6h)',
    
    // Statistics
    generalStats: 'Statistiques Générales',
    totalValidFasts: 'Nombre total de jeûnes valides',
    totalCumulatedDuration: 'Durée totale cumulée',
    averageDuration: 'Durée moyenne',
    personalRecord: 'Record personnel',
    
    durationBreakdown: 'Répartition par Durée',
    hours: 'heures',
    
    periodicStats: 'Statistiques Périodiques',
    thisWeek: 'Cette semaine',
    thisMonth: 'Ce mois',
    fastsCount: 'jeûnes',
    totalDuration: 'durée totale',
    
    recentHistory: 'Historique Récent',
    lastValidFasts: '10 derniers jeûnes validés',
    duration: 'Durée',
    startTime: 'Début',
    endTime: 'Fin',
    noValidFasts: 'Aucun jeûne valide encore',
    
    downloadData: 'Télécharger toutes mes données',
    
    // Alerts
    fastStarted: 'Jeûne commencé avec succès !',
    fastEnded: 'Jeûne terminé !',
    startTimeUpdated: 'Heure de début mise à jour',
    invalidTime: 'Heure invalide',
    futureTime: 'L\'heure de début ne peut pas être dans le futur',
    
    // Time modification
    modifyStartTime: 'Modifier l\'heure de début',
    newStartDate: 'Nouvelle date de début',
    newStartTime: 'Nouvelle heure de début',
    save: 'Enregistrer',
    cancel: 'Annuler'
  },
  hy: {
    // Navigation
    timer: 'Ժամացույց',
    statistics: 'Վիճակագրություն',
    
    // Timer page
    readyToStart: 'Պատրա՞ստ եք սկսել:',
    fastingInProgress: 'Ծոմ ընթացքի մեջ է',
    startFasting: 'Սկսել ծոմը',
    endFasting: 'Ավարտել ծոմը',
    startedOn: 'Սկսված է',
    modify: 'Փոփոխել',
    
    // Status badges
    fastingInProgressMinimum: 'Ծոմ ընթացքի մեջ (նվազագույն 6 ժամ)',
    validFast: 'Վավեր ծոմ (≥6ժ)',
    
    // Statistics
    generalStats: 'Ընդհանուր Վիճակագրություն',
    totalValidFasts: 'Վավեր ծոմերի ընդհանուր քանակ',
    totalCumulatedDuration: 'Ընդհանուր տևողություն',
    averageDuration: 'Միջին տևողություն',
    personalRecord: 'Անձնական ռեկորդ',
    
    durationBreakdown: 'Տևողության Բաժանում',
    hours: 'ժամ',
    
    periodicStats: 'Ժամանակային Վիճակագրություն',
    thisWeek: 'Այս շաբաթ',
    thisMonth: 'Այս ամիս',
    fastsCount: 'ծոմ',
    totalDuration: 'ընդհանուր տևողություն',
    
    recentHistory: 'Վերջին Պատմություն',
    lastValidFasts: 'Վերջին 10 վավեր ծոմերը',
    duration: 'Տևողություն',
    startTime: 'Սկիզբ',
    endTime: 'Վերջ',
    noValidFasts: 'Դեռ վավեր ծոմ չկա',
    
    downloadData: 'Ներբեռնել բոլոր տվյալները',
    
    // Alerts
    fastStarted: 'Ծոմը հաջողությամբ սկսվեց!',
    fastEnded: 'Ծոմը ավարտվեց!',
    startTimeUpdated: 'Սկսման ժամը թարմացվեց',
    invalidTime: 'Անվավեր ժամ',
    futureTime: 'Սկսման ժամը չի կարող լինել ապագայում',
    
    // Time modification
    modifyStartTime: 'Փոփոխել սկսման ժամը',
    newStartDate: 'Նոր սկսման ամսաթիվ',
    newStartTime: 'Նոր սկսման ժամ',
    save: 'Պահպանել',
    cancel: 'Չեղարկել'
  }
};

export const t = (key: string, language: Language): string => {
  return translations[language][key as keyof typeof translations[Language]] || key;
};
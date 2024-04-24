export const formatTopicStatus = (status: "none" | "ongoing" | "done") =>
  ({
    none: "Nicht gestartet",
    ongoing: "In Bearbeitung",
    done: "Beendet",
  }[status]);

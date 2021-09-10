import cloudbase from "@cloudbase/js-sdk";

export const app = cloudbase.init({
    region:'ap-guangzhou',
    env: "miscro-stage-8gtboxpr3f09d045"
});
export const db = app.database();

export const files = db.collection("files");
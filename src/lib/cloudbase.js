import cloudbase from "@cloudbase/js-sdk";
export const app = cloudbase.init({
  env: "miscro-stage-8gtboxpr3f09d045",
  region: "ap-guangzhou"
});
export const auth = app.auth();
export const db = app.database();
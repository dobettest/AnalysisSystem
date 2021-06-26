const title = process.env.VUE_APP_BASE_NAME || 'miscro-cloud-station';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}`;
  }
  return title;
}

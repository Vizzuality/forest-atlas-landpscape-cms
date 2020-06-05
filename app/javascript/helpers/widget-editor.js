import { AdapterModifier } from '@widget-editor/widget-editor';
import RWAdapter from '@widget-editor/rw-adapter';

export const getFAAdapter = env => AdapterModifier(RWAdapter, {
  endpoint: env.apiUrl,
  dataEndpoint: `${env.apiUrl}/query`,
  env: env.apiEnv,
  applications: env.apiApplications.split(','),
  locale: env.locale,
});

export const getWidgetSchemes = () => [
  {
    name: 'default',
    mainColor: '#97bd3d',
    category: [
      '#97bd3d',
      '#2C75B0',
      '#FAB72E',
      '#EF4848',
      '#3BB2D0',
      '#C32D7B',
      '#F577B9',
      '#5FD2B8',
      '#F1800F',
      '#9F1C00',
      '#A5E9E3',
      '#B9D765',
      '#393F44',
      '#CACCD0',
      '#717171'
    ]
  },
  {
    name: 'pine',
    mainColor: '#907A59',
    category: [
      '#907A59',
      '#6AAC9F',
      '#D5C0A1',
      '#5C7D86',
      '#F9AF38',
      '#F05B3F',
      '#89AD24',
      '#CE4861',
      '#F5808F',
      '#86C48F',
      '#F28627',
      '#B23912',
      '#BAD6AF',
      '#C9C857',
      '#665436'
    ]
  },
  {
    name: 'wind',
    mainColor: '#5A7598',
    category: [
      '#5A7598',
      '#C1CCDC',
      '#DBB86F',
      '#B7597B',
      '#5FAB55',
      '#8D439E',
      '#CD87CA',
      '#6BC8CB',
      '#C58857',
      '#712932',
      '#ACE3E9',
      '#B1D193',
      '#294260',
      '#49ACDB',
      '#2A75C3'
    ]
  }
];

/**
 * Return a promise with the list of metadatas associated with the dataset
 * @param {string} datasetId ID of the dataset
 * @returns {Promise<Object[]>}
 */
const getDatasetMetadata = datasetId => fetch(`${ENV.API_URL}/dataset/${datasetId}?includes=metadata&application=${ENV.API_APPLICATIONS}&env=${ENV.API_ENV}`)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  })
  .then(({ data }) => data.attributes.metadata);

/**
 * Return which languages the dataset as alias metadata info for
 * @param {string} datasetId ID of the dataset
 * @returns {Promise<string[]>}
 */
const getMetadataLanguagesWithAliasInfo = async (datasetId) => {
  const isRelevant = str => str !== null && str !== undefined && str.length > 0;

  try {
    const metadatas = await getDatasetMetadata(datasetId);
    const relevantMetadatas = metadatas.filter((metadata) => {
      if (!metadata.attributes.columns) {
        return false;
      }

      return Object.keys(metadata.attributes.columns)
        .some(column => isRelevant(metadata.attributes.columns[column].alias)
          || isRelevant(metadata.attributes.columns[column].description));
    });

    return relevantMetadatas.map(metadata => metadata.attributes.language);
  } catch (e) {
    return [];
  }
};

/**
 * Return the best language to display the (alias) metadata info in
 * @param {string} datasetId ID of the dataset
 * @param {string} defaultLanguage Default language to use
 * @returns {Promise<string>}
 */
export const getMostAppropriateMetadataLanguage = (datasetId, defaultLanguage) => getMetadataLanguagesWithAliasInfo(datasetId)
  .then((languages) => {
    if (languages.indexOf(defaultLanguage) !== -1) {
      return defaultLanguage;
    }

    return languages[0] || defaultLanguage;
  })
  .catch(() => defaultLanguage);

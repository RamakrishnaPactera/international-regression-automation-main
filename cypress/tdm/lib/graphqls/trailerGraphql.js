export const createOrUpdateTrailerV3 = `mutation CreateOrUpdateTrailerV3($input: CreateAssetTrailersInputV2!) {
    createOrUpdateTrailerV3(input: $input) {
      trailer {
        id
        code
        displayName
        makeTerm
        year
        containerProgramTerm
        notes
        color
        typeTerm
        modelTerm
      }
    }
  }`;

export const createOrUpdateTrailerV3Var = {
  input: {
    code: '{{trailerCode}}',
    displayName: '{{trailerDisplayName}}',
    makeTerm: '{{makeTerm}}',
    year: '{{year}}',
    containerProgramTerm: '{{containerProgramTerm}}',
    notes: '{{notes}}',
    color: '{{color}}',
    typeTerm: '{{typeTerm}}',
    modelTerm: '{{modelTerm}}',
  },
};
import React, { useState, useEffect } from 'react';
import { cohortMiddlewarePath, wtsPath } from '../../../localconf';
import { fetchWithCreds } from '../../../actions';
import { allowedConceptTypes } from '../shared/constants';
import { headers } from "../../../configs";

export const fetchCohortDefinitions = async(sourceId) => {
    const cohortEndPoint = `${cohortMiddlewarePath}cohortdefinition-stats/by-source-id/${sourceId}`;
    const getCohortDefinitions = await fetch(cohortEndPoint);
    return getCohortDefinitions.json();
}


export const fetchCovariates = async(sourceId) => {
    const conceptEndpoint = `${cohortMiddlewarePath}concept/by-source-id/${sourceId}/by-type`;
    const reqBody = {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify(allowedConceptTypes),
    };
    const getConcepts = await fetch(conceptEndpoint, reqBody);
    return getConcepts.json();
  }

export const fetchSources = async() => {
    const sourcesEndpoint = `${cohortMiddlewarePath}sources`;
    const getSources = await fetch(sourcesEndpoint);
    return getSources.json();
}

export const useSourceFetch = () => {
    const [loading, setLoading] = useState(true);
    const [sourceId, setSourceId] = useState(undefined);
    const getSources = () => {  // do wts login and fetch sources on initialization
        fetchWithCreds({
            path: `${wtsPath}connected`,
            method: 'GET',
        })
            .then(
                (res) => {
                    if (res.status !== 200) {
                        window.location.href = `${wtsPath}authorization_url?redirect=${window.location.pathname}`;
                    } else {
                        fetchSources().then((data) => {
                            setSourceId(data.sources[0].source_id);
                            setLoading(false);
                        });
                    }
                },
            );
    }
    useEffect(() => {
        getSources();
    }, []);
    return { loading, sourceId }
}

export const queryConfig = {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  };

export const atlasDomain = () => {
    return cohortMiddlewarePath.replace('cohort-middleware', 'analysis/OHDSI%20Atlas');
};

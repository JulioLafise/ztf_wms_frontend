import React from 'react';

export const KardexPageLazy = React.lazy(() => import(/* webpackChunkName: "Kardex" */ './Kardex'));
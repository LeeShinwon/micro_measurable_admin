import {  useEffect } from 'react';
import PropTypes from 'prop-types';

import { useRawDataQuery } from 'src/hooks/useRawData';

import Loading from 'src/loading';
import useOverViewStore from 'src/store/overViewStore';


export const RawDataProvider = ({ children }) => {
    const { isPending, error, data } = useRawDataQuery();
    const { setRawData } = useOverViewStore();

    useEffect(() => {
        if(data){
            setRawData(data.data);
            console.log(data.data);
        }
        else if(error){
            setRawData([]);
        }
    }, [error, data, setRawData]);

    return (
        !isPending ? children : <div><Loading/></div>
    );
};

RawDataProvider.propTypes = {
    children: PropTypes.any,
};
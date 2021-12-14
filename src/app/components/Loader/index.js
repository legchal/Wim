import React from "react";
import Loading from '../../media/44.gif';
import './loader.css';

export const Loader = () => (
    <div className="loader">
        <div className="isloading">
            <img src={Loading} alt="Loading ..." />
            <br />
            <span style={{ fontWeight: 'bold' }}>Carregando
                <span style={{ display: 'inline-block' }} className="pointerLoad1">.</span>
                <span style={{ display: 'inline-block' }} className="pointerLoad2">.</span>
                <span style={{ display: 'inline-block' }} className="pointerLoad3">.</span>
            </span>
        </div>
    </div>
);

export const LoaderImage = Loading;

export const Loader2 = ({ loading }) => (
    loading ? <Loader /> : null
);


export const ProgressLoader2 = ({ loading, progress }) => (
    loading ? <ProgressLoader /> : null
);

export const ProgressLoader = ({ progress }) => (
    <div className="loader">
        <div className="isloading" style={{ height: '142px' }}>
            <img src={Loading} alt="Loading ..."/>
            <br />
            <span>Carregando
                <span style={{ display: 'inline-block' }} className="pointerLoad1">.</span>
                <span style={{ display: 'inline-block' }} className="pointerLoad2">.</span>
                <span style={{ display: 'inline-block' }} className="pointerLoad3">.</span>
            </span>
            <div className="progress">
                <div className="progress-bar progress-bar-green" role="progressbar" style={{ width: `${progress}%` }}>
                    <span className="sr-only">{`${progress}%`}</span>
                </div>
            </div>
        </div>
    </div>
);
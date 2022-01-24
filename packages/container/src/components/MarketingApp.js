import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

export default () => {
    const ref = useRef(null);
    useEffect(() => {
        mount(ref.current);
        console.log('random console');
    }, []);

    return <div ref={ref}></div>
}